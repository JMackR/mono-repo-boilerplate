import _, { omit, setWith } from "lodash"
import React, { createContext, FC, useState, useLayoutEffect } from "react"
import { Validator } from "uc-lib/validators"

export const ValidatedFormContext = createContext<{
  onSubmit: () => Promise<{ [key: string]: string }>
  error: { [role: string]: string }
  hasErrors: boolean
  value: { [role: string]: string }
  validators: { [role: string]: Validator[] }
  onChangeValue: (role: string, value?: string | undefined) => void
}>({
  onSubmit: async () => ({}),
  error: {},
  value: {},
  hasErrors: false,
  validators: {},
  onChangeValue: (_role: string, _value?: string | undefined) => {},
})

export const ValidatedForm: FC<{
  validators: { [role: string]: Validator[] }
}> = props => {
  const { children, validators } = props
  const [hasErrors, setHasErrors] = useState(false)
  const [error, setError] = useState<{ [key: string]: string }>({})
  const [value, setValue] = useState<{ [key: string]: string }>({})
  const onChangeValue = (role: string, next: any) => {
    setError(omit(error, [role]))
    setValue(value => {
      return setWith({ ...value }, `${role}`, next)
    })
  }

  /**
   * Listen for errors after the input field has had a chance to react to the input
   */
  useLayoutEffect(() => {
    getErrors().then(errs => {
      setHasErrors(!_.isEmpty(errs))
    })
  }, [value])

  const onSubmit = async () => {
    const errors = await getErrors()
    setError(errors)
    return errors
  }

  const getErrors = async () => {
    const error: { [key: string]: string } = {}
    // tslint:disable-next-line: forin
    for (const role in validators) {
      try {
        for (const validator of validators[role]) {
          await validator(value[role])
        }
      } catch (validationError) {
        error[role] = validationError.message
      }
    }
    return error
  }

  return (
    <ValidatedFormContext.Provider value={{ hasErrors, onSubmit, value, error, validators, onChangeValue }}>
      {children}
    </ValidatedFormContext.Provider>
  )
}
