import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import GitProfile from '../GitProfile/GitProfile';
import GitUserCard from '../GitFun/GitUserCard';

class GitFollower extends Component {
  constructor(props) {
    super(props);

    this.state = {
      followers: [],
      loading: true,
      error: null
    };

    this.fetchFollowers();
  }

  goToProfile(follower) {
    this.props.navigator.push({
      component: GitProfile,
      passProps: {
        profile: follower
      }
    });
  }

  fetchFollowers() {
    fetch(`https://api.github.com/users/${this.props.profile.login}/followers`)
    .then(response => response.json())
    .then(res => {
      this.setState({
        followers: res,
        loading: false
      });
    }, err => {
      this.setState({
        error: err,
        loading: false
      });
    });
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
            this.state.loading ? <Text style={{
                textAlign: 'center',
                marginTop: 10
            }}>Loading followers data...</Text> : null
          }
          {
            this.state.followers
            .map(follower =>
              <GitUserCard onPress={this.goToProfile.bind(this, follower)} key={follower.id} git={follower} />
            )
          }
        </ScrollView>
      </View>
    );
  }
}

GitFollower.propTypes = {}
GitFollower.defaultProps = {}

export default GitFollower;
