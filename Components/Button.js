import {View, Text} from 'react-native';
import React from 'react';

export default function Button(props) {
  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '90%',
          borderRadius: 10,
          height: 53,
          backgroundColor: '#FFB800',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            fontSize: 17,
            color: '#fff',
          }}>
          {props.Text}
        </Text>
      </View>
    </View>
  );
}
