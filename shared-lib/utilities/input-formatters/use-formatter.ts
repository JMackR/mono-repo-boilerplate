import { useState, useEffect } from "react"
import { formatMileageWithRaw, formatMoneyWithRaw, MoneyTrimType } from "uc-lib/formatters/number-formatters"

export const useMileageInputFormatter = (initialMileage?: string | number) => {
  const [mileageText, setMileageText] = useState<string>("")
  const [rawMileage, setRawMileage] = useState<number>()

  const onMileageChange = (text?: string) => {
    const formattedMileage = formatMileageWithRaw(text)
    if (formattedMileage) {
      if (formattedMileage.mileageText.length < 10) {
        setRawMileage(formattedMileage.mileage)
        setMileageText(formattedMileage.mileageText)
      }
    } else {
      setRawMileage(0)
      setMileageText("")
    }
  }

  useEffect(() => {
    if (initialMileage) {
      if (typeof initialMileage === "number") {
        onMileageChange(initialMileage.toString())
      } else {
        onMileageChange(initialMileage)
      }
    }
  }, [])

  return { mileageText, rawMileage, onMileageChange }
}

export const useMoneyInputFormatter = (initialMoney?: string | number, trimType = MoneyTrimType.NoTrim) => {
  const [moneyText, setMoneyText] = useState("")
  const [rawMoney, setRawMoney] = useState<number>()

  const onMoneyChange = (text?: string) => {
    const formatted = formatMoneyWithRaw(text, trimType)
    if (formatted) {
      setRawMoney(formatted.rawMoney)
      setMoneyText(formatted.moneyText)
    }
  }

  useEffect(() => {
    if (initialMoney) {
      if (typeof initialMoney === "number") {
        onMoneyChange(initialMoney.toString())
      } else {
        onMoneyChange(initialMoney)
      }
    }
  }, [])
  return { moneyText, rawMoney, onMoneyChange }
}

const VIN_LENGTH = 17
const CHECK_VALUE_INDEX = 8
const YEAR_VALUE_INDEX = 9
const VALIDATION_MOD_VALUE = 11
const CHECK_VALUE_X_TO_TEN = 10
// tslint:disable-next-line: no-magic-numbers
const WEIGHT_ARRAY = [8, 7, 6, 5, 4, 3, 2, 10, 0, 9, 8, 7, 6, 5, 4, 3, 2]
const TRANSLITERATION_MAP = {
  A: 1,
  J: 1,
  B: 2,
  K: 2,
  S: 2,
  C: 3,
  L: 3,
  T: 3,
  D: 4,
  M: 4,
  U: 4,
  E: 5,
  N: 5,
  V: 5,
  F: 6,
  W: 6,
  G: 7,
  P: 7,
  X: 7,
  H: 8,
  Y: 8,
  R: 9,
  Z: 9,
  "1": 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  "0": 0,
}
const isVINValid = (vin?: string) => {
  if (vin === undefined) {
    return false
  }

  if (vin.length !== VIN_LENGTH) {
    return false
  }

  const upperVIN = vin.toUpperCase()
  let checkNum = 0
  const checkValue = upperVIN[CHECK_VALUE_INDEX]
  const year = upperVIN[YEAR_VALUE_INDEX]
  if (checkValue !== "X" && checkValue.match(/[0-9]/) === null) {
    return false
  }
  checkNum = checkValue === "X" ? CHECK_VALUE_X_TO_TEN : Number(checkValue)

  if (TRANSLITERATION_MAP[year as keyof typeof TRANSLITERATION_MAP] === undefined && year !== "0") {
    return false
  }

  let calculatedCheckDigit = 0
  for (let i = 0; i < upperVIN.length; i++) {
    const vinPart = upperVIN[i]
    if (TRANSLITERATION_MAP[vinPart as keyof typeof TRANSLITERATION_MAP] === undefined) {
      return false
    }

    const left = WEIGHT_ARRAY[i]
    const right = TRANSLITERATION_MAP[vinPart as keyof typeof TRANSLITERATION_MAP]
    calculatedCheckDigit = calculatedCheckDigit + left * right
  }

  return calculatedCheckDigit % VALIDATION_MOD_VALUE === checkNum
}

export const useVINInputFormatter = (initialVIN?: string) => {
  const [vinText, setVINText] = useState<string>(initialVIN || "")
  const [isValidVIN, setIsValidVIN] = useState(isVINValid(initialVIN))

  const onVINChange = (text?: string) => {
    if (text === undefined || text === "") {
      setVINText("")
      setIsValidVIN(false)
      return
    }

    if (text.match(/^[0-9a-zA-Z]*$/) === null || text.length > VIN_LENGTH) {
      return
    }

    setVINText(text.toUpperCase())
    setIsValidVIN(isVINValid(text))
  }

  return { vinText, isValidVIN, onVINChange }
}
