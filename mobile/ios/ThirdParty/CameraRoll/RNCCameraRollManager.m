/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import "RNCCameraRollManager.h"

#import <CoreLocation/CoreLocation.h>
#import <Foundation/Foundation.h>
#import <UIKit/UIKit.h>
#import <Photos/Photos.h>
#import <dlfcn.h>
#import <objc/runtime.h>
#import <MobileCoreServices/UTType.h>

#import <React/RCTBridge.h>
#import <React/RCTConvert.h>
#import <React/RCTImageLoaderProtocol.h>
#import <React/RCTLog.h>
#import <React/RCTUtils.h>

#import "RNCAssetsLibraryRequestHandler.h"
#import "FileSystemPersistenceURLProvider.h"
#import "FileSystemInteractions.h"
#import "FileSystemInteractions.h"
#import "ImageUtility.h"

@implementation RCTConvert (PHAssetCollectionSubtype)

RCT_ENUM_CONVERTER(PHAssetCollectionSubtype, (@{
    @"album": @(PHAssetCollectionSubtypeAny),
    @"all": @(PHAssetCollectionSubtypeSmartAlbumUserLibrary),
    @"event": @(PHAssetCollectionSubtypeAlbumSyncedEvent),
    @"faces": @(PHAssetCollectionSubtypeAlbumSyncedFaces),
    @"library": @(PHAssetCollectionSubtypeSmartAlbumUserLibrary),
    @"photo-stream": @(PHAssetCollectionSubtypeAlbumMyPhotoStream), // incorrect, but legacy
    @"photostream": @(PHAssetCollectionSubtypeAlbumMyPhotoStream),
    @"saved-photos": @(PHAssetCollectionSubtypeAny), // incorrect, but legacy correspondence in PHAssetCollectionSubtype
    @"savedphotos": @(PHAssetCollectionSubtypeAny), // This was ALAssetsGroupSavedPhotos, seems to have no direct correspondence in PHAssetCollectionSubtype
}), PHAssetCollectionSubtypeAny, integerValue)

static NSInteger const default_photo_width = 1920;
static NSInteger const default_photo_height = 1920;
static CGFloat const default_compression_quality = .9f;

@end

@implementation RNCCameraRollManager

RCT_EXPORT_MODULE(OUPCameraRoll)

@synthesize bridge = _bridge;

static NSString *const kErrorUnableToSave = @"E_UNABLE_TO_SAVE";
static NSString *const kErrorUnableToLoad = @"E_UNABLE_TO_LOAD";
static NSString *const kErrorUnableToDeletePhoto = @"E_UNABLE_TO_DELETE_PHOTO";
static NSString *const kErrorUnableToSavePhoto = @"E_UNABLE_TO_SAVE_PHOTO";

static NSString *const kErrorAuthRestricted = @"E_PHOTO_LIBRARY_AUTH_RESTRICTED";
static NSString *const kErrorAuthDenied = @"E_PHOTO_LIBRARY_AUTH_DENIED";

typedef void (^PhotosAuthorizedBlock)(void);

static void requestPhotoLibraryAccess(RCTPromiseRejectBlock reject, PhotosAuthorizedBlock authorizedBlock) {
    PHAuthorizationStatus authStatus = [PHPhotoLibrary authorizationStatus];
    if (authStatus == PHAuthorizationStatusRestricted) {
        reject(kErrorAuthRestricted, @"Access to photo library is restricted", nil);
    } else if (authStatus == PHAuthorizationStatusAuthorized) {
        authorizedBlock();
    } else if (authStatus == PHAuthorizationStatusNotDetermined) {
        [PHPhotoLibrary requestAuthorization:^(PHAuthorizationStatus status) {
            requestPhotoLibraryAccess(reject, authorizedBlock);
        }];
    } else {
        reject(kErrorAuthDenied, @"Access to photo library was denied", nil);
    }
}

RCT_EXPORT_METHOD(saveToCameraRoll:(NSDictionary *)params
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    void (^saveBlock)(void) = ^{
        NSURLRequest *inputUrl = [RCTConvert NSURLRequest:params[@"uri"]];
        NSString *directoryPath = [RCTConvert NSString:params[@"directoryPath"]];
        NSInteger width = [RCTConvert NSInteger:params[@"width"]];
        NSInteger height = [RCTConvert NSInteger:params[@"height"]];
        directoryPath = directoryPath != nil ? directoryPath : @"";

        UIImage *image = [UIImage imageWithData:[NSData dataWithContentsOfURL:inputUrl.URL]];
        CGSize deviceScaledSize = CGSizeMake(width > 0 ? width : default_photo_width, height > 0 ? height : default_photo_height);
        UIImage *newImage = [ImageUtility imageByScalingImage:image toFitSize:deviceScaledSize];
        NSString *photoId = [NSUUID UUID].UUIDString;
        NSString *filename = [NSString stringWithFormat:@"%@.%@", photoId, @"jpg"];
        NSString *filePath = [NSString stringWithFormat:@"%@/%@", directoryPath, filename];
        NSURL *photoURL = [FileSystemPersistenceURLProvider appPersistenceURLwithPathString:filePath];
        [FileSystemInteractions ensureParentDirectoryExistsForFileURL:photoURL];

        NSData *data = UIImageJPEGRepresentation(newImage, default_compression_quality);
        NSError *error;
        [data writeToFile:photoURL.path options:NSDataWritingAtomic error:&error];
        if (error == nil) {
            resolve(@{
                @"id": photoId,
                @"uri": photoURL.path,
                @"filename": filename,
                @"isStored": @YES,
                @"width": @(deviceScaledSize.width),
                @"height": @(deviceScaledSize.height)
            });
        } else {
            NSString *errorMsg = [NSString stringWithFormat:@"Unable to save photo at url: %@", [photoURL absoluteString]];
            reject(kErrorUnableToSavePhoto, errorMsg, error);
        }
    };

    requestPhotoLibraryAccess(reject, saveBlock);
}

static void RCTResolvePromise(RCTPromiseResolveBlock resolve,
                              NSArray<NSDictionary<NSString *, id> *> *assets,
                              BOOL hasNextPage)
{
    if (!assets.count) {
        resolve(@{
            @"edges": assets,
            @"page_info": @{

            }
        });
        return;
    }
    resolve(@{
        @"edges": assets,
        @"page_info": @{
                @"start_cursor": assets[0][@"node"][@"image"][@"uri"],
                @"end_cursor": assets[assets.count - 1][@"node"][@"image"][@"uri"],
                @"has_next_page": @(hasNextPage),
        }
    });
}

RCT_EXPORT_METHOD(getAlbums:(NSDictionary *) params
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    checkPhotoLibraryConfig();
    NSString *recentPhotosAlbumTitle = [RCTConvert NSString:params[@"mostRecentAlbumTitle"]];
    void (^loadAlbumsBlock)(void) = ^void() {
        PHFetchOptions* assetFetchOptions = [[PHFetchOptions alloc] init];
        PHFetchResult<PHAssetCollection *> *const assetCollectionFetchResult = [PHAssetCollection fetchAssetCollectionsWithType:PHAssetCollectionTypeAlbum subtype:PHAssetCollectionSubtypeAny options:assetFetchOptions];
        NSMutableArray * result = [NSMutableArray new];

        assetFetchOptions.predicate = [NSPredicate predicateWithFormat:[NSString stringWithFormat:@"mediaType = %@", @(PHAssetMediaTypeImage)]];
        PHFetchResult<PHAsset *> *allPhotos = [PHAsset fetchAssetsWithOptions:assetFetchOptions];
        if (allPhotos.count > 0) {
            NSString *const mostRecentPhotoUri = [NSString stringWithFormat:@"ph://%@", [[allPhotos firstObject] localIdentifier]];
                [result addObject:@{
                    @"title": recentPhotosAlbumTitle,
                    @"numberOfPhotos": @(allPhotos.count),
                    @"coverPhotoUri": mostRecentPhotoUri
                }];
        }

        [assetCollectionFetchResult enumerateObjectsUsingBlock:^(PHAssetCollection * _Nonnull obj, NSUInteger idx, BOOL * _Nonnull stop) {
            assetFetchOptions.sortDescriptors = @[[NSSortDescriptor sortDescriptorWithKey:@"creationDate" ascending:NO]];
            PHFetchResult<PHAsset *> *const assetsFetchResult = [PHAsset fetchAssetsInAssetCollection:obj options:assetFetchOptions];

            if (assetsFetchResult.count > 0) {
                PHAsset *asset = [assetsFetchResult firstObject];
                NSString *const uri = [NSString stringWithFormat:@"ph://%@", [asset localIdentifier]];
                [result addObject:@{
                    @"id": [obj localIdentifier],
                    @"title": [obj localizedTitle],
                    @"numberOfPhotos": @(assetsFetchResult.count),
                    @"coverPhotoUri": uri
                }];
            }
        }];
        resolve(result);
    };

    requestPhotoLibraryAccess(reject, loadAlbumsBlock);
}

RCT_EXPORT_METHOD(deletePhotos:(NSString *) directoryPath
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {

    NSArray<NSString *> *pathComponents = @[directoryPath];
    NSURL *path = [FileSystemPersistenceURLProvider appPersistenceURLwithPathComponents:pathComponents];
    BOOL success = [FileSystemInteractions deleteFilesFromDirectory:path];

    if (success) {
        NSMutableDictionary *result = [[NSMutableDictionary alloc] init];
        [result setValue:@(success) forKey:@"success"];
        resolve(result);
    } else {
        NSString *errorMessage = [NSString stringWithFormat:@"Couldn't delete photos at URL: %@", [path absoluteString]];
        reject(kErrorUnableToDeletePhoto, errorMessage, nil);
    }
}

RCT_EXPORT_METHOD(savePhotosFromGallery:(NSDictionary *)params
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    checkPhotoLibraryConfig();
    NSArray *const photoIds = [RCTConvert NSArray:params[@"photoIds"]];
    NSInteger const height = [RCTConvert NSInteger:params[@"height"]];
    NSInteger const width =[RCTConvert NSInteger:params[@"width"]];
    NSMutableArray<NSDictionary<NSString *, id> *> __block *assets = [NSMutableArray new];
    NSString *directoryPath = [RCTConvert NSString:params[@"directoryPath"]];
    directoryPath = directoryPath != nil ? directoryPath : @"";

    requestPhotoLibraryAccess(reject, ^{
        PHFetchResult<PHAsset *> *const assetsFetchResult = [PHAsset fetchAssetsWithLocalIdentifiers:photoIds options:nil];

        void (^resolveWhenDone)(void)= ^{
            if (assets.count == photoIds.count) {
                resolve(assets);
            }
        };

        [assetsFetchResult enumerateObjectsUsingBlock:^(PHAsset * _Nonnull asset, NSUInteger idx, BOOL * _Nonnull stop) {

            CGSize deviceScaledSize = CGSizeMake(width > 0 ? width : default_photo_width, height > 0 ? height : default_photo_height);

            NSString *filename = [NSString stringWithFormat:@"%@.%@", [NSUUID UUID].UUIDString, @"jpg"];
            NSString *filePath = [NSString stringWithFormat:@"%@/%@", directoryPath, filename];
            NSURL *photoURL = [FileSystemPersistenceURLProvider appPersistenceURLwithPathString:filePath];
            [FileSystemInteractions ensureParentDirectoryExistsForFileURL:photoURL];

            PHImageRequestOptions *options = [PHImageRequestOptions new];
            options.deliveryMode = PHImageRequestOptionsDeliveryModeHighQualityFormat;
            options.networkAccessAllowed = YES;

            [[PHImageManager defaultManager] requestImageForAsset:asset
                                                       targetSize:deviceScaledSize
                                                      contentMode:PHImageContentModeAspectFit
                                                          options:options
                                                    resultHandler:^(UIImage *image, NSDictionary *info) {
                NSData *data = UIImageJPEGRepresentation(image, default_compression_quality);
                NSError *error;
                [data writeToFile:photoURL.path options:NSDataWritingAtomic error:&error];
                [assets addObject:@{
                    @"id": [asset localIdentifier],
                    @"uri": photoURL.path,
                    @"filename": filename,
                    @"isStored": @YES,
                    @"width": @(image.size.width),
                    @"height": @(image.size.height)
                }];
                resolveWhenDone();
            }];
        }];
    });
}

RCT_EXPORT_METHOD(downloadRemotePhoto:(NSDictionary *) params
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    
    NSURL *urlToDownload = [RCTConvert NSURL:params[@"urlToDownload"]];
    NSString *directoryPath = [RCTConvert NSString:params[@"directoryPath"]];
    NSString *filename = [NSString stringWithFormat:@"%@.%@", [NSUUID UUID].UUIDString, @"jpg"];
    NSString *filePath = [NSString stringWithFormat:@"%@/%@", directoryPath, filename];
    NSURL *photoURL = [FileSystemPersistenceURLProvider appPersistenceURLwithPathString:filePath];
    [FileSystemInteractions ensureParentDirectoryExistsForFileURL:photoURL];
    
    NSData * data = [NSData dataWithContentsOfURL:urlToDownload];
    
    NSError *error;
    [data writeToFile:photoURL.path options:NSDataWritingAtomic error:&error];
    resolve(photoURL.path);
}

RCT_EXPORT_METHOD(getBaseUri:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    resolve([FileSystemPersistenceURLProvider systemBaseUrl].path);
}

RCT_EXPORT_METHOD(rotatePhoto:(NSDictionary *) params
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    NSURL *sourceURL = [RCTConvert NSURL:params[@"uri"]];
    double rotationDegree = [RCTConvert double:params[@"rotationDegree"]];
    NSString *directoryPath = [RCTConvert NSString:params[@"directoryPath"]];
    if (rotationDegree == 0) {
        resolve(sourceURL.path);
        return;
    }

    NSString *filename = [[[[sourceURL absoluteURL] lastPathComponent] stringByDeletingPathExtension] stringByAppendingFormat:@"_rotated.jpg"];
    UIImage *image = [UIImage imageWithData:[NSData dataWithContentsOfURL:sourceURL]];

    UIImage *rotatedImage = [ImageUtility imageByRotatingImage:image radians:[ImageUtility degreeToRadians:rotationDegree]];
    NSData *data = UIImageJPEGRepresentation(rotatedImage, 1.0f);
    NSString *filePath = [NSString stringWithFormat:@"%@/%@", directoryPath, filename];
    NSURL *photoURL = [FileSystemPersistenceURLProvider appPersistenceURLwithPathString:filePath];
    NSError *error;
    [data writeToFile:photoURL.path options:NSDataWritingAtomic error:&error];
    resolve(photoURL.path);
}

RCT_EXPORT_METHOD(cropPhoto:(NSDictionary *) params
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject) {
    NSURL *sourceURL = [RCTConvert NSURL:params[@"uri"]];
    CGFloat x = [RCTConvert CGFloat:params[@"x"]];
    CGFloat y = [RCTConvert CGFloat:params[@"y"]];
    CGFloat width = [RCTConvert CGFloat:params[@"width"]];
    CGFloat height = [RCTConvert CGFloat:params[@"height"]];
    
    NSString *directoryPath = [RCTConvert NSString:params[@"directoryPath"]];

    NSString *filename = [[[[sourceURL absoluteURL] lastPathComponent] stringByDeletingPathExtension] stringByAppendingFormat:@"_cropped.jpg"];
    UIImage *image = [UIImage imageWithData:[NSData dataWithContentsOfURL:sourceURL]];
    
    CGRect cropRect = CGRectMake(x, y, width, height);
    UIImage *croppedImage = [ImageUtility cropImage:image inRect:cropRect];
    
    NSData *data = UIImageJPEGRepresentation(croppedImage, default_compression_quality);
    NSString *filePath = [NSString stringWithFormat:@"%@/%@", directoryPath, filename];
    NSURL *photoURL = [FileSystemPersistenceURLProvider appPersistenceURLwithPathString:filePath];
    NSError *error;
    [data writeToFile:photoURL.path options:NSDataWritingAtomic error:&error];
    
    resolve(@{
        @"uri": photoURL.path,
        @"filename": filename,
        @"isStored": @YES,
        @"width": @(cropRect.size.width),
        @"height": @(cropRect.size.height)
    });
}

RCT_EXPORT_METHOD(getPhotos:(NSDictionary *)params
                  resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)
{
    checkPhotoLibraryConfig();

    NSUInteger const first = [RCTConvert NSInteger:params[@"first"]];
    NSString *const afterCursor = [RCTConvert NSString:params[@"after"]];
    NSString *const albumId = [RCTConvert NSString:params[@"albumId"]];

    // Predicate for fetching assets within a collection
    PHFetchOptions* assetFetchOptions = [[PHFetchOptions alloc] init];
    assetFetchOptions.predicate = [NSPredicate predicateWithFormat:[NSString stringWithFormat:@"mediaType = %@", @(PHAssetMediaTypeImage)]];
    assetFetchOptions.sortDescriptors = @[[NSSortDescriptor sortDescriptorWithKey:@"creationDate" ascending:NO]];

    BOOL __block foundAfter = NO;
    BOOL __block hasNextPage = NO;
    BOOL __block resolvedPromise = NO;
    NSMutableArray<NSDictionary<NSString *, id> *> *assets = [NSMutableArray new];

    BOOL __block stopCollections_;
    NSString __block *currentCollectionName;

    requestPhotoLibraryAccess(reject, ^{
        void (^collectAsset)(PHAsset*, NSUInteger, BOOL*) = ^(PHAsset * _Nonnull asset, NSUInteger assetIdx, BOOL * _Nonnull stopAssets) {
            NSString *const uri = [NSString stringWithFormat:@"ph://%@", [asset localIdentifier]];
            if (afterCursor && !foundAfter) {
                if ([afterCursor isEqualToString:uri]) {
                    foundAfter = YES;
                }
                return; // skip until we get to the first one
            }

            // Get underlying resources of an asset - this includes files as well as details about edited PHAssets
            NSArray<PHAssetResource *> *const assetResources = [PHAssetResource assetResourcesForAsset:asset];
            if (![assetResources firstObject]) {
                return;
            }
            PHAssetResource *const _Nonnull resource = [assetResources firstObject];

            // If we've accumulated enough results to resolve a single promise
            if (first == assets.count) {
                *stopAssets = YES;
                stopCollections_ = YES;
                hasNextPage = YES;
                RCTAssert(resolvedPromise == NO, @"Resolved the promise before we finished processing the results.");
                RCTResolvePromise(resolve, assets, hasNextPage);
                resolvedPromise = YES;
                return;
            }

            NSString *const origFilename = resource.originalFilename;

            [assets addObject:@{
                @"node": @{
                        @"group_name": currentCollectionName,
                        @"image": @{
                                @"id": [asset localIdentifier],
                                @"uri": uri,
                                @"filename": origFilename,
                                @"height": @([asset pixelHeight]),
                                @"width": @([asset pixelWidth]),
                                @"isStored": @NO
                        },
                        @"timestamp": @(asset.creationDate.timeIntervalSince1970)
                }
            }];
        };

        if (albumId == nil) {
            PHFetchResult <PHAsset *> *const assetFetchResult = [PHAsset fetchAssetsWithOptions: assetFetchOptions];
            currentCollectionName = @"All Photos";
            [assetFetchResult enumerateObjectsUsingBlock:collectAsset];
        } else {
            PHFetchOptions *const collectionFetchOptions = [PHFetchOptions new];
            collectionFetchOptions.sortDescriptors = @[[NSSortDescriptor sortDescriptorWithKey:@"endDate" ascending:NO]];
            PHFetchResult<PHAssetCollection *> *const assetCollectionFetchResult = [PHAssetCollection fetchAssetCollectionsWithLocalIdentifiers:@[albumId] options:collectionFetchOptions];

            [assetCollectionFetchResult enumerateObjectsUsingBlock:^(PHAssetCollection * _Nonnull assetCollection, NSUInteger collectionIdx, BOOL * _Nonnull stopCollections) {
                // Enumerate assets within the collection
                PHFetchResult<PHAsset *> *const assetsFetchResult = [PHAsset fetchAssetsInAssetCollection:assetCollection options:assetFetchOptions];
                currentCollectionName = [assetCollection localizedTitle];
                [assetsFetchResult enumerateObjectsUsingBlock:collectAsset];
                *stopCollections = stopCollections_;
            }];
        }

        // If we get this far and haven't resolved the promise yet, we reached the end of the list of photos
        if (!resolvedPromise) {
            hasNextPage = NO;
            RCTResolvePromise(resolve, assets, hasNextPage);
            resolvedPromise = YES;
        }
    });
}

static void checkPhotoLibraryConfig()
{
#if RCT_DEV
    if (![[NSBundle mainBundle] objectForInfoDictionaryKey:@"NSPhotoLibraryUsageDescription"]) {
        RCTLogError(@"NSPhotoLibraryUsageDescription key must be present in Info.plist to use camera roll.");
    }
#endif
}

@end
