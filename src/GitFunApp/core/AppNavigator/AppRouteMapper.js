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
    marginTop: 5,
    paddingRight: 25,
    color: 'white',
    fontSize: 16,
    ...Platform.select({
      android: {
        paddingTop: 35
      }
    })
  },
  rightNavButtonText: {
    padding: 10,
    marginTop: 5,
    fontSize: 16,
    color: 'white'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    marginTop: 5,
    color: 'white',
    ...Platform.select({
      android: {
        paddingTop: 20
      }
    })
  }
});

const routeMapper = ({ screens }) => ({
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
    const { navOptions } = screens[route.screen].component;
    if (!navOptions) { return; }
    if (navOptions.rightNavButton) {
      return (
        <TouchableHighlight
          underlayColor="transparent"
          onPress={navOptions.rightNavButton.onPress}>
          <Text style={ styles.rightNavButtonText }>
            { navOptions.rightNavButton.text }
          </Text>
        </TouchableHighlight>
      );
    }
  },
  Title(route, navigator, index, navState) {
    const { navOptions } = screens[route.screen].component;
    return (
      <Text style={ styles.title }>
        {(navOptions && navOptions.title) || APP_NAVBAR_TITLE}
      </Text>
    );
  }
});

export default routeMapper;
