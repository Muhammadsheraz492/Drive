import {
  View,
  Text,
  TextInput,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  ActivityIndicator,
  LogBox,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Button from '../Components/Button';
import messaging from '@react-native-firebase/messaging';
import url from '../url.json';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {json} from 'stream/consumers';

export default function Login({navigation}) {
  const [username, setuserName] = React.useState();
  const [password, setPassword] = React.useState();
  const [isLoading, setIsLoading] = React.useState(false);
  const [FcmToken, setFcmToken] = React.useState();
  const [storedUsername, setStoredUsername] = useState('');

  useEffect(() => {
    retrieveData();
  }, []);

  const storeData = async (value, email) => {
    // console.log(email);
    const data = {
      status: true,
      username: value,
      Email: email,
    };
    try {
      AsyncStorage.setItem('userstatus', JSON.stringify(data))
        .then(() => {
          navigation.navigate('MainScreen');
          console.log('Data stored successfully');
          // AsyncStorage.removeItem('userstatus');
          // AsyncStorage.setItem('userstatus', '');
        })
        .catch(err => {
          console.log(err);
        });
    } catch (error) {
      console.log('Error storing data: ', error);
    }
  };

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      if (value !== null) {
        setStoredUsername(value);
      }
    } catch (error) {
      console.log('Error retrieving data: ', error);
    }
  };

  const handleLogin = () => {
    if (username.trim() !== '') {
      storeData('username', username);
      setStoredUsername(username);
    }
  };
  LogBox.ignoreAllLogs();

  const generateFCMToken = async () => {
    try {
      messaging()
        .requestPermission()
        .then(() => {
          return messaging().getToken();
        })
        .then(token => {
          setFcmToken(token);
          console.log(token);
        })
        .catch(error => {
          console.log('Error getting FCM token:', error);
        });
      // Handle the token as needed (e.g., send it to your server)
    } catch (error) {
      console.error('Error generating FCM token:', error);
    }
  };

  useEffect(() => {
    generateFCMToken();
  }, []);
  const GetData = () => {
    const options = {
      method: 'POST',
      url: `http://${url.baseurl}:3000/User/login`,
      data: {
        email: username,
        password: password,
        device_token: FcmToken,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        // console.log(response.data);
        if (response.data.status == true) {
          // console.log(response.data);
          storeData(response.data.username, response.data.email);
        } else {
          alert('Username and password wrong!');
        }
      })
      .catch(function (error) {
        // console.error(error);
        if (error.response) {
          alert(error.response.data.message);
        }
      });
  };
  const toggleLoading = () => {
    setIsLoading(!isLoading);
  };
  return (
    <ScrollView>
      <View
        style={{
          height: 800,
        }}>
        <StatusBar backgroundColor={'#FFB800'} />

        <ImageBackground
          source={require('../assest/LOGO.png')}
          style={{
            width: 164,
            marginTop: '20%',
            height: 164,
            alignSelf: 'center',
            // justifyContent:"center"
            // alignItems:"center"
          }}></ImageBackground>
        <View
          style={{
            height: '15%',
          }}
        />
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              marginBottom: 10,
              color: '#6E6E6E',
            }}>
            Email Address
          </Text>

          <TextInput
            style={styles.input}
            onChangeText={username => setuserName(username)}
            placeholderTextColor="#969696"
            value={username}
            placeholder="Enter your email address"
            autocorrect={false}
            autoCapitalize="none"
          />
        </View>
        <View
          style={{
            height: 14,
          }}
        />
        <View
          style={{
            width: '90%',
            alignSelf: 'center',
          }}>
          <Text
            style={{
              marginBottom: 10,
              color: '#6E6E6E',
            }}>
            Password
          </Text>
          <TextInput
            style={styles.input}
            onChangeText={userPassword => setPassword(userPassword)}
            placeholderTextColor="#969696"
            value={password}
            secureTextEntry={true}
            placeholder="Enter your password"
            autocorrect={false}
            autoCapitalize="none"
          />
        </View>
        <View
          style={{
            height: '15%',
          }}
        />
        <TouchableOpacity
          onPress={() => {
            GetData();

            setIsLoading(!isLoading);
          }}>
          <Button
            Text={
              !isLoading ? (
                <Text>Login</Text>
              ) : (
                <ActivityIndicator size={'small'} />
              )
            }
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#FFB800',
    borderRadius: 5,
    padding: 10,
    //   margin: 10,

    height: 53,
    width: '100%',
    color: '#000000',
  },
});
