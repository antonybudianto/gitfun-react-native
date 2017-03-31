import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

import * as base64 from 'base-64';

class GitLogin extends Component {

  static navOptions = {
    title: 'Login'
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      otpCode: '',
      askOtp: false,
      loading: false,
      error: null
    };
  }

  async login() {
    this.setState({
      loading: true,
      error: null
    });

    const key = this.state.username + ':' + this.state.password;
    const encodedKey = base64.encode(key);
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encodedKey);

    if (this.state.otpCode) {
      headers.append('X-GitHub-OTP', this.state.otpCode);
    }

    try {
      let authorizationResult = await fetch(`https://api.github.com/authorizations`, {
        method: 'post',
        body: JSON.stringify({
          scopes: [
            'repo',
            'notifications'
          ],
          fingerprint: Date.now(),
          note: 'GitFun Beta'
        }),
        headers
      });

      if (authorizationResult.headers.map['x-github-otp']) {
        this.setState({
          askOtp: true
        });
      }

      let result =  await authorizationResult.json();

      if (result.message) {
        this.setState({
          loading: false,
          otpCode: '',
          error: result.message
        });

        return;
      }

      this.setState({
        loading: false
      });

      this.props.navigator.resetTo({
        screen: 'dashboard',
        passProps: {
          loginData: {
            username: this.state.username,
            token: result.token
          }
        }
      });

    } catch ({message}) {
      this.setState({
        loading: false,
        error: message
      });
    }
  }

  render() {
    return (
      <View style={{
        flex: 1,
        marginTop: 70,
        backgroundColor: 'white'
      }}>
        {
          this.state.askOtp ? (
            <View style={{
              flex: 0,
              height: 50,
              padding: 5,
              justifyContent: 'center'
            }}>
              <TextInput
                value={this.state.otpCode}
                onChangeText={(otpCode) => this.setState({otpCode})}
                placeholder="OTP code"
                secureTextEntry={true}
                keyboardType="numeric"
                style={{
                  flex: 1,
                  height: 20
                }} />
            </View>
          ) : (
            <View style={{
              flex: 0,
              height: 120,
              padding: 5,
              justifyContent: 'center'
            }}>
              <TextInput
                value={this.state.username}
                onChangeText={(username) => this.setState({username})}
                placeholder="Username"
                style={{
                  flex: 1,
                  height: 20
                }} />
              <TextInput
                value={this.state.password}
                onChangeText={(password) => this.setState({password})}
                placeholder="Password"
                secureTextEntry={true}
                style={{
                  flex: 1,
                  height: 20
                }} />
            </View>
          )
        }

        {
          !this.state.error ? null :
          <View style={{
            backgroundColor: 'orange',
            padding: 10,
            marginBottom: 20
          }}>
            <Text style={{
              color: 'white'
            }}>{this.state.error}</Text>
          </View>
        }

        <Button style={{
          marginTop: 20
        }}
          color="skyblue"
          disabled={this.state.loading || (!this.state.username || !this.state.password)}
          onPress={this.login.bind(this)}
          title={this.state.loading ? 'Loading...' : 'Login to GitHub'} />

        <View style={{
          flex: 1,
          marginTop: 40,
          backgroundColor: 'skyblue',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Text style={{
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
            padding: 5,
            textAlign: 'center'
          }}>Disclaimer</Text>
          <Text style={{
            color: 'white',
            fontSize: 14,
            padding: 5,
            textAlign: 'center'
          }}>By logging in, you'll allow the app to access your repositories and notifications</Text>
          <Text style={{
            color: 'white',
            fontSize: 14,
            padding: 5,
            textAlign: 'center'
          }}>The app doesn't store your credentials, but it's recommended to enable 2FA before login</Text>
        </View>
      </View>
    );
  }
}

export default GitLogin;
