import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {RNCamera} from 'react-native-camera';
import QRCodeScanner from 'react-native-qrcode-scanner';

export default function QRCode({navigation}) {
  const [scannedData, setScannedData] = React.useState('');

  const onBarcodeRead = e => {
    setScannedData(e.data);
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
        <QRCodeScanner
          onRead={onBarcodeRead}
          cameraStyle={styles.camera}
          topViewStyle={styles.zeroContainer}
          bottomViewStyle={styles.zeroContainer}
        />
        <Text style={styles.scannedData}>{scannedData}</Text>
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
