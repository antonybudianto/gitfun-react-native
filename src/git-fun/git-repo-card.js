import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

const GitRepoCard = ({repo}) =>
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

const styles = StyleSheet.create({
  repoInfoText: {
    textAlign: 'right',
    fontSize: 11
  }
});

GitRepoCard.propTypes = {}
GitRepoCard.defaultProps = {}

export default GitRepoCard;
