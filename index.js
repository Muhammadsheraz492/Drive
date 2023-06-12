/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './Ap';
import { name as appName } from './app.json';
import notifee from '@notifee/react-native';

// import testtoken from './testtoken';
// // import Map from './Screen/Map';
// import MapScreen from './Screen/test2';
// import test from './Screen/test';
// import MyComponent from './back';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  Store(remoteMessage.notification.body, remoteMessage.notification.title,)
  console.log('Foreground notification:', remoteMessage);
});
// const storeData = async (body, title) => {
//   // console.log(email);
//   const data = {
//     title: title,
//     body: body,
//   };
//   try {
//     AsyncStorage.setItem('notification', JSON.stringify(data))
//       .then(() => {
//         console.log('Data stored successfully');
//         // AsyncStorage.removeItem('userstatus');
//         // AsyncStorage.setItem('userstatus', '');
//       })
//       .catch(err => {
//         console.log(err);
//       });
//   } catch (error) {
//     console.log('Error storing data: ', error);
//   }
// };
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
