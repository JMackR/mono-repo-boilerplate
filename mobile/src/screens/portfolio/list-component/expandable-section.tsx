import React, { FC } from "react"
import { Margin, Flex, Text, useColor } from "uc-lib"
import { translate } from "shared-lib"

export const ExpandableSection: FC = () => {
  const { colors } = useColor()

  return (
    <Flex debugColor={colors.quartz} direction="column">
      <Margin debugColor={colors.limestone} marginLeftStep={7.5} marginRightStep={7.5}>
        <Flex width={"26%"}>
          <Text textType="smallBody2" text={translate("portfolio-stack.portfolio-screen.offer")} />
        </Flex>
        <Flex width={"27%"}>
          <Text textType="smallBody2" text={translate("portfolio-stack.portfolio-screen.value")} />
        </Flex>
        <Flex width={"48%"}>
          <Text textType="smallBody2" text={translate("portfolio-stack.portfolio-screen.phone")} />
        </Flex>
      </Margin>
      <Margin marginLeftStep={7.5} marginRightStep={7.5} marginTopStep={1.5}>
        <Flex width={"26%"}>
          <Text textType="secondaryBody2" text={"$3,500"} />
        </Flex>
        <Flex width={"27%"}>
          <Text textType="secondaryBody2" text={"$999,000"} />
        </Flex>
        <Flex width={"48%"}>
          <Text textType="secondaryBody2" text={"321.888.6197"} />
        </Flex>
      </Margin>

      <Margin debugColor={colors.limestone} marginLeftStep={7.5} marginRightStep={7.5} marginTopStep={1.5}>
        <Text textType="smallBody2" text={translate("portfolio-stack.portfolio-screen.property-address")} />
      </Margin>
      <Margin marginLeftStep={7.5} marginRightStep={7.5} marginTopStep={1.5}>
        <Text textType="secondaryBody2" text={"1010 Dusty Orchard Jacksonville, TX 76023"} />
      </Margin>

      <Margin debugColor={colors.limestone} marginLeftStep={7.5} marginRightStep={7.5} marginTopStep={1.5}>
        <Text textType="smallBody2" text={translate("portfolio-stack.portfolio-screen.email")} />
      </Margin>
      <Margin marginLeftStep={7.5} marginRightStep={7.5} marginTopStep={1.5}>
        <Text textType="secondaryBody2" text={"cfleming@gmail.com"} />
      </Margin>

      <Margin debugColor={colors.limestone} marginLeftStep={7.5} marginRightStep={7.5} marginTopStep={1.5}>
        <Flex width={"22%"}>
          <Text textType="smallBody2" text={translate("portfolio-stack.portfolio-screen.value")} />
        </Flex>
        <Flex width={"22%"}>
          <Text textType="smallBody2" text={translate("portfolio-stack.portfolio-screen.gender")} />
        </Flex>
        <Flex width={"22%"}>
          <Text textType="smallBody2" text={translate("portfolio-stack.portfolio-screen.age")} />
        </Flex>
        <Flex width={"34%"}>
          <Text textType="smallBody2" text={translate("portfolio-stack.portfolio-screen.other-properties")} />
        </Flex>
      </Margin>
      <Margin marginLeftStep={7.5} marginRightStep={7.5} marginTopStep={1.5}>
        <Flex width={"22%"}>
          <Text textType="secondaryBody2" text={"Female"} />
        </Flex>
        <Flex width={"22%"}>
          <Text textType="secondaryBody2" text={"Female"} />
        </Flex>
        <Flex width={"22%"}>
          <Text textType="secondaryBody2" text={"56"} />
        </Flex>
        <Flex width={"34%"}>
          <Text textType="secondaryBody2" text={"0"} />
        </Flex>
      </Margin>

      <Margin debugColor={colors.limestone} marginLeftStep={7.5} marginRightStep={7.5} marginTopStep={1.5}>
        <Text textType="smallBody2" text={translate("portfolio-stack.portfolio-screen.notes")} />
      </Margin>
      <Margin marginLeftStep={7.5} marginRightStep={7.5} marginTopStep={1.5} marginBottomStep={7}>
        <Text
          textType="secondaryBody2"
          text={
            "This client and I had a great relationship. We both volunteer at Dallas Pets Alive. She has two Dachshunds: 'Pickles' & 'Turbo'"
          }
        />
      </Margin>
    </Flex>
  )
}
