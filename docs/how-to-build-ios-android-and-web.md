
# How to build ios, android, and web app for development
## Install prerequiste tools
```
Install Xcode
Install Android studio and Android SDK.
Brew https://brew.sh/
brew install yarn 
brew install node
```

## Install dependencies from root project folder `client/`
```
yarn redibs-install
```
> If ran into an issue with pod dependencies, need to get Cocoapods repo update via `yarn redibs-app pod-repo-update` , then run `yarn redibs-install` again

## Run ios app
Simulator
```
yarn ios
```

Physical device [make sure on same wifi network]
```
yarn ios --device "Client’s iPhone"
```

### Release build
Simulator
```
yarn ios:release
```

Physical device
```
yarn ios:release --device "Your iPhone"
```

## Run android app
Simulator
```
yarn android
```
After this, should able to see android simulator with app install. 

Physical device [make sure on same wifi network]
```
yarn android --deviceId={deviceId}
```

### Release build
Simulator
```
yarn android:release
```

Physical device
```
yarn android:release --deviceId={deviceId}
```

### To get the device Id
```
adb devices
```

## Run web server
```
yarn web
```
Should launch web server on http://localhost:3000

If runnning into CORs issue, close browser and use this to open Chrome with security disable flag before landing. Note this temporary solution.
```
open -a Google\ Chrome --args --disable-web-security --user-data-dir
```
# Add new dependencies
Add a dependency to  main package
```
yarn -W add package-name
```

Add a dependency to web package
```
yarn redibs-web add package-name
```
Add a dependency to app package
```
yarn redibs-app add package-name
```

Add a dependency to shared library package
```
yarn redibs-shared add package-name
```

To install dev dependencies, adding `--dev`
e.g
```
yarn -W add package-name --dev
```

# Other helpful custom script

Fresh clean up dependencies including npm and pod dependencies
```
yarn redibs-clean
```
To reinstall dependencies
```
yarn redibs-install
```
