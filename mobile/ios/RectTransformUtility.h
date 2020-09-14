//
//  RectTransformUtility.h

//
//  Created by Sam Bender on 8/26/16.
//  Copyright © 2016 iDeal Technologies. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface RectTransformUtility : NSObject

+ (CGRect)aspectFitFrameForSize:(CGSize)fromSize insideOf:(CGSize)toSize;
+ (CGRect)aspectFillFrameForSize:(CGSize)fromSize insideOf:(CGSize)toSize;

@end
