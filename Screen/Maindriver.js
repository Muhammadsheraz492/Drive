import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Alert,
  Modal,
  StyleSheet,
  ActivityIndicator,
  
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import { TouchableOpacity } from 'react-native/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import  axios from 'axios';

export default function Maindriver({navigation}) {
  const [storedUsername, setStoredUsername] = React.useState('');
  const [storedEmail, setStoredEmail] = React.useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
const Emergency =()=>{
  openModal();
  
  let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: `https://stsu.herokuapp.com/Admin/Emergency?email=${storedEmail}`,
    headers: { }
  };
  
  axios.request(config)
  .then((response) => {
    console.log(JSON.stringify(response.data));
    closeModal()
    Alert.alert("STS",response.data.message)
  })
  .catch((error) => {
    console.log(error);
    closeModal()

  });
}

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('driverstatus');
      if (value !== null) {
        // console.log(JSON.parse(value).username);
        setStoredUsername(JSON.parse(value).username);
        setStoredEmail(JSON.parse(value).Email);
      }
    } catch (error) {
      console.log('Error retrieving data: ', error);
    }
    // setLoading(false)
  };
  const sessionnull = async () => {
    try {
      AsyncStorage.removeItem('driverstatus');
      navigation.replace('DriverLogin');
    } catch (error) {
      console.log('Error session null : ', error);
    }
  };
  useEffect(() => {
    retrieveData();
  }, []);

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
      <Text
        style={{
          fontSize: 20,
          textAlign: 'center',
          marginTop: 20,
          color: '#000000',
          fontWeight: 'bold',
        }}>
        {storedUsername}
      </Text>
      <View
        style={{
          height: 20,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Drivermap', {
            driver_email: storedEmail,
          });
        }}
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
        onPress={() => {
          navigation.navigate('QRCodeGenerator', {
            driver_email: storedEmail,
          });
        }}
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
            Scan Qr
          </Text>
        </View>
      </TouchableOpacity>
      {/* <View
        style={{
          height: 20,
        }}
      />
      <TouchableOpacity
        style={{
          width: '70%',
          alignSelf: 'center',
        }}
        onPress={() => {
          navigation.navigate('DriverNotification');
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
      </TouchableOpacity> */}
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
        onPress={() => {
          Alert.alert('Confirmation', 'Are you sure you want to proceed?', [
            {
              text: 'Cancel',
              onPress: () => {
                // Logic for handling the cancel action
                console.log('Cancel button pressed');
              },
              style: 'cancel',
            },
            {
              text: 'Sure',
              onPress: () => {
                // Logic for handling the sure action
                Emergency()
                console.log('Sure button pressed');
              },
            },
          ]);
        }}>
        <Modal visible={modalVisible} animationType="slide" transparent={true}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.activityIndicatorContainer}>
              <ActivityIndicator size="large" color="blue" />


            </View>
          </View>
        </Modal>
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
      <View
        style={{
          height: 20,
        }}
      />
      <TouchableOpacity
        onPress={() => {
          // navigation.navigate('QRCodeGenerator', {
          //   driver_email: storedEmail,
          // });
        }}
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
            Return
          </Text>
        </View>
      </TouchableOpacity>
      <View
        style={{
          height: 20,
        }}
      />
      <TouchableOpacity
        onPress={sessionnull}
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
            source={require('../assest/logout-2.png')}
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
            Logout
          </Text>
        </View>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    ...StyleSheet.absoluteFill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },

  input: {
    // borderWidth: 1,
    borderColor: '#FFB800',
    borderRadius: 5,
    // padding: 10,
    //   margin: 10,

    // height: 53,
    height: 44,

    width: '93%',
    marginLeft: 5,
    color: '#000000',
  },
});
