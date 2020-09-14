import { Button } from "uc-lib"
import { ButtonPropsBase } from "uc-lib/controls/button/button-props-base"
import React, { FC, useContext, useState } from "react"
import _ from "lodash"
import { ValidatedFormContext } from "./validated-form"

export const ValidatedFormButton: FC<
  ButtonPropsBase & {
    onClick: () => Promise<void>
  }
> = (props) => {
  const { onClick, buttonType, disabled: propsDisabled } = props
  const [loading, setLoading] = useState(false)
  const { onSubmit, error } = useContext(ValidatedFormContext)

  const onPress = async () => {
    console.log("I PRESSED")
    // Prevent double click
    if (loading) {
      return
    }

    setLoading(true)
    const err = await onSubmit()
    if (!_.isEmpty(err)) {
      setLoading(false)
      return
    }

    await onClick().finally(() => {
      setLoading(false)
    })
  }

  const hasError = !_.isEmpty(error)
  const disabled = propsDisabled || hasError || loading

  return (
    <Button {...props} disabled={false} buttonType={disabled ? "disabled" : buttonType} onClick={onPress} loading={false} />
  )
}
