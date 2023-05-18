import {
  View,
  Text,
  StatusBar,
  StyleSheet,
  TextInput,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  Animated,
  Modal,
  Button,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';

export default function Map({navigation}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [sec, setSec] = React.useState();
  const [search, setsearch] = React.useState();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const route = useRoute();

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
            alignSelf: 'center',
            marginTop: 25,
            justifyContent: 'space-between',
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
              fontWeight: 'bold',
              color: '#000000',
            }}>
            Bus Location
          </Text>
          <TouchableOpacity
            style={
              {
                // width: '15%',
              }
            }
            onPress={() => {
              navigation.navigate('Notification');
            }}>
            <ImageBackground
              source={require('../assest/Notification.png')}
              style={{
                width: 23,
                height: 23,
              }}></ImageBackground>
          </TouchableOpacity>
        </View>

        <View
          style={{
            width: '90%',
            alignSelf: 'center',
            marginTop: 15,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 15,
              color: '#000000',
            }}>
            Current location:
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#000000',
            }}>
            Gujrat
          </Text>
        </View>
        <View
          style={{
            width: '80%',
            height: 183,
            backgroundColor: '#fff',
            alignSelf: 'center',
            borderTopRightRadius: 22,
            borderTopLeftRadius: 22,
            position: 'absolute',
            bottom: 0,
            marginBottom: 20,
            elevation: 20, // this is the property responsible for the shadow effect
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              padding: 16,
              height: 231,
              width: '100%',
              borderRadius: 10,
            }}>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                // marginTop: 10,
                justifyContent: 'space-between',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 17,
                  color: '#000000',
                }}>
                Check Schedule of Bus
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                marginTop: 15,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000000',
                }}>
                Morning Timing:
              </Text>
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#000000',
                  borderStyle: 'dotted',
                  marginTop: 11,
                }}
              />
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  // marginTop: 25,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    marginTop: 11,
                  }}>
                  Arrival:{route.params.morning}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    marginTop: 11,
                  }}>
                  Departure:{route.params.morningto}
                </Text>
              </View>
            </View>
            <View
              style={{
                width: '100%',
                alignSelf: 'center',
                marginTop: 15,
              }}>
              <Text
                style={{
                  fontSize: 14,
                  color: '#000000',
                }}>
                Evening Timing:
              </Text>
              <View
                style={{
                  borderBottomWidth: 0.5,
                  borderBottomColor: '#000000',
                  borderStyle: 'dotted',
                  marginTop: 11,
                }}
              />
              <View
                style={{
                  width: '100%',
                  alignSelf: 'center',
                  // marginTop: 25,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    marginTop: 11,
                  }}>
                  Arrival:{route.params.evening}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    marginTop: 11,
                  }}>
                  Departure:{route.params.eveningto}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
