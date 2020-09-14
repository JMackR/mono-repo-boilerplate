import React, { createContext, useContext, useState, FC } from "react"
import { PhotoImageIdentifier } from "../../widgets"

const MAX_NUMBER_OF_PHOTOS_TO_SELECT = 20

interface ImageContextType {
  selectedPhotos: PhotoImageIdentifier[]
  setSelectedPhotos: (_imgs: PhotoImageIdentifier[]) => void
  maxNumberOfPhotos: number
}

const ImageContext = createContext<ImageContextType>({
  selectedPhotos: [],
  setSelectedPhotos: (_uris: PhotoImageIdentifier[]) => {},
  maxNumberOfPhotos: 0,
})

export const ImageAccessProvider: FC = ({ children }) => {
  const [selectedPhotos, setSelectedPhotos] = useState<PhotoImageIdentifier[]>([])
  return (
    <ImageContext.Provider value={{ selectedPhotos, setSelectedPhotos, maxNumberOfPhotos: MAX_NUMBER_OF_PHOTOS_TO_SELECT }}>
      {children}
    </ImageContext.Provider>
  )
}

export const useImageAccess = () => useContext(ImageContext)
