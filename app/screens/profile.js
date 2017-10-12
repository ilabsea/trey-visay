import React, {Component} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {
  ThemeProvider,
  Divider,
  Avatar,
  Card,
  Toolbar,
  TouchableOpacity,
} from 'react-native-material-ui';

import ParallaxScrollView from '../components/parallax_scroll_view';

export default class ScrollableHeader extends Component {

  _renderScrollViewContent() {
    const data = Array.from({length: 30})
    return (
      <View>
        {data.map((_, i) =>
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        )}
      </View>
    )
  }

  _renderHeader() {
    return(
      <Toolbar
        leftElement="menu"
        centerElement="My Profile"
        rightElement='edit'
        searchable={null}
        searchValue=''
        onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
        onRightElementPress={() => this.props.navigation.navigate('About')}
        style={{
          container: {backgroundColor: 'transparent'}
        }}
      />
    )
  }

  render() {
    return (
      <ParallaxScrollView
        customView={ this._renderScrollViewContent.bind(this) }
        imageBgSrc={ require('../assets/images/cat.jpg') }
        customHeader={ this._renderHeader.bind(this) }
      />
    )
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
