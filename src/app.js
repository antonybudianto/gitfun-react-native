import React, { Component } from 'react';
import {
  Navigator,
  Text,
  StyleSheet,
  TouchableHighlight
} from 'react-native'

import GitFun from './git-fun/git-fun';

const styles = StyleSheet.create({
  leftNavButtonText: {
    padding: 10,
    color: 'white'
  },
  rightNavButtonText: {
    padding: 10,
    color: 'white'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
    color: 'white'
  }
});

const NavigationBarRouteMapper = {
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
    return <Text style={ styles.title }>{route.title || 'GitReact'}</Text>
  }
};

export default class App extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{component: GitFun}}
        navigationBar={
          <Navigator.NavigationBar
            style={{
              backgroundColor: 'skyblue'
            }}
            routeMapper={ NavigationBarRouteMapper } />
        }
        renderScene={(route, navigator) =>
          React.createElement(route.component,
            { ...this.props, ...route.passProps, route, navigator } )
      }/>
    );
  }
};
