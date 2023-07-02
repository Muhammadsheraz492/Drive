import { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker, Polyline } from 'react-native-maps';

const App = () => {
  const [initialRegion, setInitialRegion] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [directions, setDirections] = useState([]);

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        console.log("Position Updated");
        const { latitude, longitude } = position.coords;
        const region = {
          latitude,
          longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        setInitialRegion(region);
        calculateDirections(region);
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  const calculateDirections = async region => {
    const { latitude, longitude } = region;
    const destination = 'Lahore';

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${latitude},${longitude}&destination=${32.5551874},${74.0636833}&key=AIzaSyC-at3-WlccF6DEkDd3U0MEn9CUraQwqXw`
      );
      const data = await response.json();
      const decodedPoints = data.routes[0].overview_polyline.points;
      const coordinates = decodePolyline(decodedPoints);
      setDirections(coordinates);
      setDestinationLocation({
        latitude: data.routes[0].legs[0].end_location.lat,
        longitude: data.routes[0].legs[0].end_location.lng,
      });
    } catch (error) {
      console.log('Error calculating directions:', error);
    }
  };

  const decodePolyline = polyline => {
    const points = [];
    let index = 0,
      lat = 0,
      lng = 0;

    while (index < polyline.length) {
      let b,
        shift = 0,
        result = 0;

      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlat = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lat += dlat;

      shift = 0;
      result = 0;

      do {
        b = polyline.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);

      const dlng = (result & 1) !== 0 ? ~(result >> 1) : result >> 1;
      lng += dlng;

      const point = {
        latitude: lat / 1e5,
        longitude: lng / 1e5,
      };

      points.push(point);
    }

    return points;
  };

  return (
    <MapView style={{ flex: 1 }} initialRegion={initialRegion} zoomEnabled={true} minZoomLevel={1} maxZoomLevel={100}>
      {initialRegion && <Marker coordinate={initialRegion} />}
      {destinationLocation && <Marker coordinate={destinationLocation} />}
      {directions.length > 0 && (
        <Polyline coordinates={directions} strokeWidth={3} strokeColor="blue" />
      )}
    </MapView>
  );
};

export default App;
