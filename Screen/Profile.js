import { View, Text, Pressable,ImageBackground } from 'react-native'
import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile({navigation}) {
    const sessionnull = async () => {
        try {
          // const value = await AsyncStorage.setItem('userstatus', '');
          // if (value !== null) {
            // console.log(value);
            // setStoredUsername(JSON.parse(value).username);
            AsyncStorage.removeItem('userstatus');
            navigation.navigate("Login")
              
    
    
          // }
        } catch (error) {
          console.log('Error session null : ', error);
        }
      };
  return (
    <View
    style={{
        flex:1
    }}
    >
      <Text>Profile</Text>
      <View
          style={{
            height: 70,
            position: 'absolute',
            bottom: 0,
            width: '100%',
            backgroundColor: '#FFB800',
            justifyContent: 'space-around',
            alignItems: 'center',
            flexDirection: 'row',
            // alignSelf:"center"
          }}>
          <Pressable
            style={{
              alignItems: 'center',
            }}
            onPress={() => {
              // toggleModal();
              navigation.navigate("MainScreen")
            }}
            >


            <ImageBackground
              source={require('../assest/home.png')}
              style={{
                // marginTop: 5,
                width: 20,
                height: 20,
              }}></ImageBackground>
            <Text
              style={{
                color: '#000000',
                // backgroundColor:"#fff"
              }}>
              Home
            </Text>
          </Pressable>
          <Pressable
           onPress={() => {
            // toggleModal();
            navigation.navigate("Profile")

          }}
            style={{
              alignItems: 'center',
              // justifyContent:"center"
            }}>
            <ImageBackground
              source={require('../assest/user.png')}
              style={{
                // marginTop: 5,
                width: 20,
                height: 20,
              }}></ImageBackground>
            <Text>Profile</Text>
          </Pressable>
          <Pressable
           onPress={() => {
            // toggleModal();
            sessionnull()

          }}
            style={{
              alignItems: 'center',
            }}>
            <ImageBackground
              source={require('../assest/logout.png')}
              style={{
                // marginTop: 5,
                width: 20,
                height: 20,
              }}></ImageBackground>
            <Text>logout</Text>
          </Pressable>
        </View>
    </View>
  )
}