/**
 * The user has authenticated, but has been forbidden - they are banned!
 */
export class AuthenticationForbiddenError extends Error {
  constructor(message?: string) {
    super(message || "User has been banned")
    this.name = "AuthenticationForbiddenError"
  }
}

/**
 * External credentials were rejected
 */
export class CredentialsRejectedError extends Error {
  constructor(message?: string) {
    super(message || "Credentials were rejected")
    this.name = "CredentialsRejectedError"
  }
}

/**
 * External credentials are not set
 */
export class MissingCredentialsError extends Error {
  constructor(message?: string) {
    super(message || "Credentials are missing")
    this.name = "MissingCredentialsError"
  }
}

/**
 * Thrown when unexpected responses come back for authentication APIs
 */
export class UnexpectedAuthenticationError extends Error {
  constructor(message?: string) {
    super(message || "Unexpected authentication error")
    this.name = "UnexpectedAuthenticationError"
  }
}

/**
 * Thrown when a response arrives that is not expected
 */
export class UnhandledResponseError extends Error {
  constructor(message?: string) {
    super(message || "Response status was not expected")
    this.name = "UnhandledResponseError"
  }
}
