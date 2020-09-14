// import * as firebase from "firebase/app"
// import "firebase/analytics"

const FIREBASE_BETA_APP = "[BETA]"
const FIREBASE_LIVE_APP = "[LIVE]"

/* CONFIG FROM FIREBASE CONSOLE */
const firebaseBetaConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
}

const firebaseLiveConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: "",
}

// if (firebase.apps.length === 0) {
//   // firebase.initializeApp(firebaseBetaConfig, FIREBASE_BETA_APP)
//   // firebase.initializeApp(firebaseLiveConfig, FIREBASE_LIVE_APP)
// }
// TODO: CLIENT-1532 Get proper environment URL on *Web* Client
// For now- default to the BETA app
// export const firebaseApp = firebase.app(FIREBASE_BETA_APP)
// Example usage:
// firebaseApp.analytics().logEvent('notification_received')
