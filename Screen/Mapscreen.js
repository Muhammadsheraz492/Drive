import React, {Component, useRef, useState} from 'react';
import {useEffect} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import url from '../url.json';
import axios from 'axios';
const {width, height} = Dimensions.get('window');
// const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyC-at3-WlccF6DEkDd3U0MEn9CUraQwqXw';
const ASPECT_RATIO = width / height;

const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Mapscreen = ({route}) => {
  // AirBnB's Office, and Apple Park
  // let mapView = useRef();
  const {  driver_email } = route.params;
  const [coordinates, setcoordinates] = useState([]);
  const [isloader, setisloader] = useState(true);
  const GetCurrentLocation = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `http://${url.baseurl}:3000/User/bas_current_location?email=${driver_email}`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        setcoordinates(response.data.message[0].destination);
        // console.log(JSON.stringify(response.data.message[0].destination));
        setisloader(false);
      })
      .catch(error => {
        console.log(error);
      });
  };
  useEffect(() => {
    GetCurrentLocation();
  }, []);
  return isloader ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} />
    </View>
  ) : (
   
    <MapView
      initialRegion={{
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }}
      style={StyleSheet.absoluteFill}
      ref={c => (mapView = c)}
      // onPress={this.onMapPress}
    >
      <MapViewDirections
        origin={{
          latitude: coordinates[0].latitude,
          longitude: coordinates[0].longitude,
        }}
        waypoints={
          coordinates.length > 2 ? coordinates.slice(1, -1) : undefined
        }
        destination={{
          latitude: coordinates[1].latitude,
          longitude: coordinates[1].longitude,
        }}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={10}
        strokeColor="blue"
        optimizeWaypoints={true}
        onStart={params => {
          console.log(
            `Started routing between "${params.origin}" and "${params.destination}"`,
          );
        }}
        onReady={result => {
          console.log(`Distance: ${result.distance} km`);
          console.log(`Duration: ${result.duration} min.`);

          mapView.fitToCoordinates(result.coordinates, {
            edgePadding: {
              right: width / 20,
              bottom: height / 20,
              left: width / 20,
              top: height / 20,
            },
          });
        }}
        onError={errorMessage => {}}
      />
    </MapView>
  );
};

export default Mapscreen;