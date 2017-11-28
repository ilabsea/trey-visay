import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
} from 'react-native-material-ui';

import CheckboxGroup from 'react-native-checkbox-group';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import headerStyles from '../assets/style_sheets/header';

import Thumbnail from 'react-native-thumbnail-video';
import videoList from '../data/json/videos';

let careers = [];

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
    let {width} = Dimensions.get('window');
    let videos = this._formatData(videoList);

    return(
      <ThemeProvider uiTheme={{}}>
        <View style={styles.container}>
          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>វីដេអូមុខរបរ</Text>}
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          />
          <ScrollView style={{flex: 1}}>
            { videos.map((row, i) => {
              return (
                <View style={{margin: 8, marginBottom: 0, flex: 1, flexDirection: 'row'}} key={i}>
                  { row.map((obj, j) => {
                    return(
                      <View style={{margin: 8}} key={j}>
                        <Thumbnail
                          url={obj.url}
                          imageWidth={width/2-24}
                        />
                        <Text style={{padding: 8, backgroundColor: '#fff'}}>{obj.title}</Text>
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
});
