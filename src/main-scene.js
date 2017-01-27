import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';

import GitFun from './git-fun/git-fun';

class MainScene extends Component {

  constructor(props) {
    super(props);
  }

  onForward() {
    this.props.navigator.push({
      component: GitFun
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
            paddingTop: 20,
            backgroundColor: 'skyblue',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}>
          <TouchableHighlight onPress={this.onForward.bind(this)}>
            <Text style={{
              padding: 15
            }}>Next</Text>
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

MainScene.propTypes = {}
MainScene.defaultProps = {}

export default MainScene
