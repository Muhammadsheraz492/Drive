/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './Ap';
import {name as appName} from './app.json';
import testtoken from './testtoken';
// import Map from './Screen/Map';
import MapScreen from './Screen/test2';
import test from './Screen/test';
import notifee from '@notifee/react-native';
import MyComponent from './back';
// import App from './back';
import messaging from '@react-native-firebase/messaging';
import axios from 'axios';
import Url from './url.json';
const Cancel = () => {
  alert('Okey');
  //   const config = {
  //     method: 'put',
  //     url: `http://127.0.0.1:3000/User/cancel_route?email=driver4@gmail.com`,
  //     headers: {},
  //   };

  //   axios
  //     .request(config)
  //     .then(response => {
  //       console.log(JSON.stringify(response.data));
  //     })
  //     .catch(error => {
  //       console.log(error);
  //     });
};
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
        actions: [
          {
            pressAction: {
              id: 'Cancel',
            },
            title: 'Cancel',

            onPress: () => {
              // Your logic for handling the "Cancel" action here
              alert('Cancel button pressed');
            },
          },
          {
            pressAction: {
              id: 'Ok',
            },
            title: 'Ok',
          },
        ],
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

AppRegistry.registerComponent(appName, () => MyComponent);
