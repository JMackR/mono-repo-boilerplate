import React from "react"
import Switch from "react-switch"
import { ToggleProps } from "./toggle.props"
import { useColor } from "uc-lib/themes"

export const Toggle = (props: ToggleProps) => {
  const { disabled, onChange, state } = props
  const { colors } = useColor()
  const handleChange = (checked: boolean) => {
    onChange(checked)
  }

  const selectionShadow = `0px 0px 2px 3px ${colors.greenHover}`
  const width = 57
  const height = 30
  const handleDiameter = 24

  const handleOnChange = (checked: boolean): void => {
    handleChange(checked)
  }
  return (
    <label>
      <Switch
        checked={state}
        onChange={handleOnChange}
        checkedIcon={false}
        uncheckedIcon={false}
        disabled={disabled}
        onColor={colors.green}
        offColor={colors.granite}
        onHandleColor={colors.crystal}
        offHandleColor={colors.crystal}
        activeBoxShadow={selectionShadow}
        width={width}
        height={height}
        handleDiameter={handleDiameter}
      />
    </label>
  )
}
