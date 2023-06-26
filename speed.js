import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';
export default function speed() {
  const [Speed,SetSpeed]=useState("")
    useEffect(() => {
        // Request location permission if needed
        Geolocation.requestAuthorization('whenInUse');
        
        // Start listening for location updates
        const watchId = Geolocation.watchPosition(
          (position) => {
            // Check if the position has speed information
            if (position.coords.speed !== null) {
              const speed = position.coords.speed;
              console.log("Current speed: " + speed + " meters per second");
              SetSpeed(speed);
            } else {
              console.log("Speed information is not available.");
            }
          },
          (error) => {
            console.log("Error getting location: " + error.message);
          },
          { enableHighAccuracy: true, distanceFilter: 10 }
        );
    
        // Clean up the watchId when the component unmounts
        return () => {
          Geolocation.clearWatch(watchId);
        };
      }, []);
  return (
    <View>
      <Text>speed</Text>
      <Text>{Speed}</Text>
    </View>
  )
}