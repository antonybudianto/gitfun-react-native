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
    color: 'white',
    fontSize: 16
  },
  rightNavButtonText: {
    color: 'white',
    fontSize: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    marginTop: 5,
    color: 'white',
    textAlign: 'center',
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
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: 60,
            ...Platform.select({
              android: {
                marginTop: 20
              }
            })
          }}
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
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            width: 60,
            backgroundColor: 'pink',
            ...Platform.select({
              android: {
                marginTop: 40
              }
            })
          }}
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
      <Text style={[styles.title, ((navOptions && navOptions.titleStyle) || {})]}>
        {(navOptions && navOptions.title) || APP_NAVBAR_TITLE}
      </Text>
    );
  }
});

export default routeMapper;
