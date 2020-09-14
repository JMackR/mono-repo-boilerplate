/**
 *  Group type should be platform specific. But it is copied from react-native-community/cameraroll npm for now.
 *  Will need to investigate how we should access different group/album depending on platform
 */
const GRP_TYPES_OPTIONS = {
  Album: "Album",
  All: "All", // default
  Event: "Event",
  Faces: "Faces",
  Library: "Library",
  PhotoStream: "PhotoStream",
  SavedPhotos: "SavedPhotos",
}

export type GroupTypes = keyof typeof GRP_TYPES_OPTIONS

/**
 * Shape of the param arg for the `getPhotos` function.
 */
export interface GetPhotosParams {
  /**
   * The number of photos wanted in reverse order of the photo application
   * (i.e. most recent first).
   */
  first: number

  /**
   * A cursor that matches `page_info { end_cursor }` returned from a previous
   * call to `getPhotos`
   */
  after?: string

  albumId?: string
}

export interface PhotoIdentifier {
  node: {
    group_name: string
    image: PhotoImageIdentifier
    timestamp: number
  }
}

export interface PhotoImageIdentifier {
  id: string
  filename?: string
  uri: string
  /**
   * relative uri is only used for iOS in purpose of storing/retrieving photos
   * due to iOS recreates sandbox enviroment path on every launch since iOS 8+
   */
  relativeUri?: string
  height?: number
  width?: number
  isStored?: boolean
  changeToken?: string
  uuid?: string
}

export interface PhotoIdentifiersPage {
  edges: PhotoIdentifier[]
  page_info: PhotoPageInfo
}

export interface PhotoPageInfo {
  has_next_page: boolean
  start_cursor?: string
  end_cursor?: string
}

export interface AlbumIndentifier {
  id: string
  title: string
  numberOfPhotos: number
  coverPhotoUri?: string
}
