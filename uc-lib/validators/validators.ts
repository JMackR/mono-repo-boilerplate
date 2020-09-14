import _ from "lodash"
import zxcvbn from "zxcvbn"
import { translate } from "shared-lib/utilities"

export type Validator = (value?: string) => Promise<void>

export interface WithValidatorsProps {
  /**
   * List of validators for the component.
   */
  validators: Validator[]
  validateOnChange?: boolean
  validatedOnChangeAction?: (value?: string) => void
}

export const RegexValidator = (regex: RegExp, message: string, allowEmpty: boolean = true): Validator => {
  return async (value?: string) => {
    if (allowEmpty && _.isEmpty(value)) {
      return
    }
    if (!regex.test(value || "")) {
      throw new Error(translate(message))
    }
  }
}

export const RegexValidatorWithValue = (
  regex: RegExp,
  prefix: string,
  maxLength: string,
  suffix: string,
  allowEmpty: boolean = true,
): Validator => {
  return async (value?: string) => {
    if (allowEmpty && _.isEmpty(value)) {
      return
    }
    if (!regex.test(value || "")) {
      throw new Error(translate(prefix) + maxLength + translate(suffix))
    }
  }
}

export const RequiredValidator: Validator = async (value?: string) => {
  if (!value) {
    throw new Error(translate("common-errors.validation.required"))
  }
}

export const EmailValidator = async (value?: string) => {
  const MAX_PREFIX_LENGTH = 64
  const MAX_SUFFIX_LENGTH = 253

  if (_.isEmpty(value)) {
    return
  }

  let regex: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!regex.test(value!)) {
    throw new Error(translate("common-errors.validation.invalid-email"))
  }

  // Cannot start with a special character
  regex = /^[^a-zA-Z0-9]/
  if (regex.test(value!)) {
    throw new Error(translate("common-errors.validation.invalid-email"))
  }

  const parts = value!.split("@")
  if (parts[0].length > MAX_PREFIX_LENGTH || parts[1].length > MAX_SUFFIX_LENGTH) {
    throw new Error(translate("common-errors.validation.invalid-email"))
  }
}

export const ZipCodeValidator = RegexValidator(/^\d{5}$|^\d{5}-\d{4}$/, "common-errors.validation.invalid-zip-code")

export const PhoneValidator = RegexValidator(
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
  "common-errors.validation.invalid-phonenumber",
)
export const SocialSecurityValidator = RegexValidator(/^\d{3}-\d{2}-\d{4}$/, "common-errors.validation.invalid-ssn")

export const MinLengthValidator = (length: number) => {
  const regex = RegExp(`^.{${length},}$`)
  const allowEmpty = length === 0
  return RegexValidatorWithValue(
    regex,
    "common-errors.validation.length-prefix",
    ` ${length} `,
    "common-errors.validation.length-more",
    allowEmpty,
  )
}
export const MaxLengthValidator = (length: number) => {
  const regex = new RegExp(`^.{0,${length}}$`)
  return RegexValidatorWithValue(
    regex,
    "common-errors.validation.length-prefix",
    ` ${length} `,
    "common-errors.validation.length-fewer",
  )
}

export const VanityUrlValidator = RegexValidator(/^([a-zA-Z0-9])\w+$/, "common-errors.validation.invalid-vanity-url", false)

export const OnlyNumbersValidator = RegexValidator(/^[0-9]+$/, "common-errors.validation.numbers-only", true)

const SAFE_PASSWORD_SCORE = 3
export const PasswordComplexityValidator: Validator = async (password?: string) => {
  if (!password) {
    return
  }

  const { score } = password ? zxcvbn(password) : { score: 0 }
  if (score < SAFE_PASSWORD_SCORE) {
    throw new Error(translate("common-errors.validation.insecure-password"))
  }
}

export const isValidUserId = (userId?: string | number | null) => {
  return _.toNumber(userId) > 0
}
