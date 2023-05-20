// In App.js in a new project

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from './Screen/Onboarding';
import Login from './Screen/Login';
import MainScreen from './Screen/MainScreen';
import QRCode from './Screen/QRCode';
import Notification from './Screen/Notification';
import Map from './Screen/Map';
import React, {useState, useEffect} from 'react';
import {Platform, Text, View, ActivityIndicator} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import BackgroundGeolocation from 'react-native-background-geolocation';
import DriverLogin from './Screen/DriverLogin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Profile from './Screen/Profile';
const Stack = createNativeStackNavigator();
function App() {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [initialRouteName, setinitialRouteName] = useState("");
  // let initialRouteName="";
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userstatus');
      if (value != null) {
        // console.log();
        // setStoredUsername(value);
        setinitialRouteName("MainScreen")
        // console.log(JSON.parse(value));
        setIsLoading(false)
      }else{
        setinitialRouteName("Onboarding")
       setIsLoading(false)


      }
    } catch (error) {
      console.log('Error retrieving data: ', error);
      setIsLoading(false)

    }
  };
  useEffect(()=>{
    retrieveData();
  })

  

  return isLoading ? (
    <View  style={{flex:1,justifyContent:"center",alignItems:"center"}}>

<ActivityIndicator size={"large"}  />


    </View>
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Onboarding" component={Onboarding} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="QRCode" component={QRCode} />

        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="Map" component={Map} />
        <Stack.Screen name="DriverLogin" component={DriverLogin} />
        
        <Stack.Screen name="Profile" component={Profile} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;