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
    }}>{count}</Text>
    <Text style={{
      color: 'white',
      textAlign: 'center'
    }}>{label}</Text>
  </View>

export default GitCountView;
