import React, { useState, useEffect } from 'react';
import { Platform, Text, View } from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import BackgroundGeolocation from 'react-native-background-geolocation';
const MyComponent = () => {
  const [location, setLocation] = useState(null);

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
        interval: 10000,
        fastestInterval: 5000,
        activitiesInterval: 10000,
        stopOnStillActivity: false,
      });
    }

    Geolocation.requestAuthorization();

    const locationWatchId = Geolocation.watchPosition(
      (position) => {
      console.log(location);

        setLocation(position);
      },
      (error) => {
        console.log(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
        distanceFilter: 10,
        interval: 10000,
        fastestInterval: 5000,
      }
    );

    return () => {
      Geolocation.clearWatch(locationWatchId);
    };
  }, []);

  useEffect(() => {
    BackgroundGeolocation.on('location', (location) => {
      console.log(location);
      setLocation(location);
    });

    return () => {
      BackgroundGeolocation.removeListeners();
    };
  }, []);

  useEffect(() => {
    BackgroundGeolocation.start();

    return () => {
      BackgroundGeolocation.stop();
    };
  }, []);

  return (
    <>
    <View>
      <Text>Latitude: {location?.coords.latitude}</Text>
      <Text>Longitude: {location?.coords.longitude}</Text>
    </View>
  
    </>

  );
};

export default MyComponent;
