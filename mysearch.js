import React from 'react'
import { View, TextInput, Text } from 'react-native'

const Mysearch = ({onSubmitEditing}) => {
  return (
    <View style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        backgroundColor: 'white'
      }}>
      <TextInput
        onSubmitEditing={onSubmitEditing}
        placeholder="Search by username"
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

Mysearch.propTypes = {}
Mysearch.defaultProps = {}

export default Mysearch