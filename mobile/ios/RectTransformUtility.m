//
//  RectTransformUtility.m

//  Created by Sam Bender on 8/26/16.
//  Copyright © 2016 iDeal Technologies. All rights reserved.
//
@import Foundation;

typedef NS_ENUM(NSUInteger, RectTransformMode) {
    RectTransformModeAspectFill,
    RectTransformModeAspectFit
};

#import "RectTransformUtility.h"

@implementation RectTransformUtility

+ (CGRect)aspectFitFrameForSize:(CGSize)fromSize insideOf:(CGSize)toSize {
    return [RectTransformUtility scale:fromSize toBeWithin:toSize withMode:RectTransformModeAspectFit];
}

+ (CGRect)aspectFillFrameForSize:(CGSize)fromSize insideOf:(CGSize)toSize {
    return [RectTransformUtility scale:fromSize toBeWithin:toSize withMode:RectTransformModeAspectFill];
}

+ (CGRect)scale:(CGSize)fromSize toBeWithin:(CGSize)toSize withMode:(RectTransformMode)mode {
    if (CGSizeEqualToSize(CGSizeZero, fromSize) || CGSizeEqualToSize(CGSizeZero, toSize)) {
        return CGRectZero;
    }
    
    CGFloat frameAspect = fromSize.width / fromSize.height;
    CGFloat imageAspect = toSize.width / toSize.height;
    CGFloat scaleFactor;
    
    BOOL flipCondition = imageAspect < frameAspect;
    if (mode == RectTransformModeAspectFill) {
        flipCondition = imageAspect > frameAspect;
    }
    
    if (flipCondition) {
        // width is proportionally larger for frameSize
        // so, scaleFactor should be from the width ratio
        scaleFactor = toSize.width / fromSize.width;
    } else {
        // height is proportionally larger for frame
        // so, scaleFactor should be from the height ratio
        scaleFactor = toSize.height / fromSize.height ;
    }
    
    CGSize newSize = fromSize;
    newSize.width = floorf(scaleFactor * fromSize.width);
    newSize.height = floorf(scaleFactor * fromSize.height);
    
    CGFloat widthDelta = toSize.width - newSize.width;
    CGFloat heightDelta = toSize.height - newSize.height;
    
    return CGRectMake(widthDelta / 2.0f, heightDelta / 2.0f, newSize.width, newSize.height);
}

@end
