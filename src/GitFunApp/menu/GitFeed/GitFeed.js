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
    headers.append('Authorization', 'Basic ' + this.props.loginData.encodedKey);
    fetch(`https://api.github.com/notifications`, { headers })
    .then(res => res.json())
    .then(result => {
      this.setState({
        loading: false,
        feeds: result
      });
      console.log(JSON.stringify(result, null, 2));
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
