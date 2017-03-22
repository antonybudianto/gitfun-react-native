import React from 'react';
import {
  TouchableHighlight,
  Text,
  Platform,
  StyleSheet
} from 'react-native';

const APP_NAVBAR_TITLE = 'GitFun';
const styles = StyleSheet.create({
  leftNavButtonText: {
    padding: 10,
    color: 'white',
    ...Platform.select({
      android: {
        paddingTop: 35
      }
    })
  },
  rightNavButtonText: {
    padding: 10,
    color: 'white'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    color: 'white',
    ...Platform.select({
      android: {
        paddingTop: 20
      }
    })
  }
});

const AppNavigationBarRouteMapper = {
  LeftButton(route, navigator, index, navState) {
    if (index > 0) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={() => { if (index > 0) { navigator.pop() } }}>
          <Text style={ styles.leftNavButtonText }>Back</Text>
        </TouchableHighlight>)
    }
    else { return null }
  },
  RightButton(route, navigator, index, navState) {
    if (route.rightNavButton) return (
      <TouchableHighlight
         underlayColor="transparent"
         onPress={ () => route.rightNavButton.onPress() }>
         <Text style={ styles.rightNavButtonText }>
              { route.rightNavButton.text }
         </Text>
       </TouchableHighlight>)
  },
  Title(route, navigator, index, navState) {
    return <Text style={ styles.title }>{route.title || APP_NAVBAR_TITLE}</Text>
  }
};

export default AppNavigationBarRouteMapper;
