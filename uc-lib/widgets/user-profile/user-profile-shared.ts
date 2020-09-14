import moment from "moment"
export const memberSince = (joinDate: string) => {
  const joined = moment(joinDate, "YYYYMMDDmm").format("MMM YYYY")
  return `Member since ${joined}`
}
