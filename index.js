/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

PushNotification.configure({
  onRegister: (token) => {
    console.log("TOKEN: ", token);
  },

  onNotification: (notification) => {
    console.log("NOTIFICATION: ", notification);

    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // onAction: (notification) => {
  //   console.log("ACTION: ", notification.action);
  // },

  // onRegistrationError: (err) => {
  //   console.error(err.message, err);
  // },

  popInitialNotification: true,

  // requestPermissions: true,
  requestPermissions: Platform.OS === 'ios'

})

AppRegistry.registerComponent(appName, () => App);
