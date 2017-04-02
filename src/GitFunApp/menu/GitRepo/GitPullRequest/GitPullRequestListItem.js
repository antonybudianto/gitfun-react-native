import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  Image
} from 'react-native';

const GitPullRequestListItem = ({pullRequest, onPress}) =>
  <TouchableHighlight
    style={{
      flex: 1,
      borderBottomColor: 'lightgray',
      borderBottomWidth: 1
    }}
    underlayColor="orange" onPress={onPress}>
    <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5,
        marginBottom: 10
        }} key={pullRequest.id}>
        <View style={{
            flex:1,
            flexDirection: 'row',
            alignItems: 'flex-start'
        }}>
            <Image style={{
              width: 30,
              height: 30,
              padding: 5
            }}
            resizeMode="contain"
            source={{uri: pullRequest.user.avatar_url}} />
            <View style={{
              flex: 1,
              marginLeft: 10
            }}>
              <Text style={{fontWeight: 'bold'}}>#{pullRequest.number}: {pullRequest.title}</Text>
              <Text style={{
                fontSize: 10
              }}>{pullRequest.base.repo.full_name}</Text>
              <Text style={{
                fontSize: 10
              }}>State: {pullRequest.state}</Text>
              <Text style={{
                fontSize: 10
              }}>{pullRequest.milestone && pullRequest.milestone.title}</Text>
              <Text style={{
                fontSize: 10,
                marginTop: 5,
                color: 'gray'
              }}>{pullRequest.body}</Text>
            </View>

        </View>
    </View>
  </TouchableHighlight>

GitPullRequestListItem.propTypes = {}
GitPullRequestListItem.defaultProps = {}

export default GitPullRequestListItem;
