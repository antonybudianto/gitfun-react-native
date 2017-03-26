import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet,
    Button
} from 'react-native';

import GitRepoCard from './GitRepoCard';
import GitCountView from '../../common/GitCountView';

class GitRepo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: [],
      loading: false,
      error: null,
      page: 1,
      lastPage: false
    };
  }

  componentDidMount() {
    this.fetchRepos();
  }

  fetchRepos() {
    this.setState({
      loading: true
    });

    const path = this.props.loginData ? `user/repos` : `users/${this.props.profile.login}/repos`;
    const headers = new Headers();
    if (this.props.loginData) {
      headers.append('Authorization', `token ${this.props.loginData.token}`);
    }

    fetch(`https://api.github.com/${path}?page=${this.state.page}`, {
      headers,
      cache: 'no-store'
    })
    .then(response => response.json())
    .then(result => {
      this.setState((state) => ({
        lastPage: result.length === 0,
        repos: [...state.repos, ...result],
        loading: false
      }));
    }, err => {
      this.setState({
        error: err,
        loading: false
      });
    });
  }

  loadMore() {
    this.setState((state) => {
      return {
        page: state.page + (this.state.lastPage ? 0 : 1)
      };
    }, () => this.fetchRepos());
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
        marginTop: 70
      }}>
        <View style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 5,
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
            repos
            .map(repo =>
              <GitRepoCard key={repo['id']} repo={repo} />
            )
          }
          <View style={{
            marginBottom: 20
          }}>
             <Button color="skyblue" disabled={this.state.loading}
              onPress={this.loadMore.bind(this)}
              title={this.state.loading ? 'Loading...' : 'Load more'} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

GitRepo.propTypes = {}
GitRepo.defaultProps = {}

export default GitRepo;
