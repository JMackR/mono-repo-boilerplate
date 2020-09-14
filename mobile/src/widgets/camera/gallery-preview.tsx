import React, { FC, useEffect, useState } from "react"
import { PhotoImageIdentifier, getPhotos } from ".."
import { LocalImage, Overlay, Border, Text, ActivityIndicator } from "uc-lib"
import { translate } from "shared-lib"
import { TILE_SIZE } from "./bottom-controls"

export const GalleryPreview: FC = () => {
  const [mostRecentTwoPhotos, setMostRecentTwoPhotos] = useState<PhotoImageIdentifier[]>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    getPhotos({ first: 2 })
      .then(response => {
        setMostRecentTwoPhotos(response.edges.map(e => e.node.image))
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  if (loading) {
    return <ActivityIndicator size="small" />
  }
  if (mostRecentTwoPhotos.length > 0) {
    return (
      <>
        <LocalImage
          borderRadius={4}
          source={{ uri: mostRecentTwoPhotos[0].uri }}
          resizeMode="cover"
          width={TILE_SIZE}
          height={TILE_SIZE}
          testID={"camera.gallery-preview"}
        />
        {mostRecentTwoPhotos.length > 1 && (
          <Overlay insetRightStep={-2} insetTopStep={-2}>
            <LocalImage
              borderRadius={4}
              source={{ uri: mostRecentTwoPhotos[1].uri }}
              resizeMode="cover"
              width={TILE_SIZE}
              height={TILE_SIZE}
            />
          </Overlay>
        )}
      </>
    )
  } else {
    return (
      <Border
        cornerRadius="small"
        lineWeight="light"
        color="alwaysLight"
        width={TILE_SIZE}
        height={TILE_SIZE}
        axisDistribution="center"
        crossAxisDistribution="center"
      >
        <Text textType="tertiaryBody2" color="alwaysLight" textAlign="center">
          {translate("camera.no-photo")}
        </Text>
      </Border>
    )
  }
}
