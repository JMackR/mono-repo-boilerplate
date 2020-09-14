export interface BreadcrumbUnitProps {
  label: string;
  url?: string;
}
export interface BreadcrumbProps {
  data: BreadcrumbUnitProps[];
  onPress(url: string): void;
  lastItemClickable?: boolean;
}
