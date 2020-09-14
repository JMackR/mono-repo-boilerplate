import { isEmpty } from "lodash"
import { useValidated, WithValidatorsProps } from "../../validators"
import { TextEntryRef } from ".."
import React, { forwardRef, useEffect, useState } from "react"
import { Input } from "./input"
import { InputProps } from "./input.props"

export const ValidatedInput = forwardRef<TextEntryRef, InputProps & WithValidatorsProps>((props, ref) => {
  const {
    validators,
    error: defaultError,
    textChangeHandler,
    validateOnChange,
    text: defaultValue,
    validatedOnChangeAction,
  } = props
  const [value, setValue] = useState<string | undefined>()

  useEffect(() => setValue(defaultValue), [defaultValue])

  const { error, validate } = useValidated(validators, defaultError)

  const handleValidateOnChange = async (text?: string) => {
    if (validateOnChange) {
      const validationError = await validate(text)
      validatedOnChangeAction && validatedOnChangeAction(validationError)
    }
  }

  const onChange = (text?: string) => {
    handleValidateOnChange(text)
    textChangeHandler && textChangeHandler(text)
    setValue(text)
  }

  const isValidWithValue = () => {
    if (!isEmpty(value)) {
      return true
    }
    return false
  }

  return (
    <Input
      ref={ref}
      {...props}
      text={value}
      error={defaultError || error}
      tintColor={(isValidWithValue() && "brand") || undefined}
      textChangeHandler={onChange}
    />
  )
})
