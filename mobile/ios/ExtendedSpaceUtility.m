//
//  ExtendedSpaceUtility.m
//
//  Created by Allen Hurst on 12/7/17.
//  Copyright © 2017 iDeal Technologies. All rights reserved.
//

#import "ExtendedSpaceUtility.h"

@implementation ExtendedSpaceUtility

+ (CGRect)rectForExtendedSpaceUnderView:(UIView *)view {
    CGRect screenFrame = UIScreen.mainScreen.bounds;
    CGRect viewFrame = [view.superview convertRect:view.frame toView:nil];
    CGFloat bottomSpacing = (CGRectGetMaxY(screenFrame) - CGRectGetMaxY(viewFrame));
    if (bottomSpacing > 0.0f) {
        return CGRectMake(0.0f, CGRectGetMaxY(viewFrame), CGRectGetWidth(screenFrame), bottomSpacing);
    }
    return CGRectZero;
}

@end
