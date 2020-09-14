//
//  FileSystemPersistenceURLProvider.m

//
//  Created by William Power on 4/27/16.
//  Copyright (c) 2016 iDeal Technologies. All rights reserved.
//

#import "FileSystemPersistenceURLProvider.h"

/**
 * Our folder structure looks like this:
 * ApplicationSupportDirectory/
 *      OUData/
 *          App/
 *              data needed by our app
 *          User/
 *              data specific to a user
 */
static NSString *const mainDirectory = @"OUData";

static NSString *const userDataDirectory = @"User";

static NSString *const appDataDirectory = @"App";

@interface FileSystemPersistenceURLProvider ()

+ (NSURL *)appStorageURL;

+ (NSURL *)userStorageURL;

+ (NSFileManager *)fileManager;

+ (NSSearchPathDirectory)searchPathDirectory;

+ (NSURL *)rootPersistenceDirectoryURL;

+ (NSURL *)storageURLinDirectoryAtBaseURL:(NSURL *)baseURL withPathDirectoryComponents:(NSArray <NSString *> *)components;

@end

@implementation FileSystemPersistenceURLProvider

#pragma mark - Interface

+ (NSURL *)appPersistenceURLwithPathComponents:(NSArray <NSString *> *)pathComponents {
    NSURL *finalURL = [self storageURLinDirectoryAtBaseURL:[self appStorageURL] withPathDirectoryComponents:pathComponents];
    return finalURL;
}

+ (NSURL *)appPersistenceURLwithPathString:(NSString *)pathString {
    NSArray<NSString *> *pathComponents = @[];
    if (pathString != nil) {
        pathComponents = [pathString componentsSeparatedByString:@"/"];
    }
    NSURL *finalURL = [self storageURLinDirectoryAtBaseURL:[self appStorageURL] withPathDirectoryComponents:pathComponents];
    return finalURL;
}

+ (NSURL *)userPersistenceURLwithPathComponents:(NSArray <NSString *> *)pathComponents {
    NSURL *finalURL = [self storageURLinDirectoryAtBaseURL:[self userStorageURL] withPathDirectoryComponents:pathComponents];
    return finalURL;
}

+ (NSURL *)systemBaseUrl {
    NSFileManager *fileManager = [self fileManager];
    NSSearchPathDirectory searchDirectory = [self searchPathDirectory];
    NSArray *directoryPaths = [fileManager URLsForDirectory:searchDirectory inDomains:NSUserDomainMask];
    NSURL *urlForSystemStorageRootDirectory = directoryPaths.firstObject;
    return urlForSystemStorageRootDirectory;
}

#pragma mark - Private

+ (NSURL *)appStorageURL {
    NSURL *rootDirectoryURL = [self rootPersistenceDirectoryURL];
    NSURL *appDirectoryURL = [rootDirectoryURL URLByAppendingPathComponent:appDataDirectory];
    return appDirectoryURL;
}

+ (NSURL *)userStorageURL {
    NSURL *rootDirectoryURL = [self rootPersistenceDirectoryURL];
    NSURL *userDirectoryURL = [rootDirectoryURL URLByAppendingPathComponent:userDataDirectory];
    return userDirectoryURL;
}

+ (NSFileManager *)fileManager {
    return [NSFileManager defaultManager];
}

+ (NSSearchPathDirectory)searchPathDirectory {
    return NSApplicationSupportDirectory;
}

+ (NSURL *)rootPersistenceDirectoryURL {
    NSURL *urlForSystemStorageRootDirectory = [self systemBaseUrl];
    NSURL *ouDirectory = [urlForSystemStorageRootDirectory URLByAppendingPathComponent:mainDirectory];
    return ouDirectory;
}

+ (NSURL *)storageURLinDirectoryAtBaseURL:(NSURL *)baseURL withPathDirectoryComponents:(NSArray <NSString *> *)components {
    NSArray *originalPathComponents = baseURL.pathComponents;
    NSArray *newPathComponents = [originalPathComponents arrayByAddingObjectsFromArray:components];
    NSURL *finalURL = [NSURL fileURLWithPathComponents:newPathComponents];
    return finalURL;
}


@end
