import { CameraRoll } from "./native-interface"
import { AlbumIndentifier, GetPhotosParams, PhotoIdentifiersPage, PhotoImageIdentifier } from "./props"
import invariant from "invariant"
import { translate } from "shared-lib"
import { UUID } from "../../utilities/uuid"
import { Platform } from "react-native"
import { Image } from "react-native"

const widthHeightSanityCheck = (width?: number, height?: number) => {
  const hasWidthAndHeigth = width !== undefined && height !== undefined
  const hasNoWidthAndHeight = width === undefined && height === undefined
  const isValid = hasWidthAndHeigth || hasNoWidthAndHeight
  invariant(isValid, "The 'width' and 'height' have to be either both defined or both not.")
}
interface SavePhotoParams {
  uri: string
  directoryPath?: string
  height?: number
  width?: number
}
export const saveToCameraRoll: (params: SavePhotoParams) => Promise<PhotoImageIdentifier> = async ({
  uri,
  directoryPath,
  width,
  height,
}) => {
  widthHeightSanityCheck(width, height)
  const photo: PhotoImageIdentifier = await CameraRoll.saveToCameraRoll({
    uri,
    directoryPath,
    width,
    height,
  })
  photo.changeToken = UUID.uuid()
  return photo
}

export const getPhotos: (params: GetPhotosParams) => Promise<PhotoIdentifiersPage> = async params => {
  return CameraRoll.getPhotos(params)
}

export const getAlbums: () => Promise<AlbumIndentifier[]> = () => {
  const mostRecentAlbumTitle = translate("camera-roll.most-recent-album-title")
  return CameraRoll.getAlbums({
    mostRecentAlbumTitle,
  })
}

interface SavePhotosFromGalleryParams {
  photoIds: string[]
  directoryPath?: string
  height?: number
  width?: number
}

export const savePhotosFromGallery: (params: SavePhotosFromGalleryParams) => Promise<PhotoImageIdentifier[]> = async ({
  photoIds,
  directoryPath,
  height,
  width,
}) => {
  widthHeightSanityCheck(width, height)
  return CameraRoll.savePhotosFromGallery({
    photoIds,
    directoryPath,
    width,
    height,
  })
}

export const deletePhotosAt: (directory: string) => Promise<object> = async directoryPath => {
  return CameraRoll.deletePhotos(directoryPath)
}

interface RotatePhotoParam {
  uri: string
  rotationDegree: number
  directoryPath: string
}

export const rotatePhoto: (params: RotatePhotoParam) => Promise<string> = ({ uri, rotationDegree, directoryPath }) => {
  return CameraRoll.rotatePhoto({
    uri,
    rotationDegree,
    directoryPath,
  })
}

interface DownloadRemotePhotoParam {
  urlToDownload: string
  directoryPath: string
}

export const downloadRemotePhoto: (
  params: DownloadRemotePhotoParam,
) => Promise<Pick<PhotoImageIdentifier, "uri" | "filename" | "isStored">> = async ({ urlToDownload, directoryPath }) => {
  const downloadedUri = await CameraRoll.downloadRemotePhoto({
    urlToDownload,
    directoryPath,
  })
  return { uuid: undefined, filename: UUID.uuid(), uri: downloadedUri, isStored: true }
}

export const getImageSizeReact = (uri: string) => {
  return new Promise((resolve, reject) => {
    Image.getSize(
      uri,
      (width, height) => {
        resolve([width, height])
      },
      error => {
        reject(error)
      },
    )
  })
}

const getImageSizeAndroid = (uri: string) => {
  return CameraRoll.getImageSize(uri)
}

export const getImageSize: (uri: string) => Promise<[number, number]> = async uri => {
  return Platform.OS === "android" ? getImageSizeAndroid(uri) : getImageSizeReact(uri)
}

interface CropPhotoParam {
  uri: string
  directoryPath: string
  x: number
  y: number
  width: number
  height: number
  id: string
}

export const cropPhoto: (params: CropPhotoParam) => Promise<PhotoImageIdentifier> = async ({
  uri,
  x,
  y,
  width,
  height,
  directoryPath,
  id,
}) => {
  const photo: PhotoImageIdentifier = await CameraRoll.cropPhoto({
    uri,
    directoryPath,
    x,
    y,
    width,
    height,
  })
  photo.changeToken = UUID.uuid()
  photo.id = id
  return photo
}

export const extractRelativeUri = (fullUri = "", baseUri: string) => fullUri.substr(baseUri.length)

export const buildPhotoUri = (baseUri: string, relativeUri: string) =>
  Platform.select({
    ios: `${baseUri}/${relativeUri}`,
    android: relativeUri,
  })

export const getAppSandboxBaseFileUri = async () => {
  if (Platform.OS === "ios") {
    return CameraRoll.getBaseUri()
  } else {
    return ""
  }
}
