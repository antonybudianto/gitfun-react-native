import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';

import LoadingView from '../../common/LoadingView';
import GitFeedCard from './GitFeedCard';

class GitFeed extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      feeds: []
    };
  }

  componentDidMount() {
    this.fetchFeeds();
  }

  fetchFeeds() {
    this.setState({
      loading: true
    });

    const headers = new Headers();
    headers.append('Authorization', 'token ' + this.props.loginData.token);
    fetch(`https://api.github.com/notifications?key=${Date.now()}`, {
      headers,
      cache: 'no-store'
    })
    .then(res => res.json())
    .then(result => {
      this.setState({
        loading: false,
        feeds: result
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingView text="Loading your feeds..." />
      );
    }
    return (
      <View style={{
        flex: 1,
        marginTop: 70,
        backgroundColor: 'white'
      }}>
        {
          this.state.feeds.length === 0 ?
          <View style={{
            marginTop: 20
          }}>
          <Text style={{
            color: 'gray',
            textAlign: 'center'
          }}>You don't have notifications!</Text>
          </View> : null
        }
        <ScrollView>
        {
          this.state.feeds.map(feed =>
            <GitFeedCard key={feed.id} feed={feed}></GitFeedCard>
          )
        }
        </ScrollView>
      </View>
    );
  }
}

export default GitFeed;
