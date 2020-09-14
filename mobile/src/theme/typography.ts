/**
 * Font family definitions
 */
export enum typography {
  /** The primary font.  Used in most places. */
  primary = "Regular",
  /** Highly-stylized font used sparingly for branding */
  brand = "Mulish",
}

/**
 * Font weights
 */
export enum weight {
  regular = "Regular",
  regularItalic = "RegularItalic",
  medium = "Medium",
  semibold = "Semibold",
  bold = "Bold",
  boldItalic = "BoldItalic",
  extrabold = "Extrabold",
}

export function fontFamily(fontFamily: typography, weight: weight): string {
  return `${fontFamily}-${weight}`
}
