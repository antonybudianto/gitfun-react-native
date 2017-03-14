import React from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  StyleSheet
} from 'react-native';

const GitMenu = ({name, onPress}) =>
  <TouchableHighlight style={styles.menu} underlayColor="orange" onPress={onPress}>
    <Text>{name}</Text>
  </TouchableHighlight>

const styles = StyleSheet.create({
  menu: {
    padding: 20,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  }
});

export default GitMenu;
