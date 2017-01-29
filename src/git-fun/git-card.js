import React from 'react'
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native'

const GitCard = ({git, onPress}) =>
  <TouchableHighlight underlayColor={'orange'} onPress={onPress}>
    <View style={{
        padding: 5,
        flex: 1,
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

GitCard.propTypes = {}
GitCard.defaultProps = {}

export default GitCard
