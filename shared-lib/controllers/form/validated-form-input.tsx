import { InputProps, WithValidatorsProps } from "uc-lib"
import { ValidatedInput } from "uc-lib/controls/input"
import React, { useContext, useEffect, forwardRef } from "react"
import { ValidatedFormContext } from "./validated-form"
import { TextEntryRef } from "uc-lib/controls"
import _ from "lodash"

export interface ValidatedFormInputProps
  extends InputProps,
    Pick<WithValidatorsProps, "validateOnChange" | "validatedOnChangeAction"> {
  role: string
}

export const ValidatedFormInput = forwardRef<TextEntryRef, ValidatedFormInputProps>((props, ref) => {
  const { returnKeyType, role, onSubmitEditing, textChangeHandler, text, error: defaultError } = props
  const { onSubmit, error, validators, onChangeValue, value } = useContext(ValidatedFormContext)

  useEffect(() => onChangeValue(role, text), [text])

  const onChange = (newValue?: string) => {
    textChangeHandler && textChangeHandler(newValue)
    onChangeValue(role, newValue)
  }

  /**
   * with 'done' returnKeyType, do error validation checking when user hits done on keyboard,
   * then proceed to do the actual action
   */
  const onSubmitEditingWithValidation = (finalValue?: string) => {
    if (returnKeyType === "done" && finalValue) {
      onSubmit().then((errors) => {
        if (_.isEmpty(errors)) {
          // no errors
          onSubmitEditing && onSubmitEditing(finalValue)
        }
      })
    }
  }

  return (
    <ValidatedInput
      ref={ref}
      {...props}
      text={value[role]}
      textChangeHandler={onChange}
      onSubmitEditing={returnKeyType === "done" ? onSubmitEditingWithValidation : onSubmitEditing}
      validators={validators[role]}
      error={error[role] || defaultError}
    />
  )
})
