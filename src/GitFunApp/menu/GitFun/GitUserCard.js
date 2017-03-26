import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native'

const GitUserCard = ({git, onPress}) =>
  <TouchableHighlight underlayColor={'orange'} onPress={onPress}>
    <View style={{
        flex: 1,
        margin: 5,
        flexDirection: 'row',
        alignItems: 'center'
      }}>
      <Image
        style={{
        width: 80,
        height: 50,
        }}
        resizeMode={"contain"}
        source={{uri: git['avatar_url']}}
      />
      <Text>{git.login}</Text>
    </View>
  </TouchableHighlight>

GitUserCard.propTypes = {}
GitUserCard.defaultProps = {}

export default GitUserCard
