import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight
} from 'react-native';

import GitSearch from './GitSearch';
import GitUserCard from './GitUserCard';

class GitFun extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: 'GitFun',
      username: null,
      result: [],
      error: null,
      info: null,
      filter: {}
    };
  }

  onPress(r) {
    this.props.navigator.push({
      screen: 'profile',
      passProps: {
        profile: r
      }
    });
  }

  searchLocation(text) {
    this.setState({
      filter: {
        ...this.state.filter,
        location: text
      }
    });
  }

  searchUsername(text) {
    this.setState({
      username: text
    });
  }

  generateFilter() {
    return Object.keys(this.state.filter)
    .filter(key => this.state.filter[key])
    .map(key => {
      return `+${key}:${this.state.filter[key]}`
    })
    .join('');
  }

  async searchGH() {
    let value = this.state.username;

    if (!value) {
      this.setState({
        result: []
      });
      return;
    }

    this.setState({
      result: [],
      error: null,
      info: `Searching ${value}...`
    });

    const filter = this.generateFilter();
    const endpoint = `https://api.github.com/search/users?q=${value}${filter}`;

    try {
      const res = await fetch(endpoint, { method: 'GET' });
      const { items } = await res.json();
      this.setState({
        result: items,
        info: items.length === 0 ? 'No data found' : null
      });
    } catch ({message}) {
      this.setState({
        result: [],
        error: message,
        info: null
      });
    }
  }

  render() {
    let _scrollView;

    return (
      <View style={{
        flex: 1,
        marginTop: 70,
        backgroundColor: 'white'
      }}>
        <View style={{
          flex: 0,
          height: 100
        }}>
          <GitSearch placeholder="Search by users or organizations"
            onSubmitEditing={this.searchGH.bind(this)}
            onChangeText={this.searchUsername.bind(this)}></GitSearch>
          <GitSearch placeholder="Location..."
            onSubmitEditing={this.searchGH.bind(this)}
            onChangeText={this.searchLocation.bind(this)}></GitSearch>
        </View>
        {
          this.state.info ? (
          <View style={styles.info}>
            <Text style={{color: 'white'}}>{this.state.info}</Text>
          </View>
          ) : null
        }
        {
          this.state.error ? (
          <View style={styles.error}>
            <Text style={{color: 'white'}}>ERROR: {this.state.error}</Text>
          </View>
          ) : null
        }

        {
          this.state.result.length === 0 ? (
            <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              padding: 20,
              backgroundColor: 'skyblue'
            }}>
              <Text style={{
                fontSize: 18,
                textAlign: 'center',
                color: 'white'
              }}>Start by typing username and press enter!</Text>
            </View>
          ) :
          (
            <ScrollView ref={(scrollView) => { _scrollView = scrollView; }}
              style={{
                flex: 1
              }}>
              {
                this.state.result.map(r =>
                  <GitUserCard onPress={this.onPress.bind(this, r)} key={r.id} git={r} />
                )
              }
              <View style={{
                flex: 1,
                marginTop: 20,
                marginBottom: 20,
                alignItems: 'center'
              }}>
              <TouchableHighlight style={styles.backToTop}
                onPress={() => {_scrollView.scrollTo({y:0})}}>
                <Text style={{
                  textAlign:'center',
                  color: 'white'
                }}>Back to top</Text>
              </TouchableHighlight>
            </View>
            </ScrollView>
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  error: {
    flex: 0,
    padding: 5,
    backgroundColor: 'orangered'
  },
  info: {
    flex: 0,
    padding: 5,
    backgroundColor: 'deepskyblue'
  },
  backToTop: {
    width: 300,
    backgroundColor: 'orange',
    padding: 10
  }
});

GitFun.propTypes = {}
GitFun.defaultProps = {}

export default GitFun
