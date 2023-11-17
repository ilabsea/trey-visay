# TreyVisay
It is a mobile application (Android & iOS) that allows high school students to do the test to get to know more about themself and know the soft and hard skills needed for their future goals.

## Getting Start

### Prerequisites

- Make sure your environment is set up to run React Native applications. Follow the [React Native](https://reactnative.dev/docs/environment-setup?guide=native) instructions for getting started.
- Apps using Realm 11.4.0
- React Native 0.71.2
- Node version 18.12.1

#### Run the application
**1.** Go to the project directory
```
$cd trey-visay
```
**2.** Install dependencies by running the below command
```
$npm install
```
**3.** Create a new file named "environment.js" in the "app/config" directory then copy and paste the content from the "environment.example.js" (in the same directory) and use the valid API URL and credential of the app in the environment.js file


**4.** Start the Metro, run the below command inside your React Native project directory
```
npm start
```

**5.** Open a new tab of your terminal to run the on iOS or Android
#### For Android
- To run the application on Android
```
$npm run android
```

#### For iOS
- Go to the 'ios' directory then run below command
```
$pod install
```
**Note:** If it gets an error when running pod install try removing the file "Podfile.lock" in the ios folder then run pod install again.

- To run the application on iOS
```
$npm run ios
```

#### Build for Release
- If no existed keystore, you can create a new one, or use the exsited keystore and follow
[Build for release](https://reactnative.dev/docs/signed-apk-android)