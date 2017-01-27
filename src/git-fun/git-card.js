import React from 'react'
import {
  View,
  Text,
  Image,
} from 'react-native'

const GitCard = ({git}) => {
  return (
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
  )
}

GitCard.propTypes = {}
GitCard.defaultProps = {}

export default GitCard
