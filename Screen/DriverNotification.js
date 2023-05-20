import {
    View,
    Text,
    StatusBar,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    FlatList,
  } from 'react-native';
  import React from 'react';
  
  export default function DriverNotification({navigation}) {
    const data = [
      {
        Notification:
          'Lorem ipsum is placeholderefwrg text commonly used kidwhihe',
        time: '2 hours ago',
      },
      {
        Notification:
          'Lorem ipsum is placeholderefwrg text commonly used kidwhihe',
        time: '2 hours ago',
      },
      {
        Notification:
          'Lorem ipsum is placeholderefwrg text commonly used kidwhihe',
        time: '2 hours ago',
      },
      {
        Notification:
          'Lorem ipsum is placeholderefwrg text commonly used kidwhihe',
        time: '2 hours ago',
      },
    ];
  
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
                marginLeft: '30%',
                textAlign: 'center',
              }}>
              Notification
            </Text>
          </View>
          <FlatList
            data={data}
            renderItem={({item}) => (
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    // textAlign:"center"
                    marginTop: 20,
                    paddingHorizontal: 20,
                  }}>
                  {item.Notification}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: '#FFB800',
                    paddingHorizontal: 20,
                  }}>
                  {item.time}
                </Text>
                <View
                  style={{
                    borderBottomWidth: 1,
                    borderBottomColor: '#EEEEEE',
                    marginTop: 10,
                  }}
                />
              </View>
            )}
          />
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
  