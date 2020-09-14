//
// AppVersionManager.m

//
//  Created by Jake Alewel on 8/4/20.
//  Copyright © 2020 REdibs. All rights reserved.
//

#import "AppVersionModule.h"
#import <React/RCTUtils.h>
#import "AppVersionController.h"

static NSString *const IS_FIRST_RUN_KEY = @"isFirstRunAfterInstall";
static NSString *const IS_RUNNING_FIRST_INSTALLED_KEY = @"isRunningFirstInstalledVersion";
static NSString *const APP_UPDATED_KEY = @"wasAppUpdated";

@implementation AppVersionModule

RCT_EXPORT_MODULE(AppVersionModule);

RCT_REMAP_METHOD(getAppVersionInfo, getAppVersionInfoWithResolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
    NSDictionary *payload = @{
        IS_FIRST_RUN_KEY: @([AppVersionController sharedInstance].isFirstRunAfterInstall),
        IS_RUNNING_FIRST_INSTALLED_KEY: @([AppVersionController sharedInstance].isRunningFirstInstalledVersion),
        APP_UPDATED_KEY: @([AppVersionController sharedInstance].wasAppUpdated)
    };
    resolve(payload);
}

@end
