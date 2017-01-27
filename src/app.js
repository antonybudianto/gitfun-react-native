import React, { Component } from 'react';
import { Navigator } from 'react-native'

import * as _ from 'lodash';

import MainScene from './main-scene';

export default class FlexDimensionsBasics extends Component {
  render() {
    return (
      <Navigator initialRoute={{component: MainScene}}
        renderScene={(route, navigator) =>
          React.createElement(route.component,
            { ...this.props, ...route.passProps, route, navigator } )
      }/>
    );
  }
};
