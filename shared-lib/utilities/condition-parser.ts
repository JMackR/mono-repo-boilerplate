import { translate } from "./i18n"

const DIVIDE_CONDITION_BY = 20

enum Conditions {
  OTHER = 0,
  FOR_PARTS = 1,
  USED = 2,
  OPEN_BOX = 3,
  REFURBISHED = 4,
  NEW = 5,
}

const conditionEnumToString = (condition: Conditions, isCarsAndTrucks: boolean): string => {
  let translatePath = "search-stack.conditions"
  if (isCarsAndTrucks) {
    translatePath += ".cars-and-trucks"
  }
  let translateKey
  switch (condition) {
    case Conditions.FOR_PARTS:
      translateKey = "for_parts"
      break

    case Conditions.USED:
      translateKey = "used"
      break

    case Conditions.OPEN_BOX:
      translateKey = "open_box"
      break

    case Conditions.REFURBISHED:
      translateKey = "refurbished"
      break

    case Conditions.NEW:
      translateKey = "new"
      break

    case Conditions.OTHER:
    default:
      translateKey = "other"
  }

  return translate(translatePath + "." + translateKey)
}

export const ConditionParser = {
  conditionEnumToString,
  conditionNumberToString(condition: number, isCarsAndTrucks: boolean): string {
    const enumValue = condition / DIVIDE_CONDITION_BY
    if (enumValue % 1 === 0) {
      // It's a whole number
      return conditionEnumToString(enumValue, isCarsAndTrucks)
    } else {
      return conditionEnumToString(Conditions.OTHER, isCarsAndTrucks)
    }
  },
}
