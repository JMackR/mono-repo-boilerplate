/**
 *
 * Date input formatting
 *
 */

// tslint:disable: no-magic-numbers
export const formatDate = (oldValue: string, newValue: string, maxLength: number) => {
  const EXPIRATION_REGEX = /^[0-9]+$|^$|^[0-9]+\/+[0-9]+$|^[0-9]+\/$|^[0-9]+\/+[0-9]+\/+[0-9]+$|^[0-9]+\/+[0-9]+\/$/
  if (!EXPIRATION_REGEX.test(newValue) || newValue.length > maxLength) {
    newValue = oldValue
  }

  if (
    (oldValue.length === 1 && newValue.length === 2) ||
    (oldValue.length !== maxLength - 1 && oldValue.length === 4 && newValue.length === 5)
  ) {
    newValue += "/"
  }

  if ((oldValue.length === 2 && newValue.length === 3) || (oldValue.length === 5 && newValue.length === 6)) {
    newValue = oldValue + "/" + newValue.substring(newValue.length - 1)
  }

  if ((oldValue.length === 4 && newValue.length === 3) || (oldValue.length === 7 && newValue.length === 6)) {
    newValue = newValue.substring(0, newValue.length - 1)
  }

  if (oldValue.length === maxLength && newValue.length > maxLength) {
    newValue = oldValue
  }

  return newValue
}

const SHORT_DATE_LENGTH = 4
const FULL_DATE_LENGTH = 8
const DATE_SEPARATOR = "/"
const SHORT_DATE_REGEX: RegExp = /^(\d{0,2})(\d{0,2})$/g
const FULL_DATE_REGEX: RegExp = /^(\d{0,2})(\d{0,2})(\d{0,4})$/g

export const validateDateInputLength = (length: "short" | "full", date: string) => {
  date = removeNonDigits(date)
  const maxLength: number = length === "short" ? SHORT_DATE_LENGTH : FULL_DATE_LENGTH
  return validateFormattedInputLength(date, maxLength)
}

export const formatDateInput = (length: "short" | "full", input?: string) => {
  if (!input) {
    return ""
  }
  const regex: RegExp = length === "short" ? SHORT_DATE_REGEX : FULL_DATE_REGEX
  return formatDateReg(input, regex)
}

const formatDateReg = (input: string, regex: RegExp) => {
  let onlyNumbers = removeNonDigits(input)
  if (onlyNumbers.substring(0, 1) !== "0" && onlyNumbers.substring(0, 1) !== "1") {
    onlyNumbers = "0" + onlyNumbers
  }
  return onlyNumbers.replace(regex, (_regex: string, $1: string, $2: string, $3: string) =>
    [$1, $2, $3].filter(group => !!group).join(DATE_SEPARATOR),
  )
}

/**
 *
 * Credit card number formatting
 *
 */

const CARDNUMBER_CHARACTER_LENGTH = 16
const AMEX_CHARACTER_LENGTH = 15
const CARD_SEPARATOR = " "
const CARD_REGEX: RegExp = /^(\d{0,4})(\d{0,4})(\d{0,4})(\d{0,4})$/g
const AMEX_REGEX: RegExp = /^(\d{0,4})(\d{0,6})(\d{0,5})$/g

export const validateFormattedInputLength = (input: string, maxLength: number) => {
  input = removeNonDigits(input)
  if (input && input.length > maxLength) {
    input = input.substring(0, maxLength)
  }
  return input
}

export const validateCardInputLength = (cardInput: string) => {
  cardInput = removeNonDigits(cardInput)
  const maxLength: number = isAMEXCard(cardInput) ? AMEX_CHARACTER_LENGTH : CARDNUMBER_CHARACTER_LENGTH
  return validateFormattedInputLength(cardInput, maxLength)
}

export const isAMEXCard = (cardNumber: string) => {
  return cardNumber.substring(0, 2) === "34" || cardNumber.substring(0, 2) === "37"
}

export const formatCreditCardNumber = (cardNumber: string) => {
  const regex: RegExp = isAMEXCard(cardNumber) ? AMEX_REGEX : CARD_REGEX
  return formatCardNumber(cardNumber, regex)
}

const formatCardNumber = (value: string, regex: RegExp) => {
  const onlyNumbers = removeNonDigits(value)

  return onlyNumbers.replace(regex, (_regex: string, $1: string, $2: string, $3: string, $4: string) =>
    [$1, $2, $3, $4].filter(group => !!group).join(CARD_SEPARATOR),
  )
}

const removeNonDigits = (cardNumber: string) => {
  return cardNumber.replace(/[^\d]/g, "")
}

/**
 *
 * SSN formatting
 *
 */

export const formatSSN = (oldValue: string, newValue: string) => {
  const EXPIRATION_REGEX = /^[0-9]+$|^$|^[0-9]+\-+[0-9]+$|^[0-9]+\-$|^[0-9]+\-+[0-9]+\-+[0-9]+$|^[0-9]+\-+[0-9]+\-$/
  if (!EXPIRATION_REGEX.test(newValue) || newValue.length > 11) {
    newValue = oldValue
  }

  if (
    (oldValue.length === 2 && newValue.length === 3) ||
    (oldValue.length !== 10 && oldValue.length === 5 && newValue.length === 6)
  ) {
    newValue += "-"
  }

  if ((oldValue.length === 3 && newValue.length === 4) || (oldValue.length === 6 && newValue.length === 7)) {
    newValue = oldValue + "-" + newValue.substring(newValue.length - 1)
  }

  if ((oldValue.length === 5 && newValue.length === 4) || (oldValue.length === 8 && newValue.length === 7)) {
    newValue = newValue.substring(0, newValue.length - 1)
  }

  if (oldValue.length === 11 && newValue.length > 11) {
    newValue = oldValue
  }

  return newValue
}
