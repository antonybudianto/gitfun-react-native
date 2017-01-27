import React from 'react'
import { View, TextInput, Text } from 'react-native'

const GitSearch = ({onSubmitEditing}) => {
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
        placeholder="Search by users or organizations"
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