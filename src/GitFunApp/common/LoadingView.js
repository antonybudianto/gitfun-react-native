import React from 'react';
import {
    View,
    Text
} from 'react-native';

const LoadingView = ({text}) =>
    <View style={{
        padding: 10,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'skyblue'
        }}>
        <Text style={{
            color: 'white',
            fontSize: 20
        }}>{ text || 'Loading...' }</Text>
    </View>

export default LoadingView;
