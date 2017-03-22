import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import GitMenu from '../../common/GitMenu';
import GitRepo from '../GitRepo/GitRepo';
import GitFollower from '../GitFollower/GitFollower';
import LoadingView from '../../common/LoadingView';

import GitCountView from '../../common/GitCountView';

class GitProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      detail: null,
      loading: false
    };
  }

  componentDidMount() {
    this.fetchProfile(this.props.profile);
  }

  fetchProfile(profile) {
    this.setState({
      loading: true
    });

    fetch(`https://api.github.com/users/${profile.login}`)
    .then(res => res.json())
    .then(res => {
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
                  width: 50,
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
              textAlign: 'right'
            }}>Member since {new Date(this.state.detail.created_at).getFullYear()}</Text>
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
          justifyContent: 'center',
          padding: 10,
          backgroundColor: 'skyblue'
        }}>
          <Text style={{
            color: 'white',
            textAlign: 'center',
            fontStyle: 'italic'
          }}>{this.state.detail.bio}</Text>
        </View>
        <View style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: 'deepskyblue'
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
