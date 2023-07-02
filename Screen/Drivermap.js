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
import AsyncStorage from '@react-native-async-storage/async-storage';

const GOOGLE_MAPS_APIKEY = 'AIzaSyC-at3-WlccF6DEkDd3U0MEn9CUraQwqXw';

const Example = ({route}) => {
  const mapViewRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [checkclick, setcheckclick] = useState(false);
  const [coordinates, setcoordinates] = useState([]);
  const [Student, setStudent] = useState([]);
  const [status, setstatus] = useState(false);
  const {driver_email, student_email} = route.params;
  const LATITUDE = 54.23;
  const LONGITUDE = 0.33;
  const ASPECT_RATIO = width / height;

  const LATITUDE_DELTA = 0.2922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
  const currentDate = new Date();
  const currentDateString = currentDate.toDateString();
  const currentTimeString = currentDate.toLocaleTimeString();
  const [Stops, SetStops] = useState([]);
  const [textdata, settextdata] = useState('Demo');
  const [Speed, SetSpeed] = useState('');

  useEffect(() => {
    requestLocationPermission();
  }, []);
  const SpeedUpload = speed => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://stsu.herokuapp.com/Admin/Over_Speed?email=${driver_email}&speed=${speed}`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    // Request location permission if needed
    Geolocation.requestAuthorization('whenInUse');

    // Start listening for location updates
    const watchId = Geolocation.watchPosition(
      position => {
        // Check if the position has speed information
        if (position.coords.speed !== null) {
          const speed = (position.coords.speed.toFixed(2) * 4.3).toFixed(2);
          if(speed>=60){
            SpeedUpload(speed);

          }
          console.log('Current speed: ' + speed + ' meters per second');
          SetSpeed(speed);
        } else {
          console.log('Speed information is not available.');
        }
      },
      error => {
        console.log('Error getting location: ' + error.message);
      },
      {enableHighAccuracy: true, distanceFilter: 10},
    );

    // Clean up the watchId when the component unmounts
    return () => {
      Geolocation.clearWatch(watchId);
    };
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
  const GetStop = () => {
    console.log('Shop');
    const options = {
      method: 'GET',
      url: `https://stsu.herokuapp.com/Admin/Get_stops`,
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

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        // setCurrentLocation({ latitude, longitude });
        // console.log('hi ', latitude, longitude);

        UpdatedLocation(latitude, longitude);
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
      url: `https://stsu.herokuapp.com/User/update_Student_location`,
      data: {
        email: student_email,
        latitude: v1,
        longitude: v2,
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
      url: `https://stsu.herokuapp.com/User/bas_current_location?email=${driver_email}`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        setcoordinates(response.data.message[0].destination);
        if (
          response.data.message[0].destination[0].latitude >=
            response.data.message[0].destination[0].latitude &&
          response.data.message[0].destination[0].latitude <=
            response.data.message[0].destination[0].latitude + 100
        ) {
          console.log(response.data.message[0].destination[0].latitude);
          loadFlagValue();
        }
        // console.log("Hi hassam ",JSON.stringify(response.data));
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
      url: `https://stsu.herokuapp.com/User/all_Student_location`,
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
  // setTimeout(() => {
  //   console.log('hello');
  //   GetData();
  // }, 8000);
  const toggleFlag2 = async val => {
    console.log(val+"  JSon");
    try {
      await AsyncStorage.setItem('flag', JSON.stringify(val));
    } catch (error) {
      console.error('Error toggling flag2 value:', error);
    }
  };
  const Dispach = () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://stsu.herokuapp.com/Admin/Dispatch?email=${driver_email}`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const Arival = () => {
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `http://stsu.herokuapp.com/Admin/Update_Arival?email=${driver_email}`,
      headers: {},
    };

    axios
      .request(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
      })
      .catch(error => {
        console.log(error);
      });
  };
  const loadFlagValue = async () => {
    console.log("Load Value");
    try {
      const value = await AsyncStorage.getItem('flag');
      console.log("Value Trtue", value);

      if (value == 'true') {
        // settextdata("Arival TIme");
        console.log("Arival");
        Arival();
        toggleFlag2(false);
        // setIsFlagSet(JSON.parse(value));
      } else {
        // settextdata("Despacture");
        Dispach();

        setTimeout(() => {
          toggleFlag2(true);
        }, 120000);
      }
    } catch (error) {
      console.error('Error loading flag value:', error);
    }
  };
  useEffect(() => {
    GetData();
    GetStop();
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      GetData();
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
          <View
            style={{
              position: 'absolute',
              right: 0,
              width: '20%',
              height: 40,
              borderRadius: 10,
              top: 10,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
              zIndex: 1,
            }}>
            <Text
              style={{
                fontSize: 16,
                color: '#000000',
              }}>
              {Speed}
            </Text>
          </View>

          <MapView
            initialRegion={{
              latitude: coordinates[1].latitude,
              longitude: coordinates[1].longitude,
              latitudeDelta: LATITUDE_DELTA,
              longitudeDelta: LONGITUDE_DELTA,
            }}
            style={StyleSheet.absoluteFill}
            // transform={[{ rotate: '180deg' }, { scale: 1.2 }]}
            // rotate={190}
            ref={mapViewRef}
            // zoomEnabled={false}
            maxZoomLevel={100}>
            {coordinates.length > 0 && (
              <MapViewDirections
                origin={coordinates[0]}
                destination={coordinates[1]}
                waypoints={
                  coordinates.length > 2 ? coordinates.slice(1) : undefined
                }
                resetOnChange={false} // Disable resetting on coordinate changes
                // directionsServiceBaseUrl={`https://maps.googleapis.com/maps/api/directions/json?heading=${YOUR_CUSTOM_HEADING}&`}
                apikey={GOOGLE_MAPS_APIKEY}
                strokeWidth={3}
                strokeColor="blue"
                transitOptions
                // optimizeWaypoints={true}
                onStart={params => {
                  // console.log(
                  //   `Started routing between "${params.origin}" and "${params.destination}"`,
                  // );
                }}
                onReady={result => {
                  console.log(`Speed: ${result.fares}`);
                  console.log(`Distance: ${result.distance} km`);

                  // if (speed >= 30 ) {
                  // console.log(speed, "MeterPerSecond");
                  // SpeedUpload(speed)
                  // } else{
                  // null;
                  // }
                  // console.log(`Duration: ${result.duration} min.`);
                  mapViewRef.current.fitToCoordinates(result.coordinates, {
                    edgePadding: {
                      right: width / 20,
                      bottom: height / 20,
                      left: width / 20,
                      top: height / 20,
                      //               top: 100, // Adjust this value to position the origin location at the top
                      // bottom: 200, // Adjust this value to position the destination location at the bottom
                      // left: 150,
                      // right: 150,
                      // route:10
                    },
                  });
                }}
                onError={errorMessage => {
                  console.log('GOT AN ERROR');
                }}
              />
            )}
            <Marker
              key={`Initial `}
              coordinate={coordinates[0]}
              title={`Destination`}>
              <Image
                source={require('../assest/Bus.png')}
                style={{width: 40, height: 40}}
              />
            </Marker>

            <Marker
              key={`Destination`}
              coordinate={coordinates[1]}
              title={`Destination $`}
              pinColor="#FF0000"
            />
            {Stops.map((item, index) => (
              <Marker
                key={`Stop ${index}`}
                coordinate={Stops[index]}
                title={`Stop ${index + 1}`}
                pinColor="orange">
                <Image
                  source={require('../assest/Stops.png')}
                  style={{width: 40, height: 40}}
                />
              </Marker>
            ))}
            {/* {Student.map(index => ( */}
            {Student.map((item, index) => (
              <Marker
                key={`Destination${index}`}
                coordinate={Student[index]}
                title={`Student`}
                pinColor="green"
              />
            ))}
            {/* // ))} */}
          </MapView>
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
  map: {
    ...StyleSheet.absoluteFillObject,
    transform: [{rotate: '190deg'}],
  },
});

export default Example;
