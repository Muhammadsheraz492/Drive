// import React, { useEffect, useState } from 'react';
// import { View, Text, PermissionsAndroid } from 'react-native';
// import MapView, { Marker } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// import Geolocation from 'react-native-geolocation-service';
// const origin = {latitude: 37.3318456, longitude: -122.0296002};

// const destination = {latitude: 37.771707, longitude: -122.4053769};
// const API_KEY = 'AIzaSyC-at3-WlccF6DEkDd3U0MEn9CUraQwqXw';

// const MapScreen = () => {
//   const [routeCoordinates, setRouteCoordinates] = useState([]);
//   const [currentLocation, setCurrentLocation] = useState(null);

//   useEffect(() => {
//     requestLocationPermission();
//   }, []);

//   const requestLocationPermission = async () => {
//     try {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//       );

//       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//         getCurrentLocation();
//       } else {
//         console.log('Location permission denied');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setCurrentLocation({ latitude, longitude });
//       },
//       (error) => {
//         console.error('Error:', error);
//       },
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
//     );
//   };

//   useEffect(() => {
//     if (currentLocation) {
//       fetchDirections();
//     }
//   }, [currentLocation]);

//   const fetchDirections = async () => {
//     try {
//       const response = await fetch(
//         `https://maps.googleapis.com/maps/api/directions/json?origin=${currentLocation.latitude},${currentLocation.longitude}&destination=${destination.latitude},${destination.longitude}&key=${API_KEY}`
//       );

//       const data = await response.json();

//       if (data.status === 'OK') {
//         const coordinates = data.routes[0].overview_polyline.points;
//         setRouteCoordinates(decodePolyline(coordinates));
//       } else {
//         console.log('Error:', data.status);
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };

//   const decodePolyline = (polyline) => {
//     // ... (same as before)
//   };

//   return (
//     <MapView
//     // initialRegion={{
//     //   latitude: LATITUDE,
//     //   longitude: LONGITUDE,
//     //   latitudeDelta: LATITUDE_DELTA,
//     //   longitudeDelta: LONGITUDE_DELTA,
//     // }}
//     style={StyleSheet.absoluteFill}
//     // ref={c => this.mapView = c}
//     // onPress={this.onMapPress}
//   >
   
//     {/* {(this.state.coordinates.length ) && ( */}
//       <MapViewDirections
//         origin={origin}
//         // waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): undefined}
//         destination={destination}
//         apikey={GOOGLE_MAPS_APIKEY}
//         strokeWidth={10}
//         strokeColor="blue"
//         // optimizeWaypoints={true}
//         // onStart={(params) => {
//         //   console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
//         // }}
//         // onReady={result => {
//         //   console.log(`Distance: ${result.distance} km`)
//         //   console.log(`Duration: ${result.duration} min.`)

//         //   this.mapView.fitToCoordinates(result.coordinates, {
//         //     edgePadding: {
//         //       right: (width / 20),
//         //       bottom: (height / 20),
//         //       left: (width / 20),
//         //       top: (height / 20),
//         //     }
//         //   });
//         // }}
//         onError={(errorMessage) => {
//         //   console.log('GOT AN ERROR');
//         }}
//       />
//     {/* )} */}
//   </MapView>
//   );
// };

// export default MapScreen;













// // import React, { Component } from 'react';
// // import { Dimensions, StyleSheet } from 'react-native';
// // import MapView from 'react-native-maps';
// // import MapViewDirections from 'react-native-maps-directions';

// // const { width, height } = Dimensions.get('window');
// // const ASPECT_RATIO = width / height;
// // const LATITUDE = 37.771707;
// // const LONGITUDE = -122.4053769;
// // const LATITUDE_DELTA = 0.0922;
// // const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

// // const GOOGLE_MAPS_APIKEY = 'AIzaSyC-at3-WlccF6DEkDd3U0MEn9CUraQwqXw';

// // class Example extends Component {

// //   constructor(props) {
// //     super(props);

// //     // AirBnB's Office, and Apple Park
// //     this.state = {
// //       coordinates: [
// //         {
// //           latitude: 37.3317876,
// //           longitude: -122.0054812,
// //         },
// //         {
// //           latitude: 37.771707,
// //           longitude: -122.4053769,
// //         },
// //       ],
// //     };

// //     this.mapView = null;
// //   }

// //   onMapPress = (e) => {
// //     this.setState({
// //       coordinates: [
// //         ...this.state.coordinates,
// //         e.nativeEvent.coordinate,
// //       ],
// //     });
// //   }

// //   render() {
// //     return (
// //       <MapView
// //         initialRegion={{
// //           latitude: LATITUDE,
// //           longitude: LONGITUDE,
// //           latitudeDelta: LATITUDE_DELTA,
// //           longitudeDelta: LONGITUDE_DELTA,
// //         }}
// //         style={StyleSheet.absoluteFill}
// //         ref={c => this.mapView = c}
// //         onPress={this.onMapPress}
// //       >
       
// //         {(this.state.coordinates.length >= 2) && (
// //           <MapViewDirections
// //             origin={this.state.coordinates[0]}
// //             waypoints={ (this.state.coordinates.length > 2) ? this.state.coordinates.slice(1, -1): undefined}
// //             destination={this.state.coordinates[this.state.coordinates.length-1]}
// //             apikey={GOOGLE_MAPS_APIKEY}
// //             strokeWidth={10}
// //             strokeColor="blue"
// //             optimizeWaypoints={true}
// //             onStart={(params) => {
// //               console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
// //             }}
// //             onReady={result => {
// //               console.log(`Distance: ${result.distance} km`)
// //               console.log(`Duration: ${result.duration} min.`)

// //               this.mapView.fitToCoordinates(result.coordinates, {
// //                 edgePadding: {
// //                   right: (width / 20),
// //                   bottom: (height / 20),
// //                   left: (width / 20),
// //                   top: (height / 20),
// //                 }
// //               });
// //             }}
// //             onError={(errorMessage) => {
// //               // console.log('GOT AN ERROR');
// //             }}
// //           />
// //         )}
// //       </MapView>
// //     );
// //   }
// // }

// // export default Example;