import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import GitRepoCard from './git-repo-card';

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
      });
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
              padding: 15,
              flex: 1
            }}>Back</Text>
          </TouchableHighlight>
        </View>
        <View style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: 'skyblue'
        }}>
          <Image style={{
                width: 80,
                height: 50,
              }}
            resizeMode={'contain'}
            source={{uri: this.props.profile['avatar_url']}}
          />
          <Text style={{
            fontSize: 14
          }}>{this.props.profile.login}</Text>
          <View>
            <Text>
            {this.state.repos
                .filter(repo => !repo.fork)
                .reduce((a,b) => a+b['stargazers_count'], 0)
              } stars</Text>
            <Text>
            {this.state.repos
              .filter(repo => repo.fork).length
            } forks</Text>
          </View>
        </View>
        <ScrollView style={{
          flex: 1,
          padding: 10
        }}>
          {
            this.state.repos
            .filter(repo => !repo.fork)
            .map(repo =>
              <GitRepoCard key={repo['id']} repo={repo} />
            )
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  repoInfoText: {
    textAlign: 'right',
    fontSize: 11
  }
});

GitProfile.propTypes = {}
GitProfile.defaultProps = {}

export default GitProfile;
