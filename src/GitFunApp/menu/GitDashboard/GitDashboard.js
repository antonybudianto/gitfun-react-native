import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView
} from 'react-native';

import GitMenu from '../../common/GitMenu';

class GitDashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      error: null,
      user: null
    };
  }

  componentDidMount() {
    if (this.props.loginData) {
      this.fetchUser();
    }
  }

  fetchUser() {
    this.setState({
      loading: true
    });
    const headers = new Headers();
    headers.append('Authorization', `token ${this.props.loginData.token}`);
    fetch(`https://api.github.com/user`, {
      headers,
      cache: 'no-store'
    })
    .then(res => res.json())
    .then(result => {
      this.setState({
        loading: false,
        user: result
      });
      console.log(JSON.stringify(result, null, 2));
    });
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
        {
          !this.state.user ? null : (
            <View style={{
              padding: 10,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Image style={{
                width: 60,
                height: 60,
                borderColor: 'white',
                borderWidth: 1,
                borderRadius: 10
              }} resizeMode={'contain'} source={{uri: this.state.user.avatar_url}} />
              <Text style={{
                color: 'white',
                fontWeight: 'bold',
                marginLeft: 10
              }}>Welcome, {this.state.user.login}</Text>
            </View>
          )
        }
        <ScrollView style={{
          flex: 1,
          backgroundColor: 'white'
        }}>
          <GitMenu name="Search users or organizations" onPress={this.goToExplore.bind(this)} />
          {
              !this.props.loginData ? (
                <GitMenu name="Login to GitHub" onPress={this.goToLogin.bind(this)} />
              ) : (
                <View>
                  <GitMenu name="My profile" onPress={() => {
                    this.props.navigator.push({
                      screen: 'profile',
                      passProps: {
                        profile: this.state.user || {
                          login: this.props.loginData.username
                        },
                        loginData: this.props.loginData
                      }
                    })
                  }}></GitMenu>
                  <GitMenu name="My notifications" onPress={() => {
                    this.props.navigator.push({
                      screen: 'notification',
                      title: 'My notifications',
                      passProps: {
                        loginData: this.props.loginData
                      }
                    })
                  }}/>
                  <GitMenu name="Logout" onPress={() => {
                    this.props.navigator.resetTo({
                      screen: 'dashboard'
                    });
                  }} />
                </View>
              )
            }
        </ScrollView>
        <View style={{
          justifyContent: 'center',
          backgroundColor: 'skyblue',
          padding: 10
        }}>
          <Text style={{
            textAlign: 'center',
            color: 'white'
          }}>Made with ❤️ by @antonybudianto</Text>
        </View>
      </View>
    );
  }
}

export default GitDashboard;
