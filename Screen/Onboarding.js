import React, {useEffect} from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Button from '../Components/Button';

export default function Onboarding({navigation}) {
  const Data = require('../Data.json');
  return (
    <ScrollView>
      <View
        style={{
          height: 800,
        }}>
        <ImageBackground
          source={require('../assest/Background.png')}
          style={{
            flex: 1,
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
              height: '20%',
            }}
          />
          <Text
            style={{
              fontSize: 15,
              color: '#fff',
              textAlign: 'center',
              marginHorizontal: 30,
            }}>
            Lorem ipsum is placeholder text commonly used in the graphic, print,
            and publishing industries for previewing layouts and visual mockups
          </Text>
          <View
            style={{
              height: '15%',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Button Text={'Sign In as Student'} />
          </TouchableOpacity>

          <View
            style={{
              height: 14,
            }}
          />
     
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DriverLogin")
            }}>
            <Button Text={'Sign In as Driver'} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    resizeMode: 'cover',
    flex: 1,
  },
});
