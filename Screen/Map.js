import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import axios from 'axios';

export default function Map() {
  const [data, setdata] = React.useState();

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'http://192.168.100.10:3000/User/bas_current_location',
      params: {email: 'driver1@gmail.com'},
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data.message[0].destination[0]);
        setdata(response.data.message[0].destination);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);
  return( <View>


  </View>);
}
