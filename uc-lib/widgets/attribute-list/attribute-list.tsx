import React, { FC, useState } from "react"
import { Margin, Stack, Separator, Spacer, Button } from "uc-lib"
import { Text } from "uc-lib/controls/text/text"
// import { ItemDetailElementName } from "shared-lib/analytics/constants/item-detail-constants"
import { AttributeListProps } from "./attribute-list.props"
import { AttributeItem } from "./attribute-item"

const SEE_LESS = "See less"
const SEE_MORE = "See more"

const AttributeList: FC<AttributeListProps> = (props) => {
  const { categoryAttributes, title, expandThreshold, trackClickEvent } = props
  const propertyViews: JSX.Element[] = []

  const [expanded, setExpanded] = useState(false)

  const requiresTruncation = categoryAttributes.length > expandThreshold
  const toggleExpanded = () => {
    if (!expanded) {
      // trackClickEvent(ItemDetailElementName.SeeMoreAdditionalDetails)
    }
    setExpanded(!expanded)
  }

  const toggleLabel = expanded ? SEE_LESS : SEE_MORE

  let propertiesRenderedCount = 0

  categoryAttributes.forEach((attribute) => {
    const canRender = !requiresTruncation || propertiesRenderedCount < expandThreshold || expanded
    if (canRender) {
      propertyViews.push(
        <AttributeItem
          key={attribute.attributeName}
          value={attribute.attributeValue.join(", ")}
          label={attribute.attributeUILabel}
        />,
      )
      propertiesRenderedCount++
    }
  })

  return (
    <Stack direction="column">
      <Margin marginLeftStep={4} marginRightStep={4} marginTopStep={4}>
        <Stack direction="column" grow={1}>
          <Separator />
          <Spacer sizeStep={4} direction="column" />
          <Text textType="headline3" text={title} />
          <Spacer sizeStep={4} direction="column" />
          <Stack direction="column" grow={1} childSeparationStep={2}>
            {propertyViews}
          </Stack>
        </Stack>
      </Margin>
      {requiresTruncation && (
        <Margin marginLeftStep={2} direction="row" axisDistribution="flex-start">
          <Button title={toggleLabel} buttonType="flat" buttonSize="large" onClick={toggleExpanded} />
        </Margin>
      )}
    </Stack>
  )
}

export { AttributeList }
