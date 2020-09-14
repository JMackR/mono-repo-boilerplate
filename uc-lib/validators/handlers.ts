import { useEffect, useState } from "react"
import { Validator } from "./validators"

export interface WithErrorProp {
  error: string | null | undefined
  validate: (text?: string) => Promise<string>
}
export const useValidated = (validators: Validator[], defaultError?: string | undefined | null): WithErrorProp => {
  const [error, setError] = useState<string | undefined | null>()

  useEffect(() => setError(defaultError), [])

  const validate = async (text?: string): Promise<string> => {
    let errorMessage = null
    try {
      for (const index in validators) {
        await validators[index](text)
      }
    } catch (validationError) {
      errorMessage = validationError.message
    }

    // Return the error immeidately so it can bubble up to higher components for field error handling
    setError(errorMessage)
    return errorMessage
  }

  return { error, validate }
}
