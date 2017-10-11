import React, {Component} from 'react';
import {
  Animated,
  Image,
  ScrollView,
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

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = 60;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class ScrollableHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  _renderScrollViewContent() {
    const data = Array.from({length: 30});
    return (
      <View style={styles.scrollViewContent}>
        {data.map((_, i) =>
          <View key={i} style={styles.row}>
            <Text>{i}</Text>
          </View>
        )}
      </View>
    );
  }

  render() {
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -50],
      extrapolate: 'clamp',
    });

    return (
      <ThemeProvider uiTheme={{}}>
        <View style={styles.fill}>
          <ScrollView
              style={styles.fill}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}]
              )}
            >
            {this._renderScrollViewContent()}
          </ScrollView>

          <Animated.View style={[styles.header, {height: headerHeight}]}>
            <Animated.View style={[styles.header, {height: headerHeight}]}>
              <Animated.Image
                style={[
                  styles.backgroundImage,
                  {opacity: imageOpacity, transform: [{translateY: imageTranslate}]},
                ]}
                source={require('../assets/images/cat.jpg')}
              />

              <View style={styles.bar}>
                <Toolbar
                  leftElement="menu"
                  centerElement="My Profile"
                  isSearchActive={false}
                  rightElement='edit'
                  onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
                  onRightElementPress={() => this.props.navigation.navigate('About')}
                  style={{
                    container: {backgroundColor: 'transparent'}
                  }}
                />
              </View>
            </Animated.View>
          </Animated.View>
        </View>
      </ThemeProvider>
    );
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

  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    overflow: 'hidden',
  },
  bar: {
    marginTop: 10,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: 'transparent',
    color: 'white',
    fontSize: 18,
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },

  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
  },

});
