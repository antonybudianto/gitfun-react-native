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

import GitUserCard from '../GitFun/GitUserCard';

class GitFollower extends Component {

  static navOptions = {
    title: 'Followers'
  };

  constructor(props) {
    super(props);

    this.state = {
      followers: [],
      loading: true,
      error: null,
      page: 1,
      lastPage: false
    };
  }

  componentDidMount() {
    this.fetchFollowers();
  }

  goToProfile(follower) {
    this.props.navigator.push({
      screen: 'profile',
      passProps: {
        profile: follower
      }
    });
  }

  fetchFollowers() {
    this.setState({
      loading: true
    });

    fetch(`https://api.github.com/users/${this.props.profile.login}/followers?page=${this.state.page}`)
    .then(response => response.json())
    .then(result => {
      this.setState((state) => ({
        lastPage: result.length === 0,
        followers: [...state.followers, ...result],
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
    }, () => this.fetchFollowers());
  }

  render() {
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
          <Text style={{
            color: 'white'
          }}>{this.state.followers.length} followers</Text>
        </View>
        <ScrollView style={{
          flex: 1,
          padding: 5,
          backgroundColor: 'white'
        }}>
          {
            this.state.followers
            .map(follower =>
              <GitUserCard onPress={this.goToProfile.bind(this, follower)} key={follower.id} git={follower} />
            )
          }

          <View style={{
            marginTop: 20,
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

GitFollower.propTypes = {}
GitFollower.defaultProps = {}

export default GitFollower;
