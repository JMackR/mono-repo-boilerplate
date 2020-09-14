import RNFS from "react-native-fs"
import { Uploadable, UploadPhotoFunctionType } from "shared-lib/network"
import { UUID } from "../../utilities"
import { Platform } from "react-native"

export const SinglePhotoUploader: UploadPhotoFunctionType = async (s3BucketUrl: string, localPhotoUri: Uploadable) => {
  const filename = `${UUID.uuid()}.jpg`
  const uri = localPhotoUri as string
  await RNFS.uploadFiles({
    method: "PUT",
    toUrl: s3BucketUrl,
    binaryStreamOnly: true,
    headers: {
      "Content-Type": "",
    },
    files: [
      {
        name: filename,
        filename,
        filepath: uri.replace("file://", ""),
        filetype: "image/jpeg",
      },
    ],
  }).promise
}
