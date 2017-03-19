import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import GitRepoCard from './GitRepoCard';
import GitCountView from '../../common/GitCountView';

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
      this.setState({
        error: err,
        loading: false
      });
    });
  }

  render() {
    const repos = this.state.repos.filter(repo => !repo.fork);
    const totalStars = repos.reduce((acc,cur) => acc + cur['stargazers_count'], 0)
    const totalForks = repos.reduce((acc, cur) => acc + cur['forks'], 0);
    const totalOpenIssues = repos.reduce((acc, cur) => acc + cur['open_issues'], 0);
    const languages = repos.reduce((acc, cur) => {
      if (!cur['language']) return acc;
      if (!acc[cur['language']]) {
        acc[cur['language']] = 0;
      }
      acc[cur['language']]++;
      return acc;
    }, {});
    const langList = Object.entries(languages);

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
        </View>

        <View style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: 'deepskyblue'
        }}>
          <GitCountView count={repos.length} label="repos" />
          <GitCountView count={totalStars} label="stars" />
          <GitCountView count={totalForks} label="forks" />
          <GitCountView count={totalOpenIssues} label="issues" />
          <GitCountView count={langList.length} label="languages" />
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
