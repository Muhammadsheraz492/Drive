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

export default function MainScreen({navigation}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [sec, setSec] = React.useState();
  const [search, setsearch] = React.useState();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const Modal1 = props => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left: 0,
              right: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
            }}></View>

          <View
            style={{
              backgroundColor: '#fff',
              padding: 16,
              height: 231,
              width: '85%',
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
              <TouchableOpacity onPress={toggleModal}>
                <ImageBackground
                  source={require('../assest/close.png')}
                  style={{
                    marginTop: 5,
                    width: 17,
                    height: 17,
                  }}></ImageBackground>
              </TouchableOpacity>
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
                  Arrival:{props.morning}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    marginTop: 11,
                  }}>
                  Departure:{props.morningto}
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
                  Arrival:{props.evening}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: '#000000',
                    marginTop: 11,
                  }}>
                  Departure:{props.eveningto}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  const data = [
    {
      routename: 'Route Name',
      Busno: '21',
      schedule: [
        {
          morningto: '7:00 AM',
          morning: '2:00 PM',
          eveningto: '12:00 PM',
          evening: '8:00 PM',
        },
      ],
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
            alignSelf: 'center',
            marginTop: 25,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: '#000000',
            }}>
            Hi,Username
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
            marginTop: 20,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <View
            style={{
              width: '84%',
              height: 44,
              backgroundColor: '#EEEEEE',
              borderRadius: 8,
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <ImageBackground
              source={require('../assest/search.png')}
              style={{
                width: 20,
                height: 20,
              }}></ImageBackground>

            <TextInput
              style={styles.input}
              onChangeText={search => setsearch(search)}
              placeholderTextColor="#969696"
              value={search}
              placeholder="Search your bus No/Route"
              autocorrect={false}
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity
            style={{
              width: '15%',
            }}
            onPress={() => {
              navigation.navigate('QRCode');
            }}>
            <View
              style={{
                marginLeft: '1%',
                height: 44,
                backgroundColor: '#FFB800',
                borderRadius: 8,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={require('../assest/qr-code.png')}
                style={{
                  width: 30,
                  height: 30,
                }}></ImageBackground>
            </View>
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
            List of Buses
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: '#000000',
            }}>
            Total Buses: 20
          </Text>
        </View>
        <FlatList
          data={data}
          renderItem={({item}) => (
            <View>
              <View
                style={{
                  margin: 4,
                  width: '90%',
                  height: 75,
                  borderRadius: 8,
                  backgroundColor: '#fff',
                  elevation: 5, // this is the property responsible for the shadow effect
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                  paddingHorizontal: 14,
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: 15,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                }}>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Map', {
                        morning: item.schedule.morning,
                        morningto: item.schedule.morningto,
                        evening: item.schedule.evening,
                        eveningto: item.schedule.eveningto,
                      });
                    }}>
                    <Text
                      style={{
                        fontSize: 18,
                        color: '#000000',
                      }}>
                      {item.routename}
                    </Text>
                    <Text
                      style={{
                        fontSize: 14,
                        color: '#000000',
                      }}>
                      Bus no: {item.Busno}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    toggleModal();
                  }}>
                  <ImageBackground
                    source={require('../assest/schedule.png')}
                    style={{
                      width: 36,
                      height: 36,
                    }}></ImageBackground>
                  <Modal1
                    morning={item.schedule.morning}
                    morningto={item.schedule.morningto}
                    evening={item.schedule.evening}
                    eveningto={item.schedule.eveningto}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
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
