import { Permission } from "shared-lib/utilities/permission/permission"
import { Exception, translate } from "shared-lib"

interface PermissionLocationKeys {
  title: string
  prompt: string
}

export type PermissionKeyMap = {
  [key in Permission]: PermissionLocationKeys
}

export const PERMISSION_DENIED_KEYS: PermissionKeyMap = {
  [Permission.Camera]: {
    title: "permissions.camera_deny_title",
    prompt: "permissions.camera_deny_prompt",
  },
  [Permission.Storage]: {
    title: "permissions.external_storage_deny_title",
    prompt: "permissions.external_storage_deny_prompt",
  },
  [Permission.PhotoGallery]: {
    title: "permissions.photo_gallery_deny_title",
    prompt: "permissions.photo_gallery_deny_prompt",
  },
  [Permission.LocationMeetup]: {
    title: "permissions.meetup_location_deny_title",
    prompt: "permissions.meetup_location_deny_prompt",
  },
  [Permission.LocationOnboarding]: {
    title: "permissions.post_location_deny_title",
    prompt: "permissions.post_location_deny_prompt",
  },
  [Permission.LocationSearch]: {
    title: "permissions.search_location_deny_title",
    prompt: "permissions.search_location_deny_prompt",
  },
  [Permission.LocationUser]: {
    title: "permissions.user_location_deny_title",
    prompt: "permissions.user_location_deny_prompt",
  },
  [Permission.Notification]: {
    title: "permissions.notification_deny_title",
    prompt: "permissions.notification_deny_prompt",
  },
}

export const PERMISSION_PRIMER_KEYS: PermissionKeyMap = {
  [Permission.Camera]: {
    title: "permissions.camera_title",
    prompt: "permissions.camera_prompt",
  },
  [Permission.Storage]: {
    title: "permissions.external_storage_primer_title",
    prompt: "permissions.external_storage_primer_prompt",
  },
  [Permission.PhotoGallery]: {
    title: "permissions.photo_gallery_title",
    prompt: "permissions.photo_gallery_prompt",
  },
  [Permission.LocationMeetup]: {
    title: "permissions.location_primer_title",
    prompt: "permissions.location_primer_prompt",
  },
  [Permission.LocationOnboarding]: {
    title: "permissions.location_primer_title",
    prompt: "permissions.location_primer_prompt",
  },
  [Permission.LocationSearch]: {
    title: "permissions.location_primer_title",
    prompt: "permissions.location_primer_prompt",
  },
  [Permission.LocationUser]: {
    title: "permissions.location_primer_title",
    prompt: "permissions.location_primer_prompt",
  },
  [Permission.Notification]: {
    title: "permissions.notification_primer_title",
    prompt: "permissions.notification_primer_prompt",
  },
}

export const NEVER_ASK_AGAIN_PROMPT_KEYS: PermissionKeyMap = {
  [Permission.Camera]: {
    title: "permissions.camera_never_ask_again_title",
    prompt: "permissions.camera_never_ask_again_message",
  },
  [Permission.Storage]: {
    title: "permissions.external_storage_never_ask_again_title",
    prompt: "permissions.external_storage_never_ask_again_prompt",
  },
  [Permission.PhotoGallery]: {
    title: "permissions.photo_gallery_never_ask_again_title",
    prompt: "permissions.photo_gallery_never_ask_again_prompt",
  },
  [Permission.LocationMeetup]: {
    title: "permissions.meetup_location_never_ask_again_title",
    prompt: "permissions.meetup_location_never_ask_again_prompt",
  },
  [Permission.LocationOnboarding]: {
    title: "permissions.post_location_never_ask_again_title",
    prompt: "permissions.post_location_never_ask_again_prompt",
  },
  [Permission.LocationSearch]: {
    title: "permissions.search_location_never_ask_again_title",
    prompt: "permissions.search_location_never_ask_again_prompt",
  },
  [Permission.LocationUser]: {
    title: "permissions.user_location_never_ask_again_title",
    prompt: "permissions.user_location_never_ask_again_prompt",
  },
  [Permission.Notification]: {
    title: "permissions.notification_never_ask_again_title",
    prompt: "permissions.notification_never_ask_again_prompt",
  },
}

export const getUnavailableFeatureError = (): Exception => {
  return {
    title: translate("common-errors.server-error.title"),
    message: translate("permissions.feature_unavailable_prompt"),
  }
}
