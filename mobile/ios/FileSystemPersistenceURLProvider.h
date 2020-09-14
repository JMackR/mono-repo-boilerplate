//
//  FileSystemPersistenceURLProvider.h

//
//  Created by William Power on 4/27/16.
//  Copyright (c) 2016 iDeal Technologies. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface FileSystemPersistenceURLProvider : NSObject

/**
 * @pathComponents same format as NSURL's 'pathComponents' for calls like NSURL's "+fileURLWithPathComponents:"
 */
+ (NSURL *)appPersistenceURLwithPathComponents:(NSArray <NSString *> *)pathComponents;

+ (NSURL *)appPersistenceURLwithPathString:(NSString *)pathComponents;

/**
 * @pathComponents same format as NSURL's 'pathComponents' for calls like NSURL's "+fileURLWithPathComponents:"
 */
+ (NSURL *)userPersistenceURLwithPathComponents:(NSArray <NSString *> *)pathComponents;

+ (NSURL *)systemBaseUrl;
@end
