import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import Mygitfun from './mygitfun';

class MyScene extends Component {

  constructor(props) {
    super(props);
  }

  onForward() {
    this.props.navigator.push({
      component: Mygitfun
    });
  }

  render() {
    return (
      <View style={{
          flex: 1
        }}>
        <View style={{
            flex: 0,
            height: 70,
            padding: 10,
            paddingTop: 40,
            backgroundColor: 'skyblue',
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}>
          <TouchableHighlight onPress={this.onForward.bind(this)}>
            <Text>Next</Text>
          </TouchableHighlight>
        </View>
        <View style={{
            flex: 1,
            padding: 20
          }}>
          <Text>Welcome to GitFun!</Text>
          <Text>Touch "Next" to get started!</Text>
        </View>
      </View>
    )
  }

}

MyScene.propTypes = {}
MyScene.defaultProps = {}

export default MyScene
