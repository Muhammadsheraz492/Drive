import axios from 'axios';
import React, {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  PermissionsAndroid,
  Image,
} from 'react-native';
import url from '../url.json';

import MapView, {Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
const {width, height} = Dimensions.get('window');
import Geolocation from 'react-native-geolocation-service';
import {useNavigation} from '@react-navigation/native';

const GOOGLE_MAPS_APIKEY = 'AIzaSyC-at3-WlccF6DEkDd3U0MEn9CUraQwqXw';

const Example = ({route}) => {
  let navigation = useNavigation();
  const mapViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [checkclick, setcheckclick] = useState(false);
  const [coordinates, setcoordinates] = useState([]);
  const [Student, setStudent] = useState([]);
  const [Stops, SetStops] = useState([]);
  const [status, setstatus] = useState(false);
  const [Sherazlat, setSherazlat] = useState('');
  const [Sherazlong, setSherazlong] = useState('');
  const {driver_email, student_email} = route.params;
  const LATITUDE = 12.23;
  const LONGITUDE = 23.33;
  const ASPECT_RATIO = width / height;

  const LATITUDE_DELTA = 0.1922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        // setCurrentLocation({ latitude, longitude });
        // console.log('hi ', latitude, longitude);
        setSherazlat(latitude);
        setSherazlong(longitude);
        // UpdatedLocation(latitude,longitude)
      },
      error => {
        console.error('Error:', error);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  // console.log(student_email);
  const UpdatedLocation = (v1, v2) => {
    setcheckclick(true);
    setstatus(true);
    // console.log(latitude);
    const options = {
      method: 'POST',
      url: `https://${url.baseurl}/User/update_Student_location`,
      data: {
        email: student_email,
        latitude: Sherazlat,
        longitude: Sherazlong,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data);
        setstatus(false);
      })
      .catch(function (error) {
        // console.error(error);
        if (err.response) {
          console.log(err.response);
        }
        setstatus(false);
      });
  };

  const GetData = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://${url.baseurl}/User/bas_current_location?email=${driver_email}`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        setcoordinates(response.data.message[0].destination);
        // console.log(JSON.stringify(response.data.message[0].destination));
        GetStudentLotion();
      })
      .catch(error => {
        console.log(error);
      });
  };
  const GetStudentLotion = () => {
    let config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: `https://${url.baseurl}/User/all_Student_location`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        // console.log(JSON.stringify(response.data));
        setStudent(response.data.message);
        setLoading(false);
      })
      .catch(error => {
        console.log(error.response);
      });
  };

  const student_status = () => {
    const options = {
      method: 'GET',
      url: `https://${url.baseurl}/User/student_status`,
      params: {email: student_email},
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data.status);
        setcheckclick(response.data.status);
      })
      .catch(function (error) {
        // console.error(error);
      });
  };

  const Cancel = () => {
    setstatus(true);
    const options = {
      method: 'GET',
      url: `https://${url.baseurl}/User/cancel_user`,
      params: {email: student_email},
    };

    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data.status);
        setcheckclick(false);
        setstatus(false);

        // setcheckclick(response.data.status)
      })
      .catch(function (error) {
        console.error(error);
        setstatus(false);
      });
  };
  const GetStop = () => {
    console.log('Shop');
    const options = {
      method: 'GET',
      url: `https://${url.baseurl}/Admin/Get_stops`,
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.data);
        SetStops(response.data.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  useEffect(() => {
    navigation.addListener('focus', () => {
      GetData();
      student_status();
      GetStop();
    });
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      GetData();
      student_status();
      GetStop();
    }, 8000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <View style={styles.container}>
      {loading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <>
          <MapView
            initialRegion={{
              latitude: LATITUDE,
              longitude: LONGITUDE,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            style={StyleSheet.absoluteFill}
            ref={mapViewRef}
            // zoomEnabled={false}
            maxZoomLevel={12}>
            {coordinates.length > 0 && (
              <MapViewDirections
                origin={coordinates[0]}
                waypoints={
                  coordinates.length > 2 ? coordinates.slice(1, -1) : undefined
                }
                destination={coordinates[coordinates.length - 1]}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
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
                  mapViewRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: width / 20,
                      bottom: height / 20,
                      left: width / 20,
                      top: height / 20,
                    },
                  });
                }}
                onError={errorMessage => {
                  // console.log('GOT AN ERROR');
                }}
              />
            )}
            <Marker
              key={`Initial `}
              coordinate={coordinates[0]}
              title={`Marker $`}
              // image={}
              
            >
                  <Image
          source={require('../assest/Bas.png')}
          style={{ width: 40, height: 40 }}
        />
    </Marker>
            <Marker
              key={`Destination`}
              coordinate={coordinates[coordinates.length - 1]}
              title={`Marker $`}
              pinColor="#FF0000"
            />
            {/* {Student.map(index => ( */}
            {/* {Student.map((item, index) => (
              <Marker
                key={`Destination${index}`}
                coordinate={Student[index]}
                title={`Student`}
                pinColor="green"
              />
            ))} */}
            {Stops.map((item, index) => (
              <Marker
                key={`Stop ${index}`}
                coordinate={Stops[index]}
                title={`Stop ${index + 1}`}
                pinColor="orange"
              >
                      <Image
          source={require('../assest/Stops.png')}
          style={{ width: 40, height: 40 }}
        />
    </Marker>
            ))}
            {/* // ))} */}
          </MapView>
          <TouchableOpacity
            onPress={status ? null : checkclick ? Cancel : UpdatedLocation}>
            <View
              style={{
                top: 5,
                right: 5,
                width: 80,
                height: 30,
                alignSelf: 'flex-end',
                backgroundColor: checkclick ? 'gray' : '#000080',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#fff'}}>
                {status ? (
                  <ActivityIndicator size={'small'} />
                ) : checkclick ? (
                  'cancel'
                ) : (
                  'Ready'
                )}
              </Text>
            </View>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activityIndicatorContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
});

export default Example;
