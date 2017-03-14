import React from 'react'
import { View, TextInput, Text } from 'react-native'

const GitSearch = ({onSubmitEditing, onChangeText, placeholder}) => {
  return (
    <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white'
      }}>
      <TextInput
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        style={{
          flex: 1,
          marginLeft: 5,
          height: 40
        }}
        >
      </TextInput>
    </View>
  )
}

GitSearch.propTypes = {}
GitSearch.defaultProps = {}

export default GitSearch