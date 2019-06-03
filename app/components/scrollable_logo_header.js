/* @usage
<ScrollableHeader
  customView={ this._renderScrollViewContent.bind(this) }
  imageBgSrc={ cover }
  customHeader={ this._renderHeader.bind(this) }
  profile={ photo }
  profileSize={ PROFILE_SIZE }
  title={this.state.user.fullName}
/>
*/

// https://github.com/janicduplessis/react-native-scrollable-header
import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

const HEADER_MAX_HEIGHT = 200;
const HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 60 : 73;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

export default class ScrollableLogoHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  _renderScrollViewContent() {
    const data = Array.from({ length: 30 });
    return (
      <View style={styles.scrollViewContent}>
        {/*custom View goes here*/}
        { this.props.customView() }
      </View>
    );
  }

  render() {
    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, -HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const imageOpacity = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });

    const imageTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [0, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });

    const titleScale = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_SCROLL_DISTANCE],
      extrapolate: 'clamp',
    });

    const titleTranslate = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });

    {/*custom Header goes here*/}
    let bgColor = this.props.backgroundColor || '#1976d2';
    let titleBottom = !!this.props.subTitle ? 30 : 0;

    return (
      <View style={styles.fill}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0, 0, 0, 0.251)"
        />
        <Animated.ScrollView
          style={styles.fill}
          scrollEventThrottle={1}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
            { useNativeDriver: true },
          )}
        >
          {this._renderScrollViewContent()}
        </Animated.ScrollView>
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: bgColor, transform: [{ translateY: headerTranslate }] },
          ]}
        >
          { this.props.title &&
            <View style={{position: 'absolute', left: (this.props.profileSize - 40),
                right: 5, bottom: 0}}>
              <Text style={{fontSize: 20, color: '#fff'}} numberOfLines={1}>{this.props.title}</Text>
            </View>
          }

          <Animated.View
            style={[
              styles.backgroundImage,
              {
                opacity: imageOpacity,
                transform: [{ translateY: imageTranslate }],
              },
            ]}
          />

          { this.props.profile &&
            <View style={[styles.profileWrapper, { width: this.props.profileSize + 16, height: this.props.profileSize + 16 }]}>
              <Animated.Image
                style={{
                  opacity: imageOpacity,
                  borderRadius: this.props.profileSize/2,
                  position: 'absolute',
                  alignSelf: 'center',
                  width: this.props.profileSize,
                  height: this.props.profileSize
                }}
                source={this.props.profile}
              />
            </View>
          }

          <Animated.View
            style={[
              { transform: [{ translateY: titleScale }] },
            ]}
          >

            { this.props.title &&
              <View style={[styles.titleTextWrapper, { bottom: titleBottom}]}>
                <Text> {this.props.title}</Text>
              </View>
            }

            { this.props.subTitle &&
              <View style={[styles.titleTextWrapper, { bottom: 0}]}>
                <Text style={{color: 'rgb(155, 155, 155)'}}>{this.props.subTitle}</Text>
              </View>
            }

          </Animated.View>

        </Animated.View>
        <Animated.View
          style={[
            styles.bar,
            {
              transform: [
                { translateY: titleTranslate },
              ],
            },
          ]}
        >
          {/*custom Header goes here*/}
          {this.props.customHeader()}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  fill: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#03A9F4',
    height: HEADER_MAX_HEIGHT
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: HEADER_MAX_HEIGHT,
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 32,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  title: {
    color: 'white',
    fontSize: 18
  },
  scrollViewContent: {
    marginTop: HEADER_MAX_HEIGHT,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileWrapper: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 8,
    top: 130,
    borderColor: 'rgba(193, 193, 193, 0.47)',
    borderWidth: 1
  },
  titleTextWrapper: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '70%'
  }
});
