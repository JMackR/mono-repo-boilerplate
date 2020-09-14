import _ from 'lodash'
import { userProfileFromUser } from './user-parser'
import { parseVisualTags } from './notification-parsers'
const messagesFromMessagesResponse = messages => {
  return messages.map(m => {
    return {
      id: m.id,
      sender_id: m.sender_id,
      senderId: m.sender_id,
      recipient_id: m.recipient_ids[0],
      recipientId: m.recipient_ids[0],
      send_date: Number(m.send_date).toFixed(0),
      sendDate: Number(m.send_date).toFixed(0),
      text: m.message,
      metadata: messageMetadataConverter(m.metadata),
      metadataType: m.metadata_type
    }
  })
}
const convertSystemMessageActions = action => {
  if (!action) {
    return null
  }
  return {
    actionPath: action.action_path,
    externalURL: action.external_url,
    actionText: action.action_text
  }
}
const systemMessageContextConverter = context => {
  if (!context) {
    return null
  }
  return {
    iconUrl: context.icon_url,
    actions: _.map(context.actions, convertSystemMessageActions),
    titleText: context.title_text,
    bodyText: context.body_text
  }
}
const messageMetadataConverter = metadata => {
  if (!metadata) {
    return null
  }

  return {
    photos: _.map(metadata.photos, _.property('images')),
    messageUrl: metadata.message_url,
    systemMessageContext: systemMessageContextConverter(metadata.system_message_context),
    messageButtonText: metadata.message_button_text,
    messageTitle: metadata.message_title,
    place: parseMeetupPlace(metadata.place)
  }
}

const parseMeetupPlace = place => {
  if (!place) {
    return null
  }
  const copy = _.chain(place)
    .mapKeys((_value, key) => _.camelCase(key + ''))
    .value()
  return {
    ...copy,
    longitude: place.location.lon,
    latitude: place.location.lat
  }
}
const discussionFromResponse = res => {
  const thread = res.data.data.thread

  return {
    id: thread.id,
    seller_id: thread.seller_id,
    buyer_id: thread.buyer_id,
    item_id: thread.item_id,
    date_created: thread.date_created,
    sellerId: thread.seller_id,
    buyerId: thread.buyer_id,
    itemId: thread.item_id,
    dateCreated: thread.date_created,
    readStatus: readStatusResponse(thread.read_status),
    lastPostDate: thread.last_post_date,
    messages: messagesFromMessagesResponse(res.data.data.messages),
    visualTags: parseVisualTags(res.data.data.visual_tags)
  }
}

export const readStatusResponse = res => {
  const readStatusMap = _.chain(res)
    .map(({ last_read_date: lastReadDate }, userId) => {
      return { lastReadDate, userId }
    })
    .value()
  return _.values(readStatusMap)
}
const sellerDiscussionsFromResponse = res => {
  const {
    data: {
      data: { threads, users }
    }
  } = res
  return threads.map(thread => {
    return {
      id: thread.id,
      buyer: userProfileFromUser(users[thread.buyer_id]),
      item_id: thread.item_id,
      last_message_text: thread.last_message_text,
      last_post_date: thread.last_post_date,
      buyerId: thread.buyer_id,
      readStatus: readStatusResponse(thread.read_status),
      itemId: thread.item_id,
      lastMessageText: thread.last_message_text,
      lastPostDate: thread.last_post_date,
      visualTags: parseVisualTags(thread.visual_tags)
    }
  })
}

const parseSellerDiscussionPaginationInfo = (url: string) => {
  if (!url) {
    return undefined
  }
  const indexOfParamsStart = url?.indexOf('?') || -1
  if (indexOfParamsStart < 0) {
    return undefined
  }
  const urlParmas = new URLSearchParams(url.substr(indexOfParamsStart))
  const paginationInfo = {
    before: urlParmas.get('before') || undefined,
    after: urlParmas.get('after') || undefined,
    earliest: urlParmas.get('earliest') || undefined,
    latest: urlParmas.get('latest') || undefined
  }
  return paginationInfo
}

const sellerDiscussionsPagedFromResponse = res => {
  const {
    data: {
      data: { threads, users, next, prev }
    }
  } = res
  return {
    prev: parseSellerDiscussionPaginationInfo(prev),
    next: parseSellerDiscussionPaginationInfo(next),
    discussions: threads.map(thread => {
      return {
        id: thread.id,
        buyer: userProfileFromUser(users[thread.buyer_id]),
        item_id: thread.item_id,
        last_message_text: thread.last_message_text,
        last_post_date: thread.last_post_date,
        buyerId: thread.buyer_id,
        readStatus: readStatusResponse(thread.read_status),
        itemId: thread.item_id,
        lastMessageText: thread.last_message_text,
        lastPostDate: thread.last_post_date,
        visualTags: parseVisualTags(thread.visual_tags)
      }
    })
  }
}

const suggestedMessagesForItemFromResponse = response => {
  if (_.size(response.suggested_messages) > 0) {
    return {
      suggestions: response.suggested_messages.map(message => {
        return {
          id: message.id,
          text: message.text
        }
      })
    }
  } else if (response.thread) {
    return { threadInfo: discussionFromResponse({ data: { data: response } }) }
  } else {
    return {}
  }
}

const discussionNotificationFromResponse = res => {
  return res.data.data.notification_items.map(i => {
    const notification = i.notification

    return {
      id: notification.id,
      discussionId: notification.object_id,
      text: notification.notification_text_v2
    }
  })
}

export {
  discussionFromResponse,
  sellerDiscussionsFromResponse,
  sellerDiscussionsPagedFromResponse,
  discussionNotificationFromResponse,
  suggestedMessagesForItemFromResponse
}
