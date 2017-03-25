import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

import * as base64 from 'base-64';

class GitLogin extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      loading: false,
      error: null
    };
  }

  onChangeUsername(username) {
    this.setState({username});
  }

  onChangePassword(password) {
    this.setState({password});
  }

  login() {
    this.setState({
      loading: true,
      error: null
    });
    const key = this.state.username + ':' + this.state.password;
    const encodedKey = base64.encode(key);
    const headers = new Headers();
    headers.append('Authorization', 'Basic ' + encodedKey);
    fetch(`https://api.github.com/user`, {
      headers
    })
    .then(res => res.json())
    .then(result => {
      if (result.message) {
        this.setState({
          loading: false,
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
            user: result,
            encodedKey
          }
        }
      });
      console.log(JSON.stringify(result, null, 2))
    },
    err => {
      this.setState({
        error: err.message,
        loading: false
      });
    });
  }

  render() {
    return (
      <View style={{
        flex: 1,
        marginTop: 70,
        backgroundColor: 'white'
      }}>
        <View style={{
          flex: 0,
          height: 200,
          padding: 5,
          justifyContent: 'center'
        }}>
          <TextInput
            onChangeText={this.onChangeUsername.bind(this)}
            placeholder="Username"
            style={{
              flex: 1,
              height: 20
            }} />
          <TextInput
            onChangeText={this.onChangePassword.bind(this)}
            placeholder="Password"
            secureTextEntry={true}
            style={{
              flex: 1,
              height: 20
            }} />
          {
            !this.state.error ? null :
            <View style={{
              backgroundColor: 'red',
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
            disabled={this.state.loading}
            onPress={this.login.bind(this)} title={this.state.loading ? 'Loading...' : 'Login to GitHub'} />

        </View>
      </View>
    );
  }
}

export default GitLogin;
