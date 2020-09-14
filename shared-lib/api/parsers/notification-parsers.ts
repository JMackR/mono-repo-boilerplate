import { userFromLegacyUser } from './user-parser'
import { BING_TILE_AD_KEY, parseBingAdFromBingAdResponse } from './ads-parsers'

export const ENABLED = 'ENABLED'
export const DISABLED = 'DISABLED'

const parseAlert = alert => {
  return {
    actionPath: alert.action_path,
    archived: alert.archived ? alert.archived : 0,
    contentThumbnails: alert.content_thumbnails ? alert.content_thumbnails : [],
    dateAdded: alert.added,
    eventMetadata: alert.event_meta_data,
    id: `${alert.id}`,
    notificationText: alert.notification_text_v2,
    title: alert.notification_title,
    objectId: `${alert.object_id}`,
    read: alert.read,
    seen: alert.seen,
    sender: userFromLegacyUser(alert.sender),
    displayAvatar: alert?.sender?.get_profile?.avatar_square,
    type: alert.type,
    visualTags: parseVisualTags(alert.visual_tags)
  }
}

export const parseVisualTags = visualTags => {
  if (visualTags) {
    return visualTags.map(visualTag => {
      return {
        displayText: visualTag.display_text,
        tag: visualTag.tag,
        type: visualTag.type
      }
    })
  } else {
    return []
  }
}

const parseAlertsResponseWithAds = alertsResponse => {
  const alerts = []
  const alertsWithAds = []
  alertsResponse.notification_items.forEach(row => {
    if (row.type === 'notification') {
      const alert = parseAlert(row.notification)
      alerts.push(alerts)
      alertsWithAds.push(alert)
    } else if (row.type === 'ad' && row.ad.type === BING_TILE_AD_KEY) {
      alertsWithAds.push(parseBingAdFromBingAdResponse(row.ad.bing_tile_ad))
    }
  })
  return {
    archivedAlertCount: alertsResponse.totalArchived,
    alerts,
    alertsWithAds
  }
}

const parseAlertsResponse = alertsResponse => {
  const alerts = alertsResponse.notification_items
    .filter(alertRow => {
      return alertRow.type === 'notification'
    })
    .map(alertRow => {
      return parseAlert(alertRow.notification)
    })
  return {
    archivedAlertCount: alertsResponse.totalArchived,
    alerts
  }
}

const parseUnseenAlertsResponse = unseenAlertsResponse => {
  return {
    total: unseenAlertsResponse.total,
    inbox: unseenAlertsResponse.count_by_filter.inbox,
    notifications: unseenAlertsResponse.count_by_filter.notifications
  }
}

const parseNotificationPreferencesSummary = notificationPreferencesResponseData => {
  return {
    version: notificationPreferencesResponseData.version,
    preferences: parseNotificationPreferences(notificationPreferencesResponseData.preferences)
  }
}

const parseNotificationPreferences = notificationPreferences => {
  return notificationPreferences.map(preference => {
    return {
      type: preference.type,
      enabled: preference.state && preference.state.toUpperCase() === ENABLED,
      displayString: preference.display_string
    }
  })
}

const constructNotificationPreferencesSummaryPostBody = notificationPreferencesSummary => {
  return {
    version: notificationPreferencesSummary.version,
    preferences: constructNotificationPreferencesPostBody(notificationPreferencesSummary.preferences)
  }
}

const constructNotificationPreferencesPostBody = notificationPreferences => {
  return notificationPreferences.map(preference => {
    return {
      type: preference.type,
      state: preference.enabled ? ENABLED : DISABLED,
      display_string: preference.displayString
    }
  })
}

export {
  parseAlertsResponse,
  parseAlertsResponseWithAds,
  parseUnseenAlertsResponse,
  parseNotificationPreferencesSummary,
  constructNotificationPreferencesSummaryPostBody
}
