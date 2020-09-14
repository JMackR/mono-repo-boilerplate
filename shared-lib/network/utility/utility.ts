import _ from "lodash"
import { deepFreeze } from "../../utilities/object-utils"

// tslint:disable: no-any

export enum AUTH_ERROR_CODE {
  EMAIL_ALREADY_REGISTERED = "K1XK5WZQ",
  MFA_REQUIRED = "0N0GXNWV",
  PHONE_VERIFICATION_REQUIRED = "E4QNG9P4",
  OTP_CHALLENGE = "J9W5P0VJ",
  RECAPTCHA_REQUIRED = "R0W8R74Q",
  BLOCKED_USER = "9XP9XWO9",
  NO_EMAIL_PROVIDED = "WLO093JJ",
  TOO_MANY_LOGIN_ATTEMPTS = "8RK3R41K",
  INVALID_CREDENTIALS = "0D3WD8OV",
}

export enum PASSWORD_ERROR_CODE {
  INVALID_CURRENT_PASSWORD = "JRQ4Q86G",
}

export interface Exception {
  title?: string
  message?: string
  code?: string
  httpStatusCode?: number
  dismissible?: boolean
  actions?: ExceptionAction[]
  icon?: ExceptionIcon
}

export interface ExceptionAction {
  actionPath: string
  label: string
  icon?: ExceptionIcon
}

export interface ExceptionIcon {
  url: string
  visible: boolean
}

export const DEFAULT_SOMETHING_WENT_WRONG: Exception = deepFreeze({
  title: "Something went wrong",
  message: "Please try again later.",
})

export const GraphGQLErrorParser = (error: any): Exception => {
  const graphQLError = {
    message: _.property<any, string>("graphQLErrors.0.message")(error),
  }
  const originalError = _.property<any, object>("graphQLErrors.0.extensions.exception.originalError")(error)

  const ouExceptionFromExtension: Exception = {
    title:
      _.property<any, string>("error.context.title")(originalError) || _.property<any, string>("error.title")(originalError),
    message:
      _.property<any, string>("error.context.message")(originalError) ||
      _.property<any, string>("error.description")(originalError),
    code: _.property<any, string>("error.error_code")(originalError),
    httpStatusCode: _.property<any, number>("code")(originalError),
    dismissible: _.property<any, boolean>("error.context.dismissible")(originalError),
    icon: _.property<any, ExceptionIcon>("error.context.icon")(originalError),
    actions: parseGQLExceptionActions(_.property<any, object[]>("error.context.actions")(originalError) || []),
  }

  const mergedResult = _.merge({}, DEFAULT_SOMETHING_WENT_WRONG, graphQLError, ouExceptionFromExtension)
  return mergedResult
}

const parseGQLExceptionActions = (exceptionActionList: object[]) =>
  exceptionActionList.map<ExceptionAction>(actionObj => ({
    actionPath: _.property<object, string>("action_path")(actionObj),
    label: _.property<object, string>("label")(actionObj),
    icon: _.property<object, ExceptionIcon>("icon")(actionObj),
  }))
