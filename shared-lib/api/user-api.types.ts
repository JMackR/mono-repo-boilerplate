import { Moji } from "../../models/moji"
import { CrewApiData, CrewMemberApiData } from "./crew-api.types"
import { ScheduledPartyApiData } from "./schedule-api.types"

export type UserField = "defaults" | "profile" | "crewMembership" | "schedule" | "canMessage"
// | "parties" TODO Not yet supported

export interface UserPersonalInfoApiData {
  country?: string
  age?: number
  biography?: string
}

export interface UserProfileApiData {
  personalInfo?: UserPersonalInfoApiData
  image?: string
  socialMedia?: Record<string, string | null>
  moji?: Moji
}

export interface UserApiData {
  id: string
  name: string
  type?: string
  fullName?: string
  profile?: UserProfileApiData
  crew?: CrewApiData
  crewMembership?: CrewMemberApiData
  schedule?: ScheduledPartyApiData[]
}
