import React, { Component } from 'react';
import {
  Platform,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';
import { Navigator } from 'react-native-deprecated-custom-components';

import routeMapper from './AppRouteMapper';

class AppNavigator extends Component {
  render() {
    const { initialRoute, screens } = this.props;

    return (
      <Navigator
        initialRoute={initialRoute}
        navigationBar={
          <Navigator.NavigationBar
            style={{
              backgroundColor: 'skyblue',
              paddingTop: 70
            }}
            routeMapper={ routeMapper({ screens }) } />
        }
        renderScene={(route, navigator) =>
          React.createElement(screens[route.screen].component,
            { ...route.passProps, route, navigator })
        }/>
    )
  }
}

export default AppNavigator;
