import React, { FC } from "react"
import { BreadcrumbProps, BreadcrumbUnitProps } from "./breadcrumb.d"
import { Text, Touchable, List, Spacer } from "../../controls"
export const Breadcrumb: FC<BreadcrumbProps> = ({ data = [], onPress, lastItemClickable }) => {
  const renderUnit = (item: BreadcrumbUnitProps, index: number) => {
    const { label, url } = item
    const handlePress = () => {
      if (onPress && url) {
        onPress(url)
      }
    }

    if (data.length === 1) {
      return (
        <Touchable onPress={handlePress} key={index}>
          <Text textType="secondaryBody2">{`< ${label}`}</Text>
        </Touchable>
      )
    }
    if (index < data.length - 1 || lastItemClickable) {
      const formattedLabel = index < data.length - 1 ? `${label} ›` : label
      return (
        <>
          <Touchable onPress={handlePress} key={index}>
            <Text textType="secondaryBody2">{formattedLabel}</Text>
          </Touchable>
          <Spacer direction="row" sizeStep={1} />
        </>
      )
    }
    return (
      <Text textType="secondaryBody2" color="secondary" key={index}>
        {`${label}`}
      </Text>
    )
  }
  return <List horizontal={true} data={data} renderItem={renderUnit} />
}
