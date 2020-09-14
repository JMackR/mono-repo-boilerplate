import { ListProps } from "../list";

interface GridGapStep {
  horizontal: number;
  vertical: number;
}

export interface GridProps<T> extends ListProps<T> {
  tileWidth?: string | number;
  gapStep?: GridGapStep;
}

export type PartialGripProps<T> = Pick<
  GridProps<T>,
  "columns" | "gapStep" | "tileWidth"
>;

export interface RenderItemProps {
  item: any;
  index: number;
}
