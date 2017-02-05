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
            fontWeight: 'bold'
        }}>{ text || 'Loading...' }</Text>
    </View>

export default LoadingView;
