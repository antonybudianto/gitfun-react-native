import React, { Component } from 'react';
import {
  View,
  ScrollView,
  Text,
  Image
} from 'react-native';

import GitMenu from '../../common/GitMenu';
import LoadingView from '../../common/LoadingView';
import GitCountView from '../../common/GitCountView';

class GitRepoCard extends Component {

  static navOptions = {
    title: 'View repository'
  };

  constructor(props) {
    super(props);

    this.state = {
      repo: null,
      loading: false,
      error: null
    };
  }

  componentDidMount() {
    this.fetchRepo(this.props.ownerName, this.props.repoName);
  }

  goToPR() {
    this.props.navigator.push({
      screen: 'pullRequest',
      passProps: {
        ownerName: this.props.ownerName,
        repoName: this.props.repoName,
        loginData: this.props.loginData
      }
    });
  }

  async fetchRepo(ownerName, repoName) {
    this.setState({
      loading: true
    });

    try {
      const headers = new Headers();
      if (this.props.loginData) {
        headers.append('Authorization', `token ${this.props.loginData.token}`);
      }
      const res = await fetch(`https://api.github.com/repos/${ownerName}/${repoName}`, {
        headers
      });
      const result = await res.json();
      this.setState({
        repo: result,
        loading: false
      });
    } catch (error) {
      this.setState({
        loading: false,
        error
      });
    }
  }

  render() {
    if (this.state.loading) {
      return (
        <LoadingView text={`Loading ${this.props.ownerName}/${this.props.repoName}...`} />
      );
    } else if (!this.state.repo) {
      return (
        <LoadingView text={`@${this.props.repoName} not found`} />
      );
    } else if (this.state.error) {
      return (
        <LoadingView text="Failed to load repo. Please try again later." />
      );
    }

    return (
      <View style={{
        flex: 1,
        marginTop: 64,
        backgroundColor: 'white'
      }}>
        <View style={{
          flex: 0,
          flexDirection: 'row',
          padding: 5,
          paddingTop: 10,
          paddingBottom: 10,
          backgroundColor: 'skyblue'
        }}>
          <View style={{
            flex: 1,
            flexGrow: 2
          }}>
            <Image style={{
              width: 50,
              height: 50
            }} resizeMode="contain"
              source={{uri: this.state.repo.owner.avatar_url}}></Image>
            <Text style={{
              color: 'white'
            }}>@{this.props.ownerName}</Text>
            <Text style={{
              color: 'white',
              fontWeight: 'bold'
            }}>{this.state.repo.full_name}</Text>
          </View>
          <View style={{
            flex: 1
          }}>
            <Text style={{
              textAlign: 'center',
              color: 'white',
              textAlign: 'right'
            }}>{this.state.repo.private ? 'Private' : 'Public'} repo</Text>
            <Text style={{
              textAlign: 'center',
              color: 'white',
              textAlign: 'right'
            }}>{this.state.repo.has_issues ? 'Issue enabled' : 'Issue disabled'}</Text>
            <Text style={{
              textAlign: 'center',
              color: 'white',
              textAlign: 'right'
            }}>{this.state.repo.has_wiki ? 'Wiki enabled' : 'Wiki disabled'}</Text>
            <Text style={{
              textAlign: 'center',
              color: 'white',
              textAlign: 'right'
            }}>{this.state.repo.language}</Text>
            <Text style={{
              textAlign: 'center',
              color: 'white',
              textAlign: 'right'
            }}>{this.state.repo.fork ? 'Forked' : ''}</Text>
          </View>
        </View>
        <View style={{
          flex: 0,
          padding: 10,
          backgroundColor: 'skyblue'
        }}>
          <Text style={{
            color: 'white',
            textAlign: 'center',
            fontStyle: 'italic'
          }}>{this.state.repo.description}</Text>
        </View>
        <View style={{
          flex: 0,
          flexDirection: 'row',
          alignItems: 'center',
          padding: 10,
          backgroundColor: 'deepskyblue'
        }}>
          <GitCountView count={this.state.repo.stargazers_count} label="stars" />
          <GitCountView count={this.state.repo.forks_count} label="forks" />
          <GitCountView count={this.state.repo.open_issues_count} label="issues" />
          <GitCountView count={this.state.repo.subscribers_count} label="subscriber" />
        </View>
        <ScrollView style={{
          flex: 1,
          backgroundColor: 'white'
        }}>
          <GitMenu name="View pull requests" onPress={this.goToPR.bind(this)} />
        </ScrollView>
      </View>
    );
  }
}

GitRepoCard.propTypes = {}
GitRepoCard.defaultProps = {}

export default GitRepoCard;
