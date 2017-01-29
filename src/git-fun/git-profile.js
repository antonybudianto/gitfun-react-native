import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';

const GitProfile = ({profile, back}) =>
  <View style={{
    flex: 1
  }}>
    <View style={{
        flex: 0,
        height: 70,
        paddingTop: 20,
        backgroundColor: 'orange',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}>
      <TouchableHighlight underlayColor={'coral'} onPress={back}>
        <Text style={{
          padding: 15
        }}>Back</Text>
      </TouchableHighlight>
    </View>
    <View style={{
      flex: 1,
      padding: 10
    }}>
      <Image
          style={{
          width: 80,
          height: 50,
          }}
          resizeMode={"contain"}
          source={{uri: profile['avatar_url']}}
      />
      <Text>{profile.login}</Text>
    </View>
  </View>

GitProfile.propTypes = {}
GitProfile.defaultProps = {}

export default GitProfile;
