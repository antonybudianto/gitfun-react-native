import React, { Component } from 'react';
import {
  Platform,
  Navigator,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native';

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
