# Helpful docs

[How to build ios, android, and web app for development](../docs/how-to-build-ios-android-and-web.md)

[How to use shared components package between web and app](../docs/how-to-use-shared-components-web-and-app.md)

# How to use the build environment

[Building React Native app for multiple environments](https://medium.com/@ywongcode/building-multiple-versions-of-a-react-native-app-4361252ddde5)

[The 12 Factor App: Store config in the environment](https://12factor.net/config)

## Build Types:

* Debug
* Release

NOTE: iOS and Android use different flags to denote build type:

* iOS `yarn ios --configuration Release`
* Android `yarn android --variant=release`

Debug builds typically run with the metro bundler (`yarn start`) and allow for better debugging. Release builds package up the JavaScript and assets into a bundle deployed with the app.

## Build Flavors:

* Beta => `com.redibs.iphone.internal` or `com.redibs.stg`
* Live => `com.redibs`

Flavors are used to configure aspects of the application such as:

* App ID, Bundle ID
* API Keys, SDK Tokens (e.g. Google, Facebook, Instabug, etc.)

NOTE: iOS and Android use different methods

* iOS `yarn ios --scheme Redibs-Beta --configuration Beta.Debug`
   * Scheme: Redibs, Redibs-Beta
   * Configuration: Debug, Beta.Debug, Release, Release.Debug
   * User defined settings: project build settings set a different value for each configuration
* Android `yarn android --variant=betaDebug --appId com.redibs.stg`
   * Product Flavors: [Specified in the app build gradle file](./android/app/build.gradle)
   * Source Sets: `<product-flavor><Build-Type>`
      * src/betaDebug/ (build variant source set)
      * src/debug/ (build type source set)
      * src/beta/ (product flavor source set)
      * src/main/ (main source set)

[Android: Configure build variants](https://developer.android.com/studio/build/build-variants)

## Dotenv (.env)

[react-native-config](https://github.com/luggit/react-native-config)

* Development (localhost)
* Integration
* Production
* Uat

Store config in the environment, allowing various settings to be configured at build time.

### Basic Usage

Create a new file .env in the root of your React Native app:
```
API_URL=https://myapi.com
GOOGLE_MAPS_API_KEY=abcdefgh
```

### React Native

Then access variables defined there from your app:
```
import Config from "react-native-config";

Config.API_URL; // 'https://myapi.com'
Config.GOOGLE_MAPS_API_KEY; // 'abcdefgh'
```

### iOS

Read variables declared in .env from your Obj-C classes like:
```
// import header
#import "ReactNativeConfig.h"

// then read individual keys like:
NSString *apiUrl = [ReactNativeConfig envFor:@"API_URL"];
```

### Android

Config variables set in .env are available to your Java classes via BuildConfig:
```
public HttpURLConnection getApiClient() {
    URL url = new URL(BuildConfig.API_URL);
    // ...
}
```
And use them to configure libraries in AndroidManifest.xml and others:
```
<meta-data
  android:name="com.google.android.geo.API_KEY"
  android:value="@string/GOOGLE_MAPS_API_KEY" />
```

# Available Scripts

There are now lots of options for how to run iOS/Android in the [package.json](./package.json) file.

## Format

```
yarn [os]:[flavor]:[env]:[type]
```

### Basic

NOTE: Defaults to DEBUG LIVE STAGING env
```
yarn ios
yarn android
```
### Release

NOTE: Defaults to LIVE STAGING env
```
yarn ios:release
yarn android:release
```
### Flavor

NOTE: Defaults to DEBUG STAGING env
```
yarn ios:beta
yarn android:beta
```
### Environment

NOTE: Defaults to DEBUG LIVE env
```
yarn ios:dev
yarn android:stage
```
### Env + Release

NOTE: Defaults to LIVE env
```
yarn ios:dev:release
yarn android:stage:release
```
### Flavor + Release

NOTE: Defaults to STAGING env
```
yarn ios:beta:release
yarn android:beta:release
```
### Flavor + Env + Release

Specify it all!!!
```
yarn ios:beta:dev:release
yarn android:beta:stage:release
```
