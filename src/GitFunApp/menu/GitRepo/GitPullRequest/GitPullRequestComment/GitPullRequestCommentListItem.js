import React from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

import GitDiffView from '../../../../common/GitDiffView';

const GitPullRequestCommentListItem = ({pullRequestComment}) =>
    <View style={{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 5,
      marginBottom: 10,
      borderBottomColor: 'lightgray',
      borderBottomWidth: 1
      }} key={pullRequestComment.id}>
      <View style={{
          flex:1,
          flexDirection: 'row',
          alignItems: 'flex-start'
      }}>
        <View style={{
          flex: 0,
          width: 50,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <Image style={{
            width: 30,
            height: 30,
            padding: 5
          }}
          resizeMode="contain"
          source={{uri: pullRequestComment.user.avatar_url}} />
          <Text style={{
            fontSize: 10
          }}>{pullRequestComment.user.login}</Text>
        </View>

        <View style={{
          flex: 1,
          marginLeft: 5
        }}>
          <Text style={{
            backgroundColor: 'white',
            fontSize: 10,
            fontWeight: 'bold',
            color: 'gray'
          }}>{pullRequestComment.path}</Text>
          <GitDiffView fontSize={10} diff={pullRequestComment.diff_hunk}></GitDiffView>
          <Text style={{
            fontSize: 10,
            marginTop: 5
          }}>{pullRequestComment.body}</Text>
        </View>
      </View>
    </View>

GitPullRequestCommentListItem.propTypes = {}
GitPullRequestCommentListItem.defaultProps = {}

export default GitPullRequestCommentListItem;
