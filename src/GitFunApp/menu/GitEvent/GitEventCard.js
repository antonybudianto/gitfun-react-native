import React from 'react';
import {
  View,
  Text,
  Image
} from 'react-native';

const GitEventCard = ({ event }) =>
  <View style={{
    padding: 14,
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  }}>
    <Image style={{
      width: 20,
      height: 20
    }} resizeMode={'contain'} source={{uri: event.actor.avatar_url}} />
    <View style={{
      flex: 1,
      marginLeft: 10
    }}>
      {
        event.type === 'PullRequestReviewCommentEvent' ? (
          <View>
            <Text style={{
              fontSize: 12
            }}>{event.actor.login} reviewed PR #{event.payload.pull_request.number} "{event.payload.pull_request.title}"</Text>
            <Text style={{
              fontSize: 12,
              color: 'gray'
            }}>- "{event.payload.comment.body}"</Text>
          </View>
        ) : null
      }

      {
        event.type === 'WatchEvent' ? (
          <View>
            <Text style={{
              fontSize: 12
            }}>{event.actor.login} starred {event.repo.name}
            </Text>
          </View>
        ) : null
      }

      {
        event.type === 'ForkEvent' ? (
          <View>
            <Text style={{
              fontSize: 12
            }}>{event.actor.login} forked {event.repo.name} to {event.payload.forkee.full_name}
            </Text>
          </View>
        ) : null
      }

      {
        event.type === 'PullRequestEvent' ? (
          <View>
            <Text style={{
              fontSize: 12
            }}>{event.actor.login} {event.payload.action} PR #{event.payload.pull_request.number}
            </Text>
            <Text style={{
              fontSize: 12,
              color: 'gray'
            }}>{event.payload.pull_request.title}
            </Text>
          </View>
        ) : null
      }

      {
        event.type === 'IssuesEvent' ? (
          <View>
            <Text style={{
              fontSize: 12
            }}>{event.actor.login} {event.payload.action} issue #{event.payload.issue.number} "{event.payload.issue.title}"
            </Text>
            <Text style={{
              fontSize: 12,
              color: 'gray'
            }}>{event.payload.issue.title}
            </Text>
          </View>
        ) : null
      }

      {
        event.type === 'DeleteEvent' ? (
          <View>
            <Text style={{
              fontSize: 12
            }}>{event.actor.login} deleted {event.payload.ref_type} "{event.payload.ref}"
            </Text>
          </View>
        ) : null
      }

      {
        event.type === 'CreateEvent' ? (
          <View>
            <Text style={{
              fontSize: 12
            }}>{event.actor.login} created {event.payload.ref_type} "{event.payload.ref}"
            </Text>
          </View>
        ) : null
      }

      {
        event.type === 'IssueCommentEvent' ? (
          <View>
            <Text style={{
              fontSize: 12
            }}>{event.actor.login} commented on issue #{event.payload.issue.number} "{event.payload.issue.title}"
            </Text>
            <Text style={{
              fontSize: 12,
              color: 'gray'
            }}>{event.payload.comment.body}
            </Text>
          </View>
        ) : null
      }

      {
        event.type === 'PushEvent' ? (
          <View>
            <Text style={{
              fontSize: 12
            }}>{event.actor.login} pushed {event.payload.commits.length} commits to {event.payload.ref}</Text>
            <Text style={{
              fontSize: 10,
              color: 'gray'
            }}>{event.repo.name}</Text>
            {
              event.payload.commits.slice(0, 3).map(commit =>
                <View key={commit.sha} style={{
                  marginTop: 5
                }}>
                  <Text style={{
                    fontSize: 10
                  }}>- {commit.message}</Text>
                </View>
              )
            }

          </View>
        ) : null
      }

    </View>
  </View>

export default GitEventCard;
