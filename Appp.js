// // import React, { useState, useEffect } from 'react';
// // import { View,Text } from 'react-native';
// // import { Platform } from 'react-native';
// // import Geolocation from 'react-native-geolocation-service';
// // import BackgroundGeolocation from 'react-native-background-geolocation';

// // const App = () => {
// //   const [location, setLocation] = useState(null);

// //   useEffect(() => {
// //     if (Platform.OS === 'android') {
// //       BackgroundGeolocation.configure({
// //         desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
// //         stationaryRadius: 50,
// //         distanceFilter: 50,
// //         notificationTitle: 'Background tracking',
// //         notificationText: 'enabled',
// //         startOnBoot: false,
// //         stopOnTerminate: true,
// //         locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
// //         interval: 10000,
// //         fastestInterval: 5000,
// //         activitiesInterval: 10000,
// //         stopOnStillActivity: false,
// //       });
// //     }

// //     Geolocation.requestAuthorization();

// //     const locationWatchId = Geolocation.watchPosition(
// //       (position) => {
// //         setLocation(position);
// //       },
// //       (error) => {
// //         console.log(error);
// //       },
// //       {
// //         enableHighAccuracy: true,
// //         timeout: 20000,
// //         maximumAge: 1000,
// //         distanceFilter: 10,
// //         interval: 10000,
// //         fastestInterval: 5000,
// //       }
// //     );

// //     return () => {
// //       Geolocation.clearWatch(locationWatchId);
// //     };
// //   }, []);

// //   useEffect(() => {
// //     BackgroundGeolocation.on('location', (location) => {
// //       setLocation(location);
// //     });

// //     return () => {
// //       BackgroundGeolocation.removeListeners();
// //     };
// //   }, []);

// //   useEffect(() => {
// //     BackgroundGeolocation.start();

// //     return () => {
// //       BackgroundGeolocation.stop();
// //     };
// //   }, []);

// //   return (
// //     <View>
// //       <Text>Latitude: {location?.coords.latitude}</Text>
// //       <Text>Longitude: {location?.coords.longitude}</Text>
// //     </View>
// //   );
// // };

// // export default App;
// import BackgroundGeolocation, {
//   State,
//   Config,
//   Location,
//   LocationError,
//   Geofence,
//   GeofenceEvent,
//   GeofencesChangeEvent,
//   HeartbeatEvent,
//   HttpEvent,
//   MotionActivityEvent,
//   MotionChangeEvent,
//   ProviderChangeEvent,
//   ConnectivityChangeEvent
// } from "react-native-background-geolocation";
// import { View, Text } from 'react-native'
// import React, { useEffect } from 'react'

// const App = () => {
// const GetData=async()=>{
//   BackgroundGeolocation.ready({
//     desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH, 
//     distanceFilter: 50
//   }).then(state => {
//     console.log('- BackgroundGeolocation is ready: ', state);
//   }).catch(error => {
//     console.warn('- BackgroundGeolocation error: ', error);
//   });
  
//   // Or use await in an async function
//   try {
//     const state = await BackgroundGeolocation.ready({
//       desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH, 
//       distanceFilter: 50
//     })
//     console.log('- BackgroundGeolocation is ready: ', state);
//   } catch (error) {
//     console.warn('- BackgroundGeolocation error: ', error);
//   }
// }
// useEffect(()=>{
//   GetData()
// })
//   return (
//     <View>
//       <Text>App</Text>
//     </View>
//   )
// }

// export default App





