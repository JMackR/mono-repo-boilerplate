import { check, Permission, request } from "react-native-permissions"
import { Alert, Linking } from "react-native"
import { i18n } from "../i18n"

export interface PermissionAuthOptions {
  /** The required permission */
  permission: Permission
  /** A callback to invoke if the permission has been granted */
  onGranted: () => void
  /** An optional callback to invoke if the permission hasn't been granted */
  onFailure?: () => void
  /**
   * The title of the Open Settings alert; description must also be defined if this is defined
   * If both are defined, the Open Settings alert will be shown on permission failure
   */
  title?: string
  /**
   * The description of the Open Settings alert; title must also be defined if this is defined
   * If both are defined, the Open Settings alert will be shown on permission failure
   */
  description?: string
}

export interface SettingsPromptOptions {
  /** The title to show in the alert */
  title: string
  /** The description to show in the alert */
  description: string
  /** An optional callback to invoke if the user chooses to open the app settings */
  onOpen?: () => void
  /** An optional callback to invoke if the user chooses not to open the app settings */
  onCancel?: () => void
}

export const Permissions = {
  /**
   * Shows an alert prompting the user to open their settings to grant a particular permission
   * @param title
   * @param description
   * @param onOpen
   * @param onCancel
   */
  showSettingsPrompt: ({ title, description, onOpen, onCancel }: SettingsPromptOptions) => {
    Alert.alert(
      title,
      description,
      [
        {
          text: i18n("alert/permissions/cancel"),
          onPress: () => onCancel && onCancel(),
        },
        {
          text: i18n("alert/permissions/open"),
          onPress: () => Linking.openSettings().then(() => onOpen && onOpen()),
        },
      ],
      { cancelable: false },
    )
  },
  /**
   * Checks for a permission and optionally shows an alert prompting the user to grant the permission
   * @param permission
   * @param title
   * @param description
   * @param onGranted
   * @param onFailure
   */
  authorize: ({
    permission,
    title,
    description,
    onGranted,
    onFailure,
  }: PermissionAuthOptions): Promise<void> => {
    return check(permission)
      .then(status => {
        if (status === "granted") onGranted()
        else if (status === "denied") {
          request(permission).then(status => {
            if (status === "granted") onGranted()
            else if (onFailure) onFailure()
          })
        } else if (status === "blocked" && title && description) {
          Permissions.showSettingsPrompt({
            title,
            description,
            onCancel: onFailure,
          })
        } else if (onFailure) onFailure()
      })
      .catch(() => onFailure && onFailure())
  },
}
