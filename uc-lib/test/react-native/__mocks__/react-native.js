import React from "react";

import { View } from "react-native";
export * from "react-native";

/**
 * Snapshot testing does not work for any elements that use
 *    Android's TouchableNativeFeedback component.
 * This code mocks that component with a View and forwards all
 *    of the props passed into the original TouchableNativeFeedback
 */

export const TouchableNativeFeedback = touchableNativeFeedback => {
  const { children, ...rest } = touchableNativeFeedback;
  const props = Object.getOwnPropertyDescriptors(rest);
  return (
    <View {...props} mocked="-Mocked TouchableNativeFeedback">
      {children}
    </View>
  );
};
TouchableNativeFeedback.SelectableBackground = jest.fn(
  () => "-Mocked TouchableNativeFeedback.SelectableBackground"
);
TouchableNativeFeedback.SelectableBackgroundBorderless = jest.fn(
  () => "-Mocked TouchableNativeFeedbackSelectable.BackgroundBorderless"
);
TouchableNativeFeedback.Ripple = jest.fn(
  () => "-Mocked TouchableNativeFeedback.Ripple"
);

global.requestAnimationFrame = cb => {
  cb();
};
