import React, {useState, useEffect} from 'react';
import {Platform, Text, View} from 'react-native';
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
        interval: 3000, // Update location every 3 seconds
        fastestInterval: 3000, // Request location updates every 3 seconds
        activitiesInterval: 3000, // Update activities every 3 seconds
        stopOnStillActivity: false,
      });
    }

    // Geolocation.requestAuthorization();

    const locationWatchId = Geolocation.watchPosition(
      position => {
        console.log(position);
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
    <View>
      <Text>Latitude: {location?.coords.latitude}</Text>
      <Text>Longitude: {location?.coords.longitude}</Text>
    </View>
  );
};

export default MyComponent;
