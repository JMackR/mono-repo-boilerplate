//
//  ImageUtility.m

//
//  Created by Sam Bender on 8/26/16.
//  Copyright © 2016 iDeal Technologies. All rights reserved.
//

#import "ImageUtility.h"
#import "RectTransformUtility.h"

static NSInteger const numberOfBitsPerComponent = 8;
static NSInteger const numberOfComponents = 4;

@implementation ImageUtility

/**
 * http://stackoverflow.com/a/25293588
 */
+ (UIImage *)cropImage:(UIImage *)image inRect:(CGRect)rect; {
    CGFloat (^rad)(CGFloat) = ^(CGFloat deg) {
        return deg / 180.0f * (CGFloat) M_PI;
    };

    CGAffineTransform rectTransform;
    switch (image.imageOrientation) {
        case UIImageOrientationLeft:
            rectTransform = CGAffineTransformTranslate(CGAffineTransformMakeRotation(rad(90.0f)), 0.0f, -image.size.height);
            break;
        case UIImageOrientationRight:
            rectTransform = CGAffineTransformTranslate(CGAffineTransformMakeRotation(rad(-90.0f)), -image.size.width, 0.0f);
            break;
        case UIImageOrientationDown:
            rectTransform = CGAffineTransformTranslate(CGAffineTransformMakeRotation(rad(-180.0f)), -image.size.width, -image.size.height);
            break;
        default:
            rectTransform = CGAffineTransformIdentity;
    };
    rectTransform = CGAffineTransformScale(rectTransform, image.scale, image.scale);

    CGImageRef imageRef = CGImageCreateWithImageInRect([image CGImage], CGRectApplyAffineTransform(rect, rectTransform));
    UIImage *result = [UIImage imageWithCGImage:imageRef scale:image.scale orientation:image.imageOrientation];
    CGImageRelease(imageRef);

    return result;
}

+ (UIImage *)imageBySquareCroppingImage:(UIImage *)image {
    CGFloat minDimension = MIN(image.size.width, image.size.height);
    CGSize squareSize = CGSizeMake(minDimension, minDimension);
    CGRect squareRect = [RectTransformUtility aspectFitFrameForSize:squareSize insideOf:image.size];
    return [self cropImage:image inRect:squareRect];
}

+ (UIImage *)imageByScalingImage:(UIImage *)image toFitSize:(CGSize)fitSize {
    CGRect scaledRect = [RectTransformUtility aspectFitFrameForSize:image.size insideOf:fitSize];
    
    /// Create a bitmap context
    CGColorSpaceRef deviceColorSpace = CGColorSpaceCreateDeviceRGB();
    CGContextRef bmContext = CGBitmapContextCreate(NULL, scaledRect.size.width, scaledRect.size.height, numberOfBitsPerComponent, scaledRect.size.width * numberOfComponents, deviceColorSpace, kCGBitmapByteOrderDefault | kCGImageAlphaPremultipliedFirst);
    if (!bmContext) {
        CGColorSpaceRelease(deviceColorSpace);
        return nil;
    }

    /// Image quality
    CGContextSetShouldAntialias(bmContext, true);
    CGContextSetAllowsAntialiasing(bmContext, true);
    CGContextSetInterpolationQuality(bmContext, kCGInterpolationHigh);
    
    /// Draw the image in the bitmap context
    UIGraphicsPushContext(bmContext);
    CGContextTranslateCTM(bmContext, 0.0f, scaledRect.size.height);
    CGContextScaleCTM(bmContext, 1.0f, -1.0f);
    [image drawInRect:CGRectMake(0.0f, 0.0f, scaledRect.size.width, scaledRect.size.height)];
    UIGraphicsPopContext();
    
    /// Create an image object from the context
    CGImageRef scaledImageRef = CGBitmapContextCreateImage(bmContext);
    UIImage* scaled = [UIImage imageWithCGImage:scaledImageRef];
    
    /// Cleanup
    CGImageRelease(scaledImageRef);
    CGContextRelease(bmContext);
    CGColorSpaceRelease(deviceColorSpace);

    return scaled;
}

+ (UIImage *)imageByRotatingImage:(UIImage *)image radians:(double)rotationRadians {
    if (rotationRadians == 0.0) {
        return image;
    }

    CGRect rect = CGRectApplyAffineTransform(CGRectMake(0.0, 0.0, image.size.width, image.size.height), CGAffineTransformMakeRotation(rotationRadians));
    // NOTE: The transformation can in some cases return non-integer numbers. (Ex: 240.0000000000003). When you give that size to UIGraphics to create a new context,
    // it rounds up to the nearest whole value which causes the image to grow by a pixel in each direction. It's not noticeable for a
    // single rotation, but if you apply multiple rotations an image can grow to infinite size...
    CGSize rotatedSize = CGSizeMake(floorf(rect.size.width), floorf(rect.size.height));

    UIGraphicsBeginImageContext(rotatedSize);
    CGContextRef bitmap = UIGraphicsGetCurrentContext();

    CGContextTranslateCTM(bitmap, rotatedSize.width * 0.5f, rotatedSize.height * 0.5f);
    CGContextRotateCTM(bitmap, rotationRadians);
    
    // Scale swap required, otherwise we'll have mirrored images.
    CGContextScaleCTM(bitmap, 1.0, -1.0);

    CGContextDrawImage(bitmap, CGRectMake(-image.size.width * 0.5f, -image.size.height * 0.5f, image.size.width, image.size.height), [image CGImage]);

    UIImage *result = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();

    return result;
}

+ (double)degreeToRadians:(double)degree {
    return (M_PI * degree) / 180.0;
}

@end
