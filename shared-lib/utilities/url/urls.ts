import { Url } from "./url"

export const Urls = {
  home: "/",
  search: "/search",
  profile: (id: string) => Url.reverse("/p/:id/", { id }),
  discussion: (id: string) => Url.reverse("/discussions/:id/", { id }),
  account: "/profile",
  searchAlerts: "/accounts/search-alerts",
  settings: "/accounts/settings",
  savedItems: "/saved/saved-lists",
  vanityUrl: "/profile/vanity-url",
  inviteFriend: "/profile/invite-friends",
  rateTransaction: (itemId: string) => Url.reverse("/item/:itemId/rate-transaction", { itemId }),
  login: "/login",
  loginWithEmail: "/login-with-email",
  resetPassword: "/reset-password",
  register: "/register",
  item: (id: string) => Url.reverse("/item/detail/:id", { id }),
  savedListings: (savedListId: string) => Url.reverse("/saved/listings/:savedListId", { savedListId }),
  selling: "/selling",
  archivedOffers: "/selling/archived",
  promote: (itemId: string) => Url.reverse("/item/:item_id/promote", { itemId }),
  itemDashboard: (itemId: string) => Url.reverse("/item/:itemId/discussions", { itemId }),
  transactions: "/accounts/transactions",
  paymentAccounts: "/payments/accounts",
  receiptByItemId: (itemId: string) => Url.reverse("/payments/receipt/:itemId/", { itemId }),
  receiptByPaymentId: (paymentId: string) => Url.reverse("/payments/:paymentId/receipt/", { paymentId }),
  inbox: "/todos",
  contactUs: (path?: string) => {
    let url = "/support/contact-us/"
    if (path) {
      url += path
    }
    return url
  },
}
