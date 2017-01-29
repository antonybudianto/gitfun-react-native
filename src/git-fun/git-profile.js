import React, { Component } from 'react';
import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

class GitProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      repos: []
    };

    this.fetchRepos();
  }

  fetchRepos() {
    fetch(`https://api.github.com/users/${this.props.profile.login}/repos`)
    .then(response => response.json())
    .then(res => {
      this.setState({
        repos: res
      })
      console.log(res);
    });
  }

  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <View style={{
            flex: 0,
            height: 70,
            paddingTop: 20,
            backgroundColor: 'orange',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}>
          <TouchableHighlight underlayColor={'coral'} onPress={this.props.back}>
            <Text style={{
              padding: 15,
              flex: 1
            }}>Back</Text>
          </TouchableHighlight>
        </View>
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
            fontSize: 14
          }}>{this.props.profile.login}</Text>
          <View>
            <Text>
            {this.state.repos
                .filter(repo => !repo.fork)
                .reduce((a,b) => a+b['stargazers_count'], 0)
              } stars</Text>
            <Text>
            {this.state.repos
              .filter(repo => repo.fork).length
            } forks</Text>
          </View>
        </View>
        <ScrollView style={{
          flex: 1,
          padding: 10
        }}>
          {
            this.state.repos
            .filter(repo => !repo.fork)
            .map(repo =>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
                marginBottom: 10,
                borderBottomColor: 'lightgray',
                borderBottomWidth: 1
              }} key={repo.id}>
                <View style={{
                  flex:1,
                  flexGrow: 3
                }}>
                  <Text style={{fontWeight: 'bold'}}>{repo['name']}</Text>
                  <Text style={{marginTop: 5, fontSize: 12}}>{repo['description']}</Text>
                </View>
                <View style={{flex:1}}>
                  <Text style={styles.repoInfoText}>{repo['stargazers_count']} stars</Text>
                  <Text style={styles.repoInfoText}>{repo['forks_count']} forks</Text>
                  <Text style={styles.repoInfoText}>{repo['watchers_count']} watchers</Text>
                  <Text style={styles.repoInfoText}>{repo['open_issues_count']} open issues</Text>
                  <Text style={styles.repoInfoText}>{repo['has_wiki'] ? 'Has wiki' : 'No wiki'}</Text>
                  <Text style={styles.repoInfoText}>{repo['language']}</Text>
                </View>
              </View>
            )
          }
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  repoInfoText: {
    textAlign: 'right',
    fontSize: 11
  }
});

GitProfile.propTypes = {}
GitProfile.defaultProps = {}

export default GitProfile;
