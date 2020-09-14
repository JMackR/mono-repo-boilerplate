import { Alert } from "react-native"
import { User } from "../models/user"
import { ResultObservable } from "../services/api/observables"
import { Crew } from "../models/crew"
import { ConfirmationPopupOption } from "./confirmation-popup/confirmation-popup.types"
import { i18n } from "../i18n"

/**
 * Shows an alert to warn the user that they'll be leaving their existing crew
 * @param localUser
 * @param crewId
 * @param setMembershipChange
 */
export const showTransferAlert = (
  localUser: User,
  crewId: string,
  setMembershipChange: (value: React.SetStateAction<ResultObservable>) => void,
) =>
  Alert.alert(i18n("alert/crew/join/title"), i18n("alert/crew/join/description"), [
    { text: "No", style: "cancel" },
    { text: "Yes", onPress: () => setMembershipChange(localUser.transferToCrew(crewId)) },
  ])

/**
 * Returns the default ConfirmationPopupOptions for a CrewConfirmationPopup
 * @param localUser
 * @param crew
 * @param setMembershipChange
 */
export const defaultOptions = (
  localUser: User,
  crew: Crew,
  setMembershipChange: (value: React.SetStateAction<ResultObservable>) => void,
): ConfirmationPopupOption[] => {
  const isCrewMember = localUser.crewMembership?.crew?.id === crew.id
  return [
    {
      text: i18n(isCrewMember ? "crews/leave" : "crews/join/long"),
      isDestructive: isCrewMember,
      callback: () => {
        if (isCrewMember) {
          setMembershipChange(localUser.crewMembership!.leave())
        } else if (localUser.crewMembership?.crew) {
          showTransferAlert(localUser, crew.id, setMembershipChange)
        } else {
          setMembershipChange(localUser.joinCrew(crew.id))
        }
      },
    },
    { text: i18n("cancel"), isCancel: true },
  ]
}

/**
 * The information used to show a crew confirmation popup
 */
export interface CrewConfirmationPopupInfo {
  /** The Crew that's being viewed */
  crew: Crew
  /** A setter used to track the state of leaving or joining a crew */
  setMembershipChange: (value: React.SetStateAction<ResultObservable>) => void
  /** The Artist that's being viewed */
  artist?: User
}
