import React from "react"
import { Uploadable, UploadPhotoFunctionType } from "./photo-upload"
import { useApolloClient } from "@apollo/react-hooks"

export const PhotoUploadContext = React.createContext({
  uploadPhotos: (_: Uploadable[]) => Promise.resolve([""]),
  uploading: false,
})

export const PhotoUploadProvider: React.FC<{
  uploader: UploadPhotoFunctionType
}> = ({ children, uploader }) => {
  const [uploading, setUploading] = React.useState(false)
  const apolloClient = useApolloClient()
  const uploadPhotos = async (uploadables: Uploadable[]) => {
    try {
      setUploading(true)
      const { data } = await apolloClient.mutate({
        mutation: GENERATE_PHOTO_UUIDS,
        variables: {
          numberOfPhotos: uploadables.length,
        },
      })
      const s3Buckets = data.generateS3PhotoUuids as S3Photo[]

      const uuids = await Promise.all(
        s3Buckets.map(async (s3Photo, idx: number) => {
          await uploader(s3Photo.location, uploadables[idx])
          return s3Photo.uuid
        }),
      )
      return uuids
    } catch (err) {
      throw err
    } finally {
      setUploading(false)
    }
  }
  return <PhotoUploadContext.Provider value={{ uploadPhotos, uploading }}>{children}</PhotoUploadContext.Provider>
}
