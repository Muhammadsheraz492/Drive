/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './Ap';
import {name as appName} from './app.json';
import notifee from '@notifee/react-native';

// import testtoken from './testtoken';
// // import Map from './Screen/Map';
// import MapScreen from './Screen/test2';
// import test from './Screen/test';
// import MyComponent from './back';
import messaging from '@react-native-firebase/messaging';
async function onDisplayNotification(val1, val2) {
  try {
    // Request permissions (required for iOS)
    await notifee.requestPermission();
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    const notification = {
      title: val2,
      body: val1,
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
        // actions: [
        //   {
        //     pressAction: {
        //       id: 'action1',
        //     },
        //     title: 'Action 1',
        //   },
        //   {
        //     pressAction: {
        //       id: 'action2',
        //     },
        //     title: 'Action 2',
        //   },
        // ],
      },
    };

    await notifee.displayNotification(notification);
    // }
  } catch (error) {
    // Handle the error here
    console.error('Error displaying notification:', error);
  }
}
messaging().onMessage(async remoteMessage => {
  // Handle the received foreground notification
  onDisplayNotification(
    remoteMessage.notification.body,
    remoteMessage.notification.title,
  );
  //   console.log('Foreground notification:', remoteMessage);
});

AppRegistry.registerComponent(appName, () => App);
