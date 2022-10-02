# Getting Started
```bash
$ git clone https://github.com/stranerd/stranerd_app
$ cd stranerd_app
$ yarn install

# To run web in dev mode
$ yarn serve

# To run android in dev mode
$ yarn run:android

# To run ios in dev mode
$ yarn run:ios

# To build web
$ yarn build:web

# To build android
$ yarn bin:project:appBuild android Release|Debug bundle|assemble

# To build ios
$ yarn bin:project:appBuild ios Release|Debug
```

## Dev Tools
- git
- node && npm/yarn
- xcode && xcodebuild (to build and sign ios app) (Comes with an installation of XCode. Make sure it is available in your PATH)
- apksigner && zipalign (to build and sign android app) (Comes with an installation of Android Studio. Make sure it is available in your PATH)
