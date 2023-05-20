import { View, Text } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging';

import auth from '@react-native-firebase/auth';

export default function testtoken() {
  const [ FcmToken ,setFcmToken]=React.useState()
    const generateFCMToken = async () => {
        try {
            messaging()
      .requestPermission()
      .then(() => {
        return messaging().getToken();
      })
      .then((token) => {
        setFcmToken(token);
        console.log(token);
      })
      .catch((error) => {
        console.log('Error getting FCM token:', error);
      });
          // Handle the token as needed (e.g., send it to your server)
        } catch (error) {
          console.error('Error generating FCM token:', error);
        }

// auth()
// .createUserWithEmailAndPassword('jane.doe@gmail.com', 'SuperSecretPassword!')
// .then(() => {
//   console.log('User account created & signed in!');
// })
// .catch(error => {
//   if (error.code === 'auth/email-already-in-use') {
//     console.log('That email address is already in use!');
//   }

//   if (error.code === 'auth/invalid-email') {
//     console.log('That email address is invalid!');
//   }

//   console.error(error);
// });
      };
    //   messaging().onMessage(async (remoteMessage) => {
    //     console.log('Received FCM message:', remoteMessage);
    //     // Handle the incoming message here
    //   });
    useEffect(()=>{
    generateFCMToken();
    },[])

  return (
    <View>
      <Text>testtoken {FcmToken}</Text>
    </View>
  )
}