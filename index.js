/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './back';
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
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  Store(remoteMessage.notification.body, remoteMessage.notification.title,)
  //   console.log('Foreground notification:', remoteMessage);
});
const Store = (body, title) => {
  console.log(body);
  const data = {
    title: title,
    body: body,
  };
  AsyncStorage.getItem('notification')
    .then(arrayString => {
      if (arrayString) {
        const retrievedArray = JSON.parse(arrayString);
        // Perform the push operation on the retrieved array
        let temp=[];
        temp.push(data)
        // temp.concat(retrievedArray)
        retrievedArray.push(data);
        // Store the updated array back in AsyncStorage
        AsyncStorage.setItem('notification', JSON.stringify(retrievedArray))
          .then(() => {
            console.log('Item added to the array and stored successfully.');
          })
          .catch(error => {
            console.log('Error storing updated array:', error);
          });
      } else {
        let temp = [];
        temp.push(data);
        AsyncStorage.setItem('notification', JSON.stringify(temp))
          .then(() => {
            console.log('Item added to the array and stored successfully.');
          })
          .catch(error => {
            console.log('Error storing updated array:', error);
          });
        // console.log('Array not found in AsyncStorage.');
      }
    })
    .catch(error => {
      console.log('Error retrieving array:', error);
    });
};
AppRegistry.registerComponent(appName, () => App);















// import {AppRegistry} from 'react-native';
// import App from './Test';
// import {name as appName} from './app.json';


// AppRegistry.registerComponent(appName, () => App);
