import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text
} from 'react-native'

import * as _ from 'lodash';

import Mysearch from './mysearch';
import GitCard from './gitcard';

export default class FlexDimensionsBasics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'GitReact',
      searchText: '',
      result: [],
      error: null,
      info: null
    };
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

  randomColorRange(range) {
    let n = range.length;
    let res = '';
    for(let i=0;i<6;i++) {
      let index = Math.floor(Math.random()*n);
      res += range[index];
    }
    return '#' + res;
  }

  randomColor() {
    return this.randomColorRange(['a','b','c','d','e','f']);
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
            <Mysearch
              onSubmitEditing={this.searchGH.bind(this)}></Mysearch>
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
          </ScrollView>
        </View>
    );
  }
};

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
