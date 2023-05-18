import {
    View,
    Text,
    TextInput,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import Button from '../Components/Button';
  import {Dimensions} from 'react-native';
  export default function DriverLogin({navigation}) {
    const [username, setuserName] = React.useState();
    const [password, setPassword] = React.useState();
    return (
      <ScrollView>
        <View
          style={{
            height: Dimensions.get('window').height,
          }}>
          <StatusBar backgroundColor={'#FFB800'} />
  
          <ImageBackground
            source={require('../assest/DriverLogin.png')}
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
              height: 10,
            }}
          />
              <Text
              style={{
                // marginBottom: 10,
                color: '#6E6E6E',
                textAlign:"center",
                
                fontWeight:"bold",
                fontSize:19

              }}>
              Sign In with Driver 
            </Text>
  
          <View
            style={{
              height: 100,
            }}
          />
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                marginBottom: 10,
                color: '#6E6E6E',
              }}>
              Email Address
            </Text>
  
            <TextInput
              style={styles.input}
              onChangeText={username => setuserName(username)}
              placeholderTextColor="#969696"
              value={username}
              placeholder="Enter your email address"
              autocorrect={false}
              autoCapitalize="none"
            />
          </View>
          <View
            style={{
              height: 14,
            }}
          />
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                marginBottom: 10,
                color: '#6E6E6E',
              }}>
              Password
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={userPassword => setPassword(userPassword)}
              placeholderTextColor="#969696"
              value={password}
              secureTextEntry={true}
              placeholder="Enter your password"
              autocorrect={false}
              autoCapitalize="none"
            />
          </View>
          <View
            style={{
              height: '15%',
            }}
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('MainScreen');
            }}>
            <Button Text={'Log In'} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
  
  const styles = StyleSheet.create({
    input: {
      borderWidth: 1,
      borderColor: '#FFB800',
      borderRadius: 5,
      padding: 10,
      //   margin: 10,
  
      height: 53,
      width: '100%',
      color: '#000000',
    },
  });
  