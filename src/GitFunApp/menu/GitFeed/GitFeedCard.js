import React from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

const GitFeedCard = ({ feed }) =>
  <View style={{
    padding: 14,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  }}>
    <Image style={{
      width: 20,
      height: 20
    }} resizeMode={'contain'} source={{uri: feed.repository.owner.avatar_url}} />
    <View style={{
      flex: 1,
      marginLeft: 5
    }}>
      <Text style={{
        fontWeight: 'bold'
      }}>{feed.subject.title}</Text>
      <Text style={{
        fontSize: 10
      }}>{feed.subject.type} #{feed.subject.url.substring(feed.subject.url.lastIndexOf('/') + 1)}</Text>
      <Text style={{
        fontSize: 10,
        color: 'gray'
      }}>{feed.repository.full_name}</Text>
    </View>
  </View>

export default GitFeedCard;
