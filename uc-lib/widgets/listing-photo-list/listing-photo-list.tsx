import React, { FC, useState } from "react"
import { RemoteImage, Margin, List, Flex } from "uc-lib"
import _, { property } from "lodash"
import { StyleSheet, css } from "aphrodite"
import { ListingPhotoListProps } from "./listing-photo-list.props"
import { useColorForBackgroundColor } from "../../themes"

const PHOTO_GALLERY_MIN_HEIGHT_PERCENT = 0.37
const PHOTO_GALLERY_MAX_HEIGHT_PERCENT = 0.65
const PHOTO_GALLERY_RESIZE_MODE = "contain"
const SELECTED_OPACITY = 1.0
const DEFAULT_OPACITY = 0.5
const PHOTO_STRIP_SIZE = 48
const PHOTO_STRIP_RESIZE_MODE = "cover"
const PHOTO_STRIP_SEPARATION_STEP = 2
const PHOTO_STRIP_START_MARGIN = 0

const ListingPhotoList: FC<ListingPhotoListProps> = props => {
  const SCREEN_HEIGHT = window.outerHeight
  const { photos } = props
  const [selectedIndex, setSelectedIndex] = useState(0)

  let firstImageHeight = photos && (property("detail.height")(photos[0]) as number)
  const heightPercent = firstImageHeight ? firstImageHeight / SCREEN_HEIGHT : 0

  if (heightPercent > PHOTO_GALLERY_MAX_HEIGHT_PERCENT) {
    firstImageHeight = SCREEN_HEIGHT * PHOTO_GALLERY_MAX_HEIGHT_PERCENT
  }

  const currentImageURL = photos && (property("detail.url")(photos[selectedIndex]) as string)
  const imageWidth = photos && (property("detail.width")(photos[selectedIndex]) as number)
  const imageHeight = photos && (property("detail.height")(photos[selectedIndex]) as number)

  const imageAspect = imageWidth && imageHeight ? imageWidth / imageHeight : 1

  const renderThumbnailImage = (image: object, index: number) => {
    const opacity = index === selectedIndex ? SELECTED_OPACITY : DEFAULT_OPACITY
    const styles = StyleSheet.create({
      Thumbnail: {
        opacity,
      },
    })
    const url = property("detail.url")(image) as string
    const onClick = () => setSelectedIndex(index)

    return (
      <div onClick={onClick} className={css(styles.Thumbnail)}>
        <Margin marginLeftStep={index === 0 ? PHOTO_STRIP_START_MARGIN : PHOTO_STRIP_SEPARATION_STEP}>
          <RemoteImage
            resizeMode={PHOTO_STRIP_RESIZE_MODE}
            source={{ uri: url }}
            width={PHOTO_STRIP_SIZE}
            height={PHOTO_STRIP_SIZE}
          />
        </Margin>
      </div>
    )
  }

  const outerStyles = StyleSheet.create({
    MainImageContainer: {
      border: "solid 1px",
      borderColor: useColorForBackgroundColor("secondary"),
      borderWidth: 2,
      width: "100%",
    },
  })

  return (
    <Flex axisDistribution="flex-start" direction="column" shrink={1} crossAxisDistribution="center">
      <div className={css(outerStyles.MainImageContainer)}>
        <RemoteImage
          resizeMode={PHOTO_GALLERY_RESIZE_MODE}
          source={{ uri: currentImageURL }}
          width="100%"
          aspectRatio={imageAspect}
        />
      </div>
      <Margin direction="row" axisDistribution="flex-start" grow={1} width="50%" marginTopStep={4}>
        <List horizontal={true} data={photos} renderItem={renderThumbnailImage} testID={"listing-photo-list.thumbnails"} />
      </Margin>
    </Flex>
  )
}

export { ListingPhotoList }
