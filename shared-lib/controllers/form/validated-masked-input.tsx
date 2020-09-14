import { InputProps, MaskedInput } from "uc-lib"
import React, { useContext, useEffect, forwardRef } from "react"
import { ValidatedFormContext } from "./validated-form"
import { TextEntryRef } from "uc-lib/controls"

export const ValidatedMaskedInput = forwardRef<TextEntryRef, InputProps & { mask: string; role: string }>((props, ref) => {
  const { role, textChangeHandler, text, error: defaultError } = props
  const { error, validators, onChangeValue, value } = useContext(ValidatedFormContext)

  useEffect(() => onChangeValue(role, text), [text])

  const onChange = (newValue?: string) => {
    textChangeHandler && textChangeHandler(newValue)
    onChangeValue(role, newValue)
  }

  return (
    <MaskedInput
      ref={ref}
      {...props}
      text={value[role]}
      textChangeHandler={onChange}
      validators={validators[role]}
      error={error[role] || defaultError}
    />
  )
})
