export type Uploadable = File | String

export type UploadPhotoFunctionType = (s3Location: string, uploadable: Uploadable) => Promise<void>
