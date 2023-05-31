import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
// import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import url from '../url.json';
export default function QRCodeGenerator({navigation, route}) {
  const [scannedData, setScannedData] = React.useState('');
  const {student_email} = route.params;

  const [storedemailQr, setstoredemailQr] = React.useState('');
  const onBarcodeRead = e => {
    setScannedData(e.data);
  };
  const Verify = val => {
    const options = {
      method: 'GET',
      url: `https://stsu.herokuapp.com/User/verify_student`,
      params: {email: val},
    };

    axios
      .request(options)
      .then(function (response) {
        if (response.data.status) {
          alert('User Are Verifed');
        } else {
          alert('User Not Existed');
        }
      })
      .catch(function (error) {
        console.error(error);
        alert('User Not Existed');
      });
  };
  return (
    <View
      style={{
        backgroundColor: '#FFB800',
        flex: 1,
        // marginTop:"10%",
      }}>
      <StatusBar backgroundColor={'#FFB800'} />
      <View
        style={{
          backgroundColor: '#fff',
          // flex:1,
          height: '100%',
          width: '100%',
          borderTopLeftRadius: 40,
          borderTopRightRadius: 40,
        }}>
        <View
          style={{
            width: '90%',
            marginTop: 25,
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <ImageBackground
              source={require('../assest/back.png')}
              style={{
                width: 30,
                height: 30,
                marginLeft: 10,
              }}></ImageBackground>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 19,
              color: '#000000',
              alignSelf: 'center',
              marginLeft: '25%',
              textAlign: 'center',
              // textAlign:"center"
            }}>
            Scan QR Code For Authentication
          </Text>
        </View>
        <View>
          <QRCodeScanner
            onRead={({data}) => Verify(data)}
            reactivate={true}
            reactivateTimeout={500}
            showMarker={true}
            topContent={<View></View>}
          />
          <View
            style={{
              height: 60,
            }}
          />
          <View
            style={{
              alignSelf: 'center',
            }}>
            {/* <QRCode
      value={student_email}
      // logo={logoFromFile}
      size={200}
    /> */}
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  zeroContainer: {
    height: 0,
    flex: 0,
  },
  scannedData: {
    alignSelf: 'center',
    marginTop: 20,
    fontSize: 16,
  },
});
