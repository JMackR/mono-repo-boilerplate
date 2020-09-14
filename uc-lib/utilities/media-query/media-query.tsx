export enum MediaName {
  Mobile = "mobile",
  Tablet = "tablet",
  Desktop = "desktop",
}
export enum MediaSize {
  MobileMax = 575,
  TabletMax = 768,
}

const MediaBreakpoint = {
  [MediaName.Mobile]: {
    max: MediaSize.MobileMax,
  },
  [MediaName.Tablet]: {
    min: MediaSize.MobileMax + 1,
    max: MediaSize.TabletMax,
  },
  [MediaName.Desktop]: {
    min: MediaSize.TabletMax + 1,
  },
}

export const Media = {
  [MediaName.Mobile]: `(max-width: ${MediaBreakpoint[MediaName.Mobile].max}px)`,
  [MediaName.Tablet]: `(min-width: ${MediaBreakpoint[MediaName.Tablet].min}px) and (max-width: ${
    MediaBreakpoint[MediaName.Tablet].max
  }px)`,
  [MediaName.Desktop]: `(min-width: ${MediaBreakpoint[MediaName.Desktop].min}px)`,
}

export const MediaQuery = {
  [MediaName.Mobile]: `@media ${Media[MediaName.Mobile]}`,
  [MediaName.Tablet]: `@media ${Media[MediaName.Tablet]}`,
  [MediaName.Desktop]: `@media ${Media[MediaName.Desktop]}`,
}

export const getMediaNameBasedOnWindowWidth = () => {
  if (typeof window === undefined) {
    return undefined
  }
  if (window.innerWidth <= MediaSize.MobileMax) {
    return MediaName.Mobile
  }
  if (window.innerWidth <= MediaSize.TabletMax) {
    return MediaName.Tablet
  }
  return MediaName.Desktop
}
