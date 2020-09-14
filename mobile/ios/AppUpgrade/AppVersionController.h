//
//  AppUpdateController.h
//
//


#import <Foundation/Foundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface AppVersionController : NSObject

+ (AppVersionController *)sharedInstance;

- (void)loadAppUpdateInfo;

@property (nonatomic, assign, readonly) BOOL isFirstRunAfterInstall;
@property (nonatomic, assign, readonly) BOOL isRunningFirstInstalledVersion;
@property (nonatomic, assign, readonly) BOOL wasAppUpdated;

@end

NS_ASSUME_NONNULL_END
