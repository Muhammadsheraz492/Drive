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
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';
import url from '../url.json';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useState} from 'react';
export default function MainScreen({navigation}) {
  const [loading, setLoading] = useState(true);
  const [search, setsearch] = React.useState();
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [data, setdata] = React.useState([]);

  const [storedUsername, setStoredUsername] = React.useState('');
  const [storedEmail, setStoredEmail] = React.useState('');
  const [originalData, setoriginalData] = useState([]);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('userstatus');
      if (value !== null) {
        setStoredUsername(JSON.parse(value).username);
        setStoredEmail(JSON.parse(value).Email);
      }
    } catch (error) {
      console.log('Error retrieving data: ', error);
    }
    setLoading(false);
  };
  const sessionnull = async () => {
    try {
      AsyncStorage.removeItem('userstatus');
      navigation.replace('Login');
    } catch (error) {
      console.log('Error session null : ', error);
    }
  };

  
  useEffect(() => {
    const options = {
      method: 'GET',
      url: `https://${url.baseurl}/User/routes`,
    };

    axios
      .request(options)
      .then(function (response) {
        setdata(response.data.message);
        setoriginalData(response.data.message);
        retrieveData();
        // console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  const searchFilter = text => {
    if (text) {
      const newdata = originalData.filter(item => {
        const itemdata = item.bas_route
          ? item.bas_route.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemdata.indexOf(textData) > -1;
      });
      setdata(newdata);
      setsearch(text);
    } else {
      setdata(originalData);
      setsearch(text);
    }
  };
  return (
    <View
      style={{
        backgroundColor: '#FFB800',
        flex: 1,
        // marginTop:"10%",
      }}>
      {loading ? (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <>
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
                Hi,{storedUsername}
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
                  onChangeText={text => searchFilter(text)}
                  placeholderTextColor="#969696"
                  value={search}
                  placeholder="Search your Route"
                  autocorrect={false}
                  autoCapitalize="none"
                />
              </View>
              <TouchableOpacity
                style={{
                  width: '15%',
                }}
                onPress={() => {
                  navigation.navigate('QRCodeGenerator', {
                    student_email: storedEmail,
                  });
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
                Total Buses: {data.length}
              </Text>
            </View>
            <View
            
            style={{
              height:"70%"
            }}
            >

            {data.length >= 1 ? (
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
                            navigation.navigate('Mapscreen', {
                              driver_email: item.driver_email,
                              student_email: storedEmail,
                            });
                            console.log(item);
                          }}>
                          <Text
                            style={{
                              fontSize: 18,
                              color: '#000000',
                            }}>
                            {item.bas_route}
                          </Text>
                          <Text
                            style={{
                              fontSize: 14,
                              color: '#000000',
                            }}>
                            Bus no: {item.bas_id}
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <TouchableOpacity
                        disabled={true}
                        onPress={() => {
                          // toggleModal();
                        }}>
                        <ImageBackground
                          source={require('../assest/schedule.png')}
                          style={{
                            width: 36,
                            height: 36,
                          }}></ImageBackground>
                       
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              />
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text>Today is no Bases on Routes</Text>
              </View>
            )}
            </View>

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
                  navigation.navigate('MainScreen');
                }}>
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
                  sessionnull();
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
                <Text
                  style={{
                    color: '#000000',
                    // backgroundColor:"#fff"
                  }}>
                  logout
                </Text>
              </Pressable>
            </View>
          </View>
        </>
      )}
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
