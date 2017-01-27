import React, { Component } from 'react';
import { Navigator } from 'react-native'

import * as _ from 'lodash';

import MyScene from './myscene';

export default class FlexDimensionsBasics extends Component {
  render() {
    return (
      <Navigator initialRoute={{component: MyScene}}
        renderScene={(route, navigator) =>
          React.createElement(route.component,
            { ...this.props, ...route.passProps, route, navigator } )
      }/>
    );
  }
};
