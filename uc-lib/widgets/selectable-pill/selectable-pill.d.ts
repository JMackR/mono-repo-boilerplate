import { MouseEvent } from "react";
import { NativeTouchEvent } from "react-native";
import { TextTypes } from "uc-lib/themes";

export interface SelectablePillProps {
  text: string;
  textType?: keyof TextTypes;
  initiallySelected: boolean;
  href?: string;
  onClick(event: NativeTouchEvent | MouseEvent, selected: boolean): void;
  testId?: string;
  testID?: string;
}
