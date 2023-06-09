import React, {useState, useEffect} from 'react';
import {Platform, Text, View} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import BackgroundGeolocation from 'react-native-background-geolocation';
import axios from 'axios';
import url from './url.json';
import App from './Ap';
import {LogBox} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
const MyComponent = () => {
  const [location, setLocation] = useState(null);
  //  const UpdateData=()=
  const retrieveDatadriver = async (val1, val2) => {
    try {
      const value = await AsyncStorage.getItem('driverstatus');
      if (value != null) {
        // console.log(JSON.parse(value).Email);
        const options = {
          method: 'POST',
          url: `https://stsu.herokuapp.com/User/update_location`,
          data: {
            email: JSON.parse(value).Email,
            latitude: val1,
            longitude: val2,
          },
        };
        axios
          .request(options)
          .then(function (response) {
            // console.log(response.data);
          })
          .catch(function (error) {
            console.error(error);
          });
        // console.log(value);
        // setStoredUsername(value);
        // setinitialRouteName("Maindriver")
        // console.log(JSON.parse(value));
        // setIsLoading(false)
      } else {
        console.log('NUll');
        // setinitialdriverName("Onboarding")
        //  setIsLoading(false)
      }
    } catch (error) {
      console.log('Error retrieving data: ', error);
      // setIsLoading(false)
    }
  };
  useEffect(() => {
    if (Platform.OS === 'android') {
      BackgroundGeolocation.configure({
        desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
        stationaryRadius: 50,
        distanceFilter: 50,
        notificationTitle: 'Background tracking',
        notificationText: 'enabled',
        startOnBoot: false,
        stopOnTerminate: true,
        locationProvider: BackgroundGeolocation.DISTANCE_FILTER_PROVIDER,
        interval: 3000, // Update location every 3 seconds
        fastestInterval: 3000, // Request location updates every 3 seconds
        activitiesInterval: 3000, // Update activities every 3 seconds
        stopOnStillActivity: false,
      });
    }

    // Geolocation.requestAuthorization();

    const locationWatchId = Geolocation.watchPosition(
      position => {
        // console.log(position);
        if (position != null) {
          retrieveDatadriver(
            position.coords.latitude,
            position.coords.longitude,
          );
        }
        setLocation(position);
      },
      error => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 0,
        interval: 3000,
        fastestInterval: 3000,
      },
    );

    return () => {
      Geolocation.clearWatch(locationWatchId);
    };
  }, []);

  useEffect(() => {
    BackgroundGeolocation.on('location', location => {
      // console.log(location);
      if (position != null) {
        retrieveDatadriver(position.coords.latitude, position.coords.longitude);
      }

      setLocation(location);
    });

    return () => {
      BackgroundGeolocation.removeListeners();
    };
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
    LogBox.ignoreAllLogs();
    BackgroundGeolocation.start();

    return () => {
      BackgroundGeolocation.stop();
    };
  }, []);

  return <App />;
};

export default MyComponent;
