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

class GitProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  goToRepos() {
    this.props.navigator.push({
      component: GitRepo,
      title: `${this.props.profile.login}'s repos`,
      passProps: {
        back: this.props.back,
        profile: this.props.profile
      }
    });
  }

  goToFollowers() {

  }

  render() {
    return (
      <View style={{
        flex: 1,
        marginTop: 64
      }}>
        <View style={{
          flex: 0,
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
            marginTop: 5,
            fontSize: 14,
            fontWeight: 'bold',
            color: 'white'
          }}>{this.props.profile.login}</Text>
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
