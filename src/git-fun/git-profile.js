import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import GitMenu from './git-menu';
import GitRepo from './menu/git-repo';
import GitFollower from './menu/git-follower';
import LoadingView from './common/loading-view';

const GitCountView = ({count, label}) =>
  <View style={{
    flex: 1
  }}>
    <Text style={{
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center'
    }}>{count}</Text>
    <Text style={{
      color: 'white',
      textAlign: 'center'
    }}>{label}</Text>
  </View>

class GitProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detail: null,
      loading: true
    };

    this.fetchProfile(this.props.profile);
  }

  fetchProfile(profile) {
    fetch(`https://api.github.com/users/${profile.login}`)
    .then(res => res.json())
    .then(res => {
      console.log(res);
      this.setState({
        detail: res,
        loading: false
      });
    }, err => {
      this.setState({
        loading: false
      });
    });
  }

  goToRepos() {
    this.props.navigator.push({
      component: GitRepo,
      title: 'View repositories',
      passProps: {
        profile: this.props.profile
      }
    });
  }

  goToFollowers() {
    this.props.navigator.push({
      component: GitFollower,
      title: 'View followers',
      passProps: {
        profile: this.props.profile
      }
    });
  }

  render() {
    return this.state.loading ?
      <LoadingView text={`Loading @${this.props.profile.login} profile...`} /> :
    (
      <View style={{
        flex: 1,
        marginTop: 64
      }}>
        <View style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
          backgroundColor: 'skyblue'
        }}>
          <View style={{
            flex: 1
          }}>
            <Image style={{
                  width: 80,
                  height: 50,
                }}
              resizeMode={'contain'}
              source={{uri: this.props.profile['avatar_url']}}
            />
            <Text style={{
              marginTop: 5,
              fontWeight: 'bold',
              color: 'white'
            }}>{this.state.detail.name}</Text>
            <Text style={{
              color: 'white'
            }}>@{this.props.profile.login}</Text>
          </View>

          <View style={{
            flex: 1
          }}>
            <Text style={{
                color: 'white',
                textAlign: 'right'
            }}>{this.state.detail.company}</Text>
            <Text style={{
              color: 'white',
              textAlign: 'right'
            }}>{this.state.detail.location}</Text>
            <Text style={{
              color: 'white',
              textAlign: 'right',
              fontWeight: 'bold'
            }}>{this.state.detail.hireable ? 'Available for hire' : 'Not available for hire'}</Text>
          </View>
        </View>

        <View style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: 'lightskyblue'
        }}>
          <GitCountView count={this.state.detail.followers} label="followers" />
          <GitCountView count={this.state.detail.following} label="following" />
          <GitCountView count={this.state.detail.public_gists} label="gists" />
          <GitCountView count={this.state.detail.public_repos} label="repos" />
        </View>
        <ScrollView style={{
          flex: 1,
          backgroundColor: 'white'
        }}>
          <GitMenu name="View repositories" onPress={this.goToRepos.bind(this)} />
          <GitMenu name="View followers" onPress={this.goToFollowers.bind(this)} />
        </ScrollView>
      </View>
    );
  }
}

GitProfile.propTypes = {}
GitProfile.defaultProps = {}

export default GitProfile;
