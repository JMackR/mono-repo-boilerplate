import { Background, Margin, Text, useColorForBackgroundColor, useFontTheme } from "uc-lib"
import React from "react"
import { ItemPreviewProps } from "./item-preview.props"
import { formatMoney, MoneyTrimType } from "../../formatters/number-formatters"

export const ItemPreview: React.FC<ItemPreviewProps> = props => {
  const { image, price } = props
  const { baseMargin } = useFontTheme()
  const size = baseMargin * 12
  const backgroundColor = useColorForBackgroundColor("overlay")
  const formattedPrice = formatMoney(price, MoneyTrimType.NoDecimalsAndShorten)

  return (
    <div>
      <div
        style={{
          borderRadius: baseMargin,
          height: size,
          width: size,
          overflow: "hidden",
          position: "relative",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
        }}
      >
        <div
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
        </div>
      </div>
    </div>
  )
}
