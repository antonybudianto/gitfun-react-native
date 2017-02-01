import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import GitRepoCard from '../git-repo-card';

class GitRepo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      loading: true,
      error: null
    };

    this.fetchRepos();
  }

  fetchRepos() {
    fetch(`https://api.github.com/users/${this.props.profile.login}/repos`)
    .then(response => response.json())
    .then(res => {
      this.setState({
        repos: res,
        loading: false
      });
    }, err => {
      console.log(err);
      this.setState({
        error: err,
        loading: false
      });
    });
  }

  render() {
    return (
      <View style={{
        flex: 1,
        marginTop: 60
      }}>
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
            fontSize: 14,
            color: 'white'
          }}>{this.props.profile.login}</Text>
          <View>
            <Text style={{color: 'white'}}>
            {this.state.repos
                .filter(repo => !repo.fork)
                .reduce((a,b) => a+b['stargazers_count'], 0)
              } stars</Text>
            <Text style={{color: 'white'}}>
            {this.state.repos
                .filter(repo => !repo.fork).length
              } repos</Text>
            <Text style={{color: 'white'}}>
            {this.state.repos
              .filter(repo => repo.fork).length
            } forks</Text>
          </View>
        </View>
        <ScrollView style={{
          flex: 1,
          padding: 5,
          backgroundColor: 'white'
        }}>
          {
            this.state.loading ? <Text style={{
                textAlign: 'center',
                marginTop: 10
            }}>Loading repository data...</Text> : null
          }
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

GitRepo.propTypes = {}
GitRepo.defaultProps = {}

export default GitRepo;
