import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Thumbnail from 'react-native-thumbnail-video';
import videoList from '../data/json/videos';
import headerStyles from '../assets/style_sheets/header';

export default class VideoScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'វីដេអូមុខរបរ',
    drawerIcon: ({ tintColor }) => (
      <AwesomeIcon name='play-circle-o' size={20} color={tintColor} />
    ),
  };

  _formatData(list) {
    let data = [];
    let myList = list.slice(0);

    while (myList.length > 0) {
      data.push(myList.splice(0, 2));
    }

    return data;
  }

  render() {
    let { width } = Dimensions.get('window');
    let videos = this._formatData(videoList);
    let imageWidth = width/2-24;

    return(
      <ThemeProvider uiTheme={{}}>
        <View style={styles.container}>
          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>វីដេអូមុខរបរ</Text>}
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
            searchable={{ placeholder: 'Search' }}
          />

          <ScrollView style={{flex: 1}}>
            { videos.map((row, i) => {
              return (
                <View style={styles.row} key={i}>
                  { row.map((obj, j) => {
                    return(
                      <View style={styles.column} key={j}>
                        <Thumbnail
                          url={obj.url}
                          imageWidth={imageWidth}
                        />
                        <Text numberOfLines={1} style={styles.title}>{obj.title}</Text>
                      </View>
                    )
                  })}
                </View>
              )
            })}

          </ScrollView>
        </View>
      </ThemeProvider>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
    padding: 16
  },
  row: {
    margin: 8,
    marginBottom: 0,
    flex: 1,
    flexDirection: 'row'
  },
  column: {
    margin: 8,
    flex: 1
  },
  title: {
    padding: 8,
    backgroundColor: '#fff'
  }
});
