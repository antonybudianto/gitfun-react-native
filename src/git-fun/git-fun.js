import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableHighlight
} from 'react-native';

import GitSearch from './git-search';
import GitCard from './git-card';
import GitProfile from './git-profile';

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

  onPress(r) {
    console.log(r);
    this.props.navigator.push({
      component: GitProfile,
      passProps: {
        profile: r
      }
    });
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
          info: res.items.length === 0 ? 'No data found' : null
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
    let _scrollView;

    return (
      <View style={{
        flex: 1,
        marginTop: 60
      }}>
        <View style={{
          flex: 0,
          height: 50,
          borderBottomColor: 'gray'
        }}>
          <GitSearch onSubmitEditing={this.searchGH.bind(this)}></GitSearch>
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

        <ScrollView ref={(scrollView) => { _scrollView = scrollView; }} style={{flex: 1}}>

          {
              this.state.result.map(r =>
                <GitCard onPress={this.onPress.bind(this, r)} key={r.id} git={r} />
              )
          }

          {
            this.state.result.length === 0 ? null :
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
          }

        </ScrollView>
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
    backgroundColor: 'skyblue'
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
