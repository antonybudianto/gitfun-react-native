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
    console.log(this.props.loginData.token);
    headers.append('Authorization', 'token ' + this.props.loginData.token);
    headers.append('Cache-Control', 'no-cache');
    fetch(`https://api.github.com/notifications`, { headers })
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
