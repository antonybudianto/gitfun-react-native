import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight
} from 'react-native';

import * as _ from 'lodash';

import GitSearch from './git-search';
import GitCard from './git-card';

class GitFun extends Component {

  constructor(props) {
    super(props)
    this.state = {
      text: 'GitReact',
      searchText: '',
      result: [],
      error: null,
      info: null
    };
  }

  back() {
    this.props.navigator.pop();
  }

  searchGH(data) {
    let value = data.nativeEvent.text;

    if (!value) {
      return;
    }

    this.setState({
      result: [],
      error: null,
      info: `Searching ${value}...`
    });

    console.log(`searching '${value}'...`);

    fetch(`https://api.github.com/search/users?q=${value}`, {
      method: 'GET'
    })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      return Promise.reject(res);
    }, err => Promise.reject(err))
    .then(
      res => {
        console.log(res);
        this.setState({
          result: res.items,
          info: null
        });
      },
      err => {
        err.json().then(e => {
          this.setState({
            result: [],
            avatar: null,
            error: e.message,
            info: null
          });
        });
      }
    );
  }

  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <View style={styles.header} >
          <Text style={styles.headerText}>{this.state.text}</Text>
        </View>
        <ScrollView style={{flex: 1}}>
          <GitSearch
            onSubmitEditing={this.searchGH.bind(this)}></GitSearch>
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
              this.state.result.map(r =>
                <GitCard key={r.id} git={r} />
              )
          }

          <View style={{
              flex: 1,
              marginTop: 20,
              marginBottom: 20,
              alignItems: 'center'
            }}>
            <TouchableHighlight style={{
                width: 300,
                backgroundColor: 'orange',
                padding: 10
              }}
              onPress={this.back.bind(this)}>
              <Text style={{
                textAlign:'center',
                color: 'white'
              }}>Back</Text>
            </TouchableHighlight>
          </View>

        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    flex: 0,
    height: 70,
    backgroundColor: "rgb(74,144,226)",
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    color: 'white',
    fontSize: 22,
    paddingTop: 20,
    fontWeight: 'bold'
  },
  error: {
    flex: 1,
    padding: 5,
    backgroundColor: 'orangered'
  },
  info: {
    flex: 1,
    padding: 5,
    backgroundColor: 'skyblue'
  },
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: 'skyblue',
  }
});

GitFun.propTypes = {}
GitFun.defaultProps = {}

export default GitFun
