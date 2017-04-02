import React from 'react';
import {
    View,
    Text
} from 'react-native';

const LoadingView = ({text, fontSize = 20}) =>
  <View style={{
    padding: 10,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'skyblue'
    }}>
    <Text style={{
        fontSize,
        color: 'white',
        textAlign: 'center'
    }}>{ text || 'Loading...' }</Text>
  </View>

export default LoadingView;
