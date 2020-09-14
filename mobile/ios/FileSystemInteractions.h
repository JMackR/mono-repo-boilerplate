//
//  FileSystemInteractions.h

//
//  Created by William Power on 5/5/16.
//  Copyright (c) 2016 iDeal Technologies. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface FileSystemInteractions : NSObject

+ (void)ensureParentDirectoryExistsForFileURL:(NSURL *)fileURL;
    
+ (BOOL)writeData:(NSData *)data toFileAtURL:(NSURL *)fileURL;

+ (NSData *)dataFromFileAtURL:(NSURL *)fileURL;

+ (BOOL)removeContentsAtURL:(NSURL *)fileURL;

+ (BOOL)deleteFilesFromDirectory:(NSURL *)directoryURL;

@end
