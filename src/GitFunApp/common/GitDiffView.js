import React from 'react';
import {
  View,
  Text
} from 'react-native';

const symbolMap = {
  '+': '#eaffea',
  '-': '#ffecec',
  '@': 'lightgray'
};

const GitDiffView = ({diff, fontSize = 12}) => {
  const segments = diff.split(/\n/);
  return (
    <View style={{
      borderColor: 'lightgray',
      borderWidth: 1
    }}>
      {
        segments.map((seg, index) =>
          <Text style={{
            fontSize,
            backgroundColor: symbolMap[seg[0]] || 'white'
          }} key={index}>{seg}</Text>
        )
      }
    </View>
  );
}

export default GitDiffView;
