import React, { Component } from 'react';

import GitFun from './menu/GitFun/GitFun';
import GitProfile from './menu/GitProfile/GitProfile';
import GitRepo from './menu/GitRepo/GitRepo';
import GitRepoCard from './menu/GitRepo/GitRepoCard';
import GitFollower from './menu/GitFollower/GitFollower';
import GitLogin from './menu/GitLogin/GitLogin';
import GitDashboard from './menu/GitDashboard/GitDashboard';
import GitNotification from './menu/GitNotification/GitNotification';
import GitEvent from './menu/GitEvent/GitEvent';
import AppNavigator from './core/AppNavigator/AppNavigator';

const screens = {
  login: {
    component: GitLogin
  },
  dashboard: {
    component: GitDashboard
  },
  event: {
    component: GitEvent
  },
  notification: {
    component: GitNotification
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
  repoCard: {
    component: GitRepoCard
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
