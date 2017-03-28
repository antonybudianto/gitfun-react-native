import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  Button
} from 'react-native';

import GitEventCard from './GitEventCard';

class GitEvent extends Component {

  static navOptions = {
    title: 'Events'
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      events: [],
      page: 1,
      lastPage: false
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
    fetch(`https://api.github.com/users/${this.props.loginData.username}/received_events?\
          key=${Date.now()}&page=${this.state.page}`, {
      headers,
      cache: 'no-store'
    })
    .then(res => res.json())
    .then(result => {
      this.setState((state) => ({
        lastPage: result.length === 0,
        events: [...state.events, ...result],
        loading: false
      }));
    });
  }

  loadMore() {
    this.setState((state) => {
      return {
        page: state.page + (this.state.lastPage ? 0 : 1)
      };
    }, () => this.fetchEvents());
  }

  render() {
    return (
      <View style={{
        flex: 1,
        marginTop: 70,
        backgroundColor: 'white'
      }}>
        {
          this.state.events.length === 0 && !this.state.loading ?
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

          <View style={{
            margin: 20
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

export default GitEvent;
