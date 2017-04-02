import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Button
} from 'react-native';

import GitPullRequestListItem from './GitPullRequestListItem';

class GitPullRequest extends Component {

  static navOptions = {
    title: 'View pull requests'
  };

  constructor(props) {
    super(props);

    this.state = {
      pullRequests: [],
      loading: false,
      error: null,
      page: 1,
      lastPage: false
    };
  }

  goToPR(pr) {}

  componentDidMount() {
    this.fetchPullRequests();
  }

  async fetchPullRequests() {
    this.setState({
      loading: true
    });

    const path = `repos/${this.props.ownerName}/${this.props.repoName}/pulls`;
    const headers = new Headers();

    if (this.props.loginData) {
      headers.append('Authorization', `token ${this.props.loginData.token}`);
    }

    try {
      const res = await fetch(`https://api.github.com/${path}?page=${this.state.page}`, {
        headers,
        cache: 'no-store'
      });
      const result = await res.json();
      console.log(JSON.stringify(result[0], null, 2))
      this.setState((state) => ({
        lastPage: result.length === 0,
        pullRequests: [...state.pullRequests, ...result],
        loading: false
      }));
    } catch ({message}) {
      this.setState({
        error: message,
        loading: false
      });
    }
  }

  loadMore() {
    this.setState((state) => {
      return {
        page: state.page + (this.state.lastPage ? 0 : 1)
      };
    }, () => this.fetchPullRequests());
  }

  render() {
    return (
      <View style={{
        flex: 1,
        marginTop: 70
      }}>
        <ScrollView style={{
          flex: 1,
          padding: 5,
          backgroundColor: 'white'
        }}>
          {
            this.state.pullRequests
            .map(pullRequest =>
              <GitPullRequestListItem onPress={this.goToPR.bind(this, pullRequest)} key={pullRequest['id']} pullRequest={pullRequest} />
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

GitPullRequest.propTypes = {}
GitPullRequest.defaultProps = {}

export default GitPullRequest;
