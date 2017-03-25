import React, { Component } from 'react';

import GitFun from './menu/GitFun/GitFun';
import GitProfile from './menu/GitProfile/GitProfile';
import GitRepo from './menu/GitRepo/GitRepo';
import GitFollower from './menu/GitFollower/GitFollower';
import GitLogin from './menu/GitLogin/GitLogin';
import GitDashboard from './menu/GitDashboard/GitDashboard';
import GitFeed from './menu/GitFeed/GitFeed';
import AppNavigator from './core/AppNavigator/AppNavigator';

const screens = {
  login: {
    component: GitLogin
  },
  dashboard: {
    component: GitDashboard
  },
  notification: {
    component: GitFeed
  },
  explorer: {
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
      <AppNavigator initialRoute={{screen: 'dashboard'}} screens={screens}/>
    );
  }
};

export default GitFunApp;
