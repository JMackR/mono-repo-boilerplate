import { listingFromItem } from './listing-parsers'
import { SELLER_TILE_AD_KEY, BING_TILE_AD_KEY, parseBingAdFromBingAdResponse, sellerAdFromResponse } from './ads-parsers'
import _ from 'lodash'

enum FeedItemType {
  Item = 'item',
  Ad = 'ad',
  Banner = 'banner',
  ActionBanner = 'action_banner',
  SellerAd = 'seller_ad'
}
enum FeedBannerType {
  Fanout = 'fanout'
}
enum FeedBannerLabel {
  Fanout = 'Get it shipped to you'
}
enum FeedActionBannerType {
  searchAlert = 'search_alert'
}

export enum DeliveryParamType {
  Pickup = 'p',
  Shipping = 's',
  Any = 'p_s'
}

export const PARAMS_MAP = Object.freeze({
  limit: 'limit',
  query: 'q',
  cid: 'v2_category_id',
  pageCursor: 'page_cursor',
  priceMin: 'price_min',
  priceMax: 'price_max',
  deliveryParam: 'delivery_param',
  vehicleMake: 'veh_make',
  vehicleYearMin: 'veh_year_min',
  vehicleYearMax: 'veh_year_max',
  vehicleMPGMin: 'veh_mpg_min',
  vehicleMPGMax: 'veh_mpg_max',
  vehicleMileMax: 'veh_mile_max',
  vehicleTransmission: 'veh_transmission',
  vehicleDrivetrain: 'veh_drivetrain',
  enabledFeatures: 'enabled_features'
})

// TODO, need to update search typedef inputs to allow taking arrays instead of strings
const PARAMS_TO_TREAT_AS_ARRAYS = ['condition', 'veh_type']

const DEFAULT_LIMIT = '50'
const ENABLED_FEATURES = 'search_alerts_v3,shipping'
export const DEFAULT_SEARCH_ADS_MODEL = 'experimentmodel82'
const DEFAULT_VEHICLE_EXPERIMENT_ID = 'ACFC:2,ACFK:fkc,ADR:80'
const DEFAULT_SEARCH_PARAMS = Object.freeze({
  limit: DEFAULT_LIMIT,
  delivery_param: DeliveryParamType.Any,
  enabled_features: ENABLED_FEATURES,
  experiment_id: DEFAULT_SEARCH_ADS_MODEL,
  vehicle_experiment_id: DEFAULT_VEHICLE_EXPERIMENT_ID
})

interface SearchRequestParams {
  [key: string]: string | string[]
}

interface SearchParam {
  key: string
  value?: string
}

const searchRequestParamsFromRequestData = params => {
  const reqParamsFromClient: SearchRequestParams = (params || []).reduce((accumulator: SearchRequestParams, param: SearchParam) => {
    if (!param.value) {
      return accumulator
    }

    let updatedParamKey = param.key
    if (Object.keys(PARAMS_MAP).includes(param.key)) {
      updatedParamKey = PARAMS_MAP[param.key]
    }

    if (PARAMS_TO_TREAT_AS_ARRAYS.includes(updatedParamKey)) {
      accumulator[updatedParamKey] = param.value.split(',')
    } else {
      accumulator[updatedParamKey] = param.value
    }

    return accumulator
  }, {})

  const finalRequestParams: SearchRequestParams = {
    ...DEFAULT_SEARCH_PARAMS,
    ...reqParamsFromClient
  }

  return finalRequestParams
}

export const NUMERIC_RANGE_FEED_OPTION_TYPE = 'numeric_range'
export const LIST_SELECTION_FEED_OPTION_TYPES = ['single_select', 'multi_select', 'slider']
const VEHICLE_YEAR_LOWER_BOUND = 1960

const parseFeedOptions = (feedOptionsJson: any) => {
  if (!feedOptionsJson) {
    return []
  }

  // We have filed a ticket against discovery to send us the properly formatted filter data,
  // but they do not have the bandwidth to get it done within our timeline.
  // We are modifify what they send to meet our requirements.
  // JIRA: https://offerup.atlassian.net/browse/DISC-631
  feedOptionsJson = preProcessFeedOptionsToCorrectData(feedOptionsJson)

  const formattedFeedOptions = feedOptionsJson.reduce((accumulator: any[], feedOptionJson: any) => {
    if (!feedOptionJson || !feedOptionJson.type) {
      return accumulator
    }

    if (feedOptionJson.type === NUMERIC_RANGE_FEED_OPTION_TYPE) {
      accumulator.push(parseNumericRangeFilter(feedOptionJson))
    } else if (LIST_SELECTION_FEED_OPTION_TYPES.includes(feedOptionJson.type)) {
      accumulator.push(parseListFilter(feedOptionJson))
    }
    return accumulator
  }, [])

  return formattedFeedOptions
}

const preProcessFeedOptionsToCorrectData = (feedOptionsJson: any[]) => {
  feedOptionsJson.forEach(feedOption => {
    switch (feedOption.name) {
      case 'delivery_param':
        feedOption.label = 'Delivery method'
        feedOption.type = 'single_select'
        feedOption.options = preprocessDeliveryParamOptions(feedOption.options)
        break
      case 'radius':
        feedOption.label = 'Distance'
        break
      case 'price':
        feedOption.label = 'Price range'
        feedOption.label_short = ''
        break
      case 'vehicle_name':
      case 'vehicle_miles':
      case 'vehicle_transmission':
      case 'vehicle_drivetrain':
        feedOption.type = 'single_select'
        break
      case 'vehicle_year': {
        if (feedOption.type === 'numeric_range') {
          break
        }
        feedOption.type = 'numeric_range'
        feedOption.units = 'years'
        feedOption.lower_bound = VEHICLE_YEAR_LOWER_BOUND
        feedOption.upper_bound = feedOption.options[feedOption.options.length - 1].label
        const selectedOptions = feedOption.options.filter((option: any) => option.selected && !option.default)
        feedOption.options = [
          {
            label: 'Min year',
            text_hint: 'Min',
            value: _.propertyOf(selectedOptions)('0.label')
          },
          {
            label: 'Max year',
            text_hint: 'Max',
            value: _.propertyOf(selectedOptions)('1.label')
          }
        ]
        break
      }
      case 'vehicle_mpg': {
        if (feedOption.type === 'numeric_range') {
          break
        }
        feedOption.type = 'numeric_range'
        feedOption.units = 'mpg'
        feedOption.lower_bound = 0
        feedOption.upper_bound = undefined // Intentional, there is no upper limit on mpg
        const selectedOptions = feedOption.options.filter((option: any) => option.selected)
        feedOption.options = [
          {
            label: 'Minimum MPG',
            text_hint: 'Min',
            value: _.propertyOf(selectedOptions)('0.label')
          },
          {
            label: 'Maximum MPG',
            text_hint: 'Max',
            value: _.propertyOf(selectedOptions)('1.label')
          }
        ]
        break
      }
      default:
        break
    }
  })
  return feedOptionsJson
}

const preprocessDeliveryParamOptions = (options: any[] = []): any[] => {
  const pickUpOption = options.find(option => option.value === DeliveryParamType.Pickup)
  const shippingOption = options.find(option => option.value === DeliveryParamType.Shipping)
  if (!pickUpOption || !shippingOption) {
    return options
  }

  const formattedPickUpAndShippingOption = {
    label: 'Any',
    value: DeliveryParamType.Any,
    selected: Boolean(pickUpOption.selected && shippingOption.selected),
    default: true
  }

  const formattedPickUpOption = {
    ...pickUpOption,
    label: 'Local pickup only',
    selected: Boolean(pickUpOption.selected && !shippingOption.selected)
  }

  const formattedShippingOption = {
    ...shippingOption,
    label: 'Nationwide shipping only',
    sub_label: 'Ships to continental 48 states only',
    selected: Boolean(shippingOption.selected && !pickUpOption.selected)
  }

  const updatedOptions = [formattedPickUpAndShippingOption, formattedPickUpOption, formattedShippingOption]
  return updatedOptions
}

const parseNumericRangeFilter = (numericRangeJson: any) => {
  let listOfOptions: any
  if (numericRangeJson.options) {
    listOfOptions = numericRangeJson.options.map((optionJson: any) => {
      return {
        label: optionJson.label,
        currentValue: optionJson.value,
        textHint: optionJson.text_hint
      }
    })
  }

  const numericRangeFilter = {
    position: numericRangeJson.position,
    type: numericRangeJson.type,
    name: numericRangeJson.name,
    label: numericRangeJson.label,
    labelShort: numericRangeJson.label_short,
    label_short: numericRangeJson.label_short,
    units: numericRangeJson.units,
    upperBound: Number(numericRangeJson.upper_bound) || undefined,
    lowerBound: Number(numericRangeJson.lower_bound) || undefined,
    leftQueryParam: numericRangeJson.left_query_param,
    rightQueryParam: numericRangeJson.right_query_param,
    options: listOfOptions
  }
  return numericRangeFilter
}

const parseListFilter = (listFilterJson: any) => {
  let listOfOptions: any
  if (listFilterJson.options) {
    listOfOptions = listFilterJson.options.map((optionJson: any) => {
      return {
        label: optionJson.label,
        labelShort: optionJson.label_short,
        label_short: optionJson.label_short,
        subLabel: optionJson.sub_label,
        value: optionJson.value,
        selected: !!optionJson.selected,
        default: !!optionJson.default
      }
    })
  }

  const listFilter = {
    position: listFilterJson.position,
    type: listFilterJson.type,
    name: listFilterJson.name,
    label: listFilterJson.label,
    labelShort: listFilterJson.label_short,
    label_short: listFilterJson.label_short,
    queryParam: listFilterJson.query_param,
    query_param: listFilterJson.query_param,
    options: listOfOptions
  }
  return listFilter
}

const parsesSearchResponse = (response: any) => {
  const data = response.data.data
  const { feedItems } = parseTilesFromFeedItemList(data.feed_items)
  const feedOptions = parseFeedOptions(data.feed_options)
  let searchSuggestion: any
  if (data.search_suggestion) {
    searchSuggestion = {
      originalQuery: data.search_suggestion.original_query,
      suggestedQuery: data.search_suggestion.suggested_query
    }
  }
  let searchData: any
  if (data.search_data) {
    const { search_performed_event_unique_id: searchPerformedEventUniqueId, search_session_id: searchSessionId } = data.search_data
    searchData = {
      searchPerformedEventUniqueId,
      searchSessionId
    }
  }

  let feedPresentation: any
  if (data.feed_presentation) {
    feedPresentation = {
      columnCount: Number(data?.feed_presentation?.column_count),
      showDetailsOnTiles: !!data?.feed_presentation?.presentation_detail_enabled
    }
  }

  return {
    query: data.query,
    feed_items: feedItems,
    feedItems,
    feed_options: feedOptions,
    feedOptions,
    searchSuggestion,
    searchData,
    feedPresentation,
    next_page_cursor: data.next_page_cursor,
    nextPageCursor: data.next_page_cursor,
    searchAlert: parseSearchAlertInSearchResponse(data.search_alert)
  }
}

const parseSearchAlertInSearchResponse = searchAlert => {
  const { alert_id: alertId, alert_status: alertStatus } = searchAlert
  if (alertStatus !== 'ACTIVE') {
    return undefined
  }
  return {
    alertId
  }
}

const parseTilesFromFeedItemList = feedItemsResponse => {
  const feedItems = []
  feedItemsResponse.forEach(item => {
    let tile = null
    switch (item.type) {
      case FeedItemType.SellerAd: {
        const listing = listingFromItem(item.seller_ad.item)
        const sellerAdTile = sellerAdFromResponse(item)
        tile = {
          listing,
          ...sellerAdTile
        }
        feedItems.push({
          type: item.type,
          tile_id: item.tile_id,
          tileId: item.tile_id,
          listing: tile,
          tile
        })
        break
      }
      case FeedItemType.Item: {
        tile = listingFromItem(item.item)
        feedItems.push({
          type: item.type,
          tile_id: item.tile_id,
          tileId: item.tileId,
          listing: tile,
          tile
        })
        break
      }
      case FeedItemType.Banner: {
        const banner = parseBanner(item.banner)
        feedItems.push({
          type: item.type,
          tileId: item.tileId,
          banner
        })
        break
      }
      case FeedItemType.ActionBanner: {
        const { action_banner_type: actionBannerType } = item.action_banner
        if (Object.values(FeedActionBannerType).includes(actionBannerType)) {
          const banner = parseActionBanner(item.action_banner)
          feedItems.push({
            type: item.type,
            tileId: item.tileId,
            banner
          })
        }
        break
      }
      case FeedItemType.Ad: {
        switch (item.ad.type) {
          case BING_TILE_AD_KEY:
            tile = parseBingAdFromBingAdResponse(item.ad.bing_tile_ad)
            feedItems.push({
              type: item.type,
              tile_id: item.tile_id,
              tileId: item.tileId,
              listing: tile,
              tile
            })
            break
          default:
        }
        break
      }
      default:
    }
  })
  return { feedItems }
}

const parsesSearchAlertsResponse = response => {
  const { data } = response
  const { data: searchAlertsData } = data
  const { search_alerts: searchAlerts } = searchAlertsData
  const alerts = []
  if (searchAlerts) {
    searchAlerts.map(alert => {
      const { alert_id: alertId, query, filters } = alert
      const filterValues = []
      if (filters) {
        Object.keys(filters).forEach(key => {
          filterValues.push(filters[key])
        })
      }
      alerts.push({
        alertId,
        query,
        filters: filterValues && filterValues.join(', ')
      })
    })
  }
  return {
    alerts
  }
}

const parseBanner = banner => {
  const { label } = banner
  const actionBannerType = label === FeedBannerLabel.Fanout ? FeedBannerType.Fanout : undefined
  return {
    label,
    actionBannerType
  }
}

const parseActionBanner = banner => {
  const { action_banner_type: actionBannerType } = banner
  return {
    actionBannerType
  }
}

export {
  searchRequestParamsFromRequestData,
  parsesSearchResponse,
  parsesSearchAlertsResponse,
  parseBingAdFromBingAdResponse,
  BING_TILE_AD_KEY,
  SELLER_TILE_AD_KEY
}
