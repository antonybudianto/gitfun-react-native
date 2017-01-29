import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableHighlight
} from 'react-native';

class GitProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: []
    };

    this.fetchRepos();
  }

  fetchRepos() {
    fetch(`https://api.github.com/users/${this.props.profile.login}/repos`)
    .then(response => response.json())
    .then(res => {
      this.setState({
        repos: res
      })
      console.log(res);
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
            backgroundColor: 'orange',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}>
          <TouchableHighlight underlayColor={'coral'} onPress={this.props.back}>
            <Text style={{
              padding: 15
            }}>Back</Text>
          </TouchableHighlight>
        </View>
        <View style={{
          flex: 1,
          padding: 10
        }}>
          <Image
              style={{
              width: 80,
              height: 50,
              }}
              resizeMode={"contain"}
              source={{uri: this.props.profile['avatar_url']}}
          />
          <Text>{this.props.profile.login}</Text>
          <Text>Total stars: &nbsp;
            {this.state.repos
              .filter(repo => !repo.fork)
              .reduce((a,b) => a+b['stargazers_count'], 0)
            }</Text>
        </View>
        <ScrollView style={{
          flex: 1,
          padding: 10
        }}>
          {
            this.state.repos
            .filter(repo => !repo.fork)
            .map(repo =>
              <View key={repo.id}>
                <Text>{repo['name']} - {repo['stargazers_count']} stars</Text>
              </View>
            )
          }
        </ScrollView>

      </View>
    );
  }
}


GitProfile.propTypes = {}
GitProfile.defaultProps = {}

export default GitProfile;
