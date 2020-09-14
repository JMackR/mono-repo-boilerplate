//
//  FileSystemInteractions.m

//
//  Created by William Power on 5/5/16.
//  Copyright (c) 2016 iDeal Technologies. All rights reserved.
//

#import "FileSystemInteractions.h"

@interface FileSystemInteractions ()

+ (void)ensureParentDirectoryExistsForFileURL:(NSURL *)fileURL;

+ (NSFileManager *)fileManager;

@end

@implementation FileSystemInteractions

+ (BOOL)writeData:(NSData *)data toFileAtURL:(NSURL *)fileURL {
    if (!data) {
        return NO;
    }

    if(!fileURL){
        return NO;
    }

    [self ensureParentDirectoryExistsForFileURL:fileURL];

    BOOL success = [[self fileManager] createFileAtPath:fileURL.path contents:data attributes:0];

    return success;
}

+ (NSData *)dataFromFileAtURL:(NSURL *)fileURL {
    NSData *fileData;
    if ([[self fileManager] fileExistsAtPath:fileURL.path]) {
        fileData = [NSData dataWithContentsOfURL:fileURL];
    }
    return fileData;
}

+ (BOOL)removeContentsAtURL:(NSURL *)fileURL {
    if (!fileURL) {
        return NO;
    }
    
    BOOL success;
    @try {
        success = [[self fileManager] removeItemAtURL:fileURL error:nil];
    } @catch (NSException *exception) {
        success = NO;
    } @finally {
        return success;
    }
}

+ (BOOL)deleteFilesFromDirectory:(NSURL *)directoryURL {
    NSFileManager *fm = [NSFileManager defaultManager];
    NSString *directory = [directoryURL path];
    NSError *error = nil;
    for (NSString *file in [fm contentsOfDirectoryAtPath:directory error:&error]) {
        BOOL success = [fm removeItemAtPath:[NSString stringWithFormat:@"%@/%@", directory, file] error:&error];
        if (!success || error) {
            return NO;
        }
    }
    return YES;
}

+ (void)ensureParentDirectoryExistsForFileURL:(NSURL *)fileURL {
    NSURL *parentDirectoryURL = [fileURL URLByDeletingLastPathComponent];
    NSError *error;
    if (![[self fileManager] fileExistsAtPath:parentDirectoryURL.path]) {
        [[self fileManager] createDirectoryAtURL:parentDirectoryURL withIntermediateDirectories:YES attributes:nil error:&error];
    }
}

#pragma mark - Private

+ (NSFileManager *)fileManager {
    return [NSFileManager defaultManager];
}

@end
