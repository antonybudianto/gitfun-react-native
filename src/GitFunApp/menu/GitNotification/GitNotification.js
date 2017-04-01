import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';

import LoadingView from '../../common/LoadingView';
import GitNotificationCard from './GitNotificationCard';

class GitNotification extends Component {

  static navOptions = {
    title: 'Notifications'
  };

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

  async fetchFeeds() {
    this.setState({
      loading: true
    });

    const headers = new Headers();
    headers.append('Authorization', 'token ' + this.props.loginData.token);
    const res = await fetch(`https://api.github.com/notifications?key=${Date.now()}`, {
      headers,
      cache: 'no-store'
    });
    const result = await res.json();
    this.setState({
      loading: false,
      feeds: result
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingView text="Loading your notifications..." />
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
            <GitNotificationCard key={feed.id} feed={feed}></GitNotificationCard>
          )
        }
        </ScrollView>
      </View>
    );
  }
}

export default GitNotification;
