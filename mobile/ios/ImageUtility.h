//
//  ImageUtility.h

//
//  Copyright © 2016 iDeal Technologies. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ImageUtility : NSObject

+ (UIImage *)cropImage:(UIImage *)image inRect:(CGRect)rect;

+ (UIImage *)imageBySquareCroppingImage:(UIImage *)image;

+ (UIImage *)imageByScalingImage:(UIImage *)image toFitSize:(CGSize)fitSize;

+ (UIImage *)imageByRotatingImage:(UIImage *)image radians:(double)rotationRadians;

+ (double)degreeToRadians:(double)degree;

@end
