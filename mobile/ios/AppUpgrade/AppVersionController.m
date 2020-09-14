//
//  AppUpdateController.m

#import "AppVersionController.h"

static NSString *const FIRST_BUILD_KEY = @"REDIBS_FIRST_BUILD";
static NSString *const LAST_BUILD_KEY = @"REDIBS_LAST_BUILD";
static NSInteger const NO_BUILD_NUMBER = 0;

@interface AppVersionController ()

@property (nonatomic, assign, readwrite) BOOL isFirstRunAfterInstall;
@property (nonatomic, assign, readwrite) BOOL isRunningFirstInstalledVersion;
@property (nonatomic, assign, readwrite) BOOL wasAppUpdated;

@end

@implementation AppVersionController

+ (AppVersionController *)sharedInstance {
    static dispatch_once_t onceToken;
    static AppVersionController *sharedInstance;
    dispatch_once(&onceToken, ^{
        sharedInstance = [self new];
    });
    return sharedInstance;
}

- (void)loadAppUpdateInfo {
    NSInteger firstInstallBuildNumber = [self getFirstInstallBuildNumber];
    NSInteger previousBuildNumber = [self getPreviousBuildNumber];
    NSInteger currentBuildNumber = [self getCurrentBuildNumber];
    
    BOOL missingPreviousBuildNumber = previousBuildNumber == NO_BUILD_NUMBER;
    if (missingPreviousBuildNumber) {
        // This must be a fresh install.
        self.isFirstRunAfterInstall = YES;
        // We never stored the firstInstallBuildNumber in legacy client,
        // so we can only store that value if no previousBuildNumber exists.
        [self saveFirstInstallBuildNumber:currentBuildNumber];
        firstInstallBuildNumber = currentBuildNumber;
    }
    
    if (currentBuildNumber == firstInstallBuildNumber) {
        self.isRunningFirstInstalledVersion = YES;
    }

    if (currentBuildNumber > previousBuildNumber) {
        // We must have updated the app since the last launch.
        self.wasAppUpdated = YES;
        [self saveCurrentBuildNumber:currentBuildNumber];
    }
}

- (NSInteger)getFirstInstallBuildNumber {
    return [[NSUserDefaults standardUserDefaults] integerForKey:FIRST_BUILD_KEY];
}

- (NSInteger)getPreviousBuildNumber {
    return [[NSUserDefaults standardUserDefaults] integerForKey:LAST_BUILD_KEY];
}

- (NSInteger)getCurrentBuildNumber {
    NSBundle *bundle = [NSBundle bundleForClass:[self class]];
    NSString *currentBuildString = [bundle objectForInfoDictionaryKey:@"CFBundleVersion"];
    NSInteger currentBuild = [currentBuildString intValue];
    return currentBuild;
}

- (void)saveFirstInstallBuildNumber:(NSInteger)firstInstallBuildNumber {
    [[NSUserDefaults standardUserDefaults] setInteger:firstInstallBuildNumber forKey:FIRST_BUILD_KEY];
    [[NSUserDefaults standardUserDefaults] synchronize];
}

- (void)saveCurrentBuildNumber:(NSInteger)currentBuildNumber {
    [[NSUserDefaults standardUserDefaults] setInteger:currentBuildNumber forKey:LAST_BUILD_KEY];
    [[NSUserDefaults standardUserDefaults] synchronize];
}


@end
