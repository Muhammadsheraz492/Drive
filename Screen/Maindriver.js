import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import React from 'react';
// import { TouchableOpacity } from 'react-native/types';

export default function Maindriver({navigation}) {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <Text
        style={{
          fontSize: 30,
          textAlign: 'center',
          marginTop: 20,
          color: '#000000',
          fontWeight: 'bold',
        }}>
        Welcome back!
      </Text>
      <View
        style={{
          height: 20,
        }}
      />
      <TouchableOpacity
        style={{
          width: '70%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: 52,
            backgroundColor: '#FFB800',
            borderRadius: 15,
            // justifyContent:"center",
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ImageBackground
            source={require('../assest/busroute.png')}
            style={{
              marginLeft: 20,
              width: 30,
              height: 30,
            }}></ImageBackground>
          <Text
            style={{
              fontSize: 20,
              color: '#fff',
              fontWeight: '800',
              marginLeft: 10,
            }}>
            Bus Route
          </Text>
        </View>
      </TouchableOpacity>
    
      <View
        style={{
          height: 20,
        }}
      />
      <TouchableOpacity
        style={{
          width: '70%',
          alignSelf: 'center',
        }}
        onPress={()=>{
            navigation.navigate("DriverNotification")
        }}
        >
        <View
          style={{
            width: '100%',
            height: 52,
            backgroundColor: '#FFB800',
            borderRadius: 15,
            // justifyContent:"center",
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ImageBackground
            source={require('../assest/Notification-(1).png')}
            style={{
              marginLeft: 20,
              width: 30,
              height: 30,
            }}></ImageBackground>
          <Text
            style={{
              fontSize: 20,
              color: '#fff',
              fontWeight: '800',
              marginLeft: 10,
            }}>
            Notification
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: 20,
        }}
      />
      <TouchableOpacity
        style={{
          width: '70%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            width: '100%',
            height: 52,
            backgroundColor: '#FF0000',
            borderRadius: 15,
            // justifyContent:"center",
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <ImageBackground
            source={require('../assest/Alert.png')}
            style={{
              marginLeft: 20,
              width: 30,
              height: 30,
            }}></ImageBackground>
          <Text
            style={{
              fontSize: 20,
              color: '#fff',
              fontWeight: '800',
              marginLeft: 10,
            }}>
            Alert
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
