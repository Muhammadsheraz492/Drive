// In App.js in a new project

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from './Screen/Onboarding';
import Login from './Screen/Login';
import MainScreen from './Screen/MainScreen';
import QRCode from './Screen/QRCode';
import Notification from './Screen/Notification';
import Map from './Screen/Map';
import React, { useState, useEffect } from 'react';
import { Platform, Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import BackgroundGeolocation from 'react-native-background-geolocation';
import DriverLogin from './Screen/DriverLogin';
const Stack = createNativeStackNavigator();

function App() {
  const [location, setLocation] = useState(null);

  // useEffect(() => {
  //   if (Platform.OS === 'android') {
  //     BackgroundGeolocation.configure({
  //       desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
  //       stationaryRadius: 50,
  //       distanceFilter: 50,
  //       notificationTitle: 'Background tracking',
  //       notificationText: 'enabled',
  //       startOnBoot: false,
  //       stopOnTerminate: true,
  //       locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
  //       interval: 10000,
  //       fastestInterval: 5000,
  //       activitiesInterval: 10000,
  //       stopOnStillActivity: false,
  //     });
  //   }

  //   Geolocation.requestAuthorization();

  //   const locationWatchId = Geolocation.watchPosition(
  //     (position) => {
  //     console.log(location);

  //       setLocation(position);
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     {
  //       enableHighAccuracy: true,
  //       timeout: 20000,
  //       maximumAge: 1000,
  //       distanceFilter: 10,
  //       interval: 10000,
  //       fastestInterval: 5000,
  //     }
  //   );

  //   return () => {
  //     Geolocation.clearWatch(locationWatchId);
  //   };
  // }, []);

  // useEffect(() => {
  //   BackgroundGeolocation.on('location', (location) => {
  //     console.log(location);
  //     setLocation(location);
  //   });

  //   return () => {
  //     BackgroundGeolocation.removeListeners();
  //   };
  // }, []);

  // useEffect(() => {
  //   BackgroundGeolocation.start();

  //   return () => {
  //     BackgroundGeolocation.stop();
  //   };
  // }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="QRCode" component={QRCode} />
        
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="DriverLogin" component={DriverLogin} />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
