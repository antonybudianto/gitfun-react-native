import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView
} from 'react-native';

import LoadingView from '../../common/LoadingView';
import GitEventCard from './GitEventCard';

class GitEvent extends Component {

  static navOptions = {
    title: 'Events'
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      events: []
    };
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents() {
    this.setState({
      loading: true
    });

    const headers = new Headers();
    headers.append('Authorization', 'token ' + this.props.loginData.token);
    fetch(`https://api.github.com/users/${this.props.loginData.username}/received_events?key=${Date.now()}`, {
      headers,
      cache: 'no-store'
    })
    .then(res => res.json())
    .then(result => {
      this.setState({
        loading: false,
        events: result
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingView text="Loading your events..." />
      );
    }
    return (
      <View style={{
        flex: 1,
        marginTop: 70,
        backgroundColor: 'white'
      }}>
        {
          this.state.events.length === 0 ?
          <View style={{
            marginTop: 20
          }}>
          <Text style={{
            color: 'gray',
            textAlign: 'center'
          }}>You don't have events!</Text>
          </View> : null
        }
        <ScrollView>
        {
          this.state.events.map(event =>
            <GitEventCard key={event.id} event={event}></GitEventCard>
          )
        }
        </ScrollView>
      </View>
    );
  }
}

export default GitEvent;
