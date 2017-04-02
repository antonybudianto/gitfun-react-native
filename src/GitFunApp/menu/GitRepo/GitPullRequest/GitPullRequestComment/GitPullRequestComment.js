import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Button,
  Text
} from 'react-native';

import GitPullRequestCommentListItem from './GitPullRequestCommentListItem';

class GitPullRequestComment extends Component {

  static navOptions = {
    title: 'View pull request comments'
  };

  constructor(props) {
    super(props);

    this.state = {
      pullRequestComments: [],
      loading: false,
      error: null,
      page: 1,
      lastPage: false
    };
  }

  goToPR(pr) {}

  componentDidMount() {
    this.fetchPullRequestComments();
  }

  async fetchPullRequestComments() {
    this.setState({
      loading: true
    });

    const path = `repos/${this.props.ownerName}/${this.props.repoName}/pulls/\
      ${this.props.pullRequestNumber}/comments`;
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
        pullRequestComments: [...state.pullRequestComments, ...result],
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
    }, () => this.fetchPullRequestComments());
  }

  render() {
    return (
      <View style={{
        flex: 1,
        marginTop: 70,
        backgroundColor: 'white'
      }}>
        {
          this.state.loading ||
          this.state.pullRequestComments.length !== 0 ? null : (
            <Text style={{
              color: 'gray',
              textAlign: 'center',
              fontStyle: 'italic',
              margin: 20
            }}>No comments posted yet</Text>
          )
        }
        <ScrollView style={{
          flex: 1,
          padding: 5,
          backgroundColor: 'white'
        }}>
          {
            this.state.pullRequestComments
            .map(pullRequestComment =>
              <GitPullRequestCommentListItem onPress={this.goToPR.bind(this, pullRequestComment)}
                key={pullRequestComment['id']}
                pullRequestComment={pullRequestComment} />
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

GitPullRequestComment.propTypes = {}
GitPullRequestComment.defaultProps = {}

export default GitPullRequestComment;
