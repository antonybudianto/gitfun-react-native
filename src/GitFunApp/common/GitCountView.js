import React from 'react';
import {
  View,
  Text
} from 'react-native';

const GitCountView = ({count, label}) =>
  <View style={{
    flex: 1
  }}>
    <Text style={{
      fontWeight: 'bold',
      fontSize: 18,
      color: 'white',
      textAlign: 'center'
    }}>{ (count >= 1000 ? (count / 1000).toFixed(1) + 'k' : count) }</Text>
    <Text style={{
      fontSize: 11,
      color: 'white',
      textAlign: 'center'
    }}>{label}</Text>
  </View>

export default GitCountView;
