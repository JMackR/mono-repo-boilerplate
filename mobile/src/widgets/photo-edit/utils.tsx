import { PhotoImageIdentifier, cropPhoto, downloadRemotePhoto, getImageSize } from ".."

export const autoSquareCrop = async (originalCoverPhoto: PhotoImageIdentifier, directoryPath: string) => {
  let x: number
  let y: number
  let uri = originalCoverPhoto.uri
  // if it is remote photo for edit flow, then download first
  if (originalCoverPhoto.uuid) {
    const downloadedPhoto = await downloadRemotePhoto({ directoryPath, urlToDownload: originalCoverPhoto.uri })
    uri = downloadedPhoto.uri
  }
  const [width, height] = await getImageSize(uri)
  const shouldUseHeight = width > height
  const size = shouldUseHeight ? height : width

  if (width === 0 || height === 0) {
    return originalCoverPhoto
  }
  if (width > height) {
    x = (width - height) / 2
    y = 0
  } else {
    x = 0
    y = (height - width) / 2
  }
  return cropPhoto({
    directoryPath,
    height: size,
    width: size,
    x,
    y,
    uri,
    id: originalCoverPhoto.id,
  })
}
