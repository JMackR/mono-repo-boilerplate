import { Background, Margin, RemoteImage, Text, useColorForBackgroundColor, useFontTheme } from "uc-lib"
import React from "react"
import { View } from "react-native"
import { ItemPreviewProps } from "./item-preview.props"
import { Flex } from "../../controls"
import { formatMoney, MoneyTrimType } from "../../formatters/number-formatters"

export const ItemPreview: React.FC<ItemPreviewProps> = props => {
  const { image, price } = props
  const { baseMargin } = useFontTheme()
  const size = baseMargin * 12
  const backgroundColor = useColorForBackgroundColor("overlay")

  const formattedPrice = formatMoney(price, MoneyTrimType.NoDecimalsAndShorten)

  return (
    <Flex>
      <View style={{ borderRadius: baseMargin, overflow: "hidden" }}>
        <RemoteImage
          width={size}
          aspectRatio={1}
          resizeMode="cover"
          source={{
            uri: image,
          }}
        />
        <View
          style={{
            flex: 1,
            bottom: 0,
            position: "absolute",
            left: 0,
            right: 0,
            backgroundColor,
          }}
        >
          <Background type="overlay" />
          <Margin marginStep={1} direction="column">
            <Text textType="tertiaryBody2" textAlign="center" color="primaryAlt">
              {formattedPrice}
            </Text>
          </Margin>
        </View>
      </View>
    </Flex>
  )
}
