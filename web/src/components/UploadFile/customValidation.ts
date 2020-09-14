import { FileRejection } from "react-dropzone"
import { FileError } from "./types"

export type CustomValidationOptionsType = {
  image?: ImageOptionsType;
}

type ImageOptionsType = {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  square?: boolean;
}

const _URL = window.URL || window.webkitURL

const imageValidation = (img: HTMLImageElement, params: ImageOptionsType): FileError[] => {
  const errors: FileError[] = []
  if (
    (params.minWidth !== undefined && img.width < params.minWidth) ||
    (params.maxWidth !== undefined && img.width > params.maxWidth) ||
    (params.minHeight !== undefined && img.height < params.minHeight) ||
    (params.maxHeight !== undefined && img.height > params.maxHeight)
  ) {
    errors.push({
      code: "invalid-image-size",
      message: "Invalid image size",
    })
  }

  if (params.square !== undefined && img.height !== img.width) {
    errors.push({
      code: "invalid-image-ratio",
      message: "Incorrect image aspect ratio",
    })
  }

  return errors
}

export const customValidation = async (
  acceptedFiles: File[],
  options: CustomValidationOptionsType,
): Promise<[File[], FileRejection[]]> => {
  const newAcceptedFiles: File[] = []
  const newFileRejections: FileRejection[] = []

  for (let i = 0; i < acceptedFiles.length; i++) {
    if (options.image !== undefined) {
      if (/(\.jpg|\.jpeg|\.png|\.gif)$/i.exec(acceptedFiles[i].name)) {
        await new Promise((resolve) => {
          const img = new Image()
          const objectUrl = _URL.createObjectURL(acceptedFiles[i])
          img.onload = () => {
            const errors = imageValidation(img, options.image as ImageOptionsType)
            if (!errors.length) {
              newAcceptedFiles.push(acceptedFiles[i])
            } else {
              newFileRejections.push({
                file: acceptedFiles[i],
                errors,
              })
            }
            _URL.revokeObjectURL(objectUrl)
            resolve()
          }
          img.src = objectUrl
        })
      } else {
        newFileRejections.push({
          file: acceptedFiles[i],
          errors: [
            {
              code: "file-invalid-type",
              message: "File type must be .jpg|.jpeg|.png|.gif",
            },
          ],
        })
      }
    }
  }

  return [newAcceptedFiles, newFileRejections]
}
