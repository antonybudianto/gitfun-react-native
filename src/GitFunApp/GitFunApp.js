import React, { Component } from 'react';

import GitFun from './menu/GitFun/GitFun';
import GitProfile from './menu/GitProfile/GitProfile';
import GitRepo from './menu/GitRepo/GitRepo';
import GitFollower from './menu/GitFollower/GitFollower';
import AppNavigator from './core/AppNavigator/AppNavigator';

const screens = {
  home: {
    component: GitFun
  },
  profile: {
    component: GitProfile
  },
  repo: {
    component: GitRepo
  },
  follower: {
    component: GitFollower
  }
};

class GitFunApp extends Component {
  render() {
    return (
      <AppNavigator initialRoute={{screen: 'home'}} screens={screens}/>
    );
  }
};

export default GitFunApp;
