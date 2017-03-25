import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';

import GitMenu from '../../common/GitMenu';

class GitDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: null
    };
  }

  goToExplore() {
    this.props.navigator.push({
      screen: 'explorer'
    });
  }

  goToLogin() {
    this.props.navigator.push({
      screen: 'login'
    });
  }

  render() {
    return (
      <View style={{
        flex: 1,
        marginTop: 70,
        backgroundColor: 'skyblue'
      }}>
        <ScrollView style={{
          flex: 1,
          backgroundColor: 'white'
        }}>
          <GitMenu name="Search username" onPress={this.goToExplore.bind(this)} />
          {
              !this.props.loginData ? (
                <GitMenu name="Login to GitHub" onPress={this.goToLogin.bind(this)} />
              ) : (
                <GitMenu name="Logout" onPress={() => {}} />
              )
            }
        </ScrollView>
        <View style={{
          flex: 1,
          flexGrow: 2,
          justifyContent: 'center',
          backgroundColor: 'skyblue'
        }}>
          <Text style={{
            textAlign: 'center',
            color: 'white',
            fontSize: 18
          }}>Let's start by searching some users!</Text>
        </View>
      </View>
    );
  }
}

export default GitDashboard;
