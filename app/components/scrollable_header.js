// https://github.com/janicduplessis/react-native-scrollable-header
import React, { Component } from 'react';
import {
  Animated,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import PropTypes from 'prop-types';
import * as Progress from 'react-native-progress';
import { FontSetting } from '../assets/style_sheets/font_setting';

const DEFAULT_HEADER_MAX_HEIGHT = 140;
const DEFAULT_HEADER_MIN_HEIGHT = Platform.OS === 'ios' ? 64 : 74;
const DEFAULT_HEADER_SCROLL_DISTANCE = DEFAULT_HEADER_MAX_HEIGHT - DEFAULT_HEADER_MIN_HEIGHT;
const DEFAULT_HEADER_COLOR = '#1976d2';
const NAVIGATION_BUTTON_WIDTH = Platform.OS === 'ios' ? 30 : 44;

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
    overflow: 'hidden',
    height: DEFAULT_HEADER_MAX_HEIGHT,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    width: null,
    height: DEFAULT_HEADER_MAX_HEIGHT,
    resizeMode: 'cover',
    backgroundColor: DEFAULT_HEADER_COLOR,
  },
  bar: {
    backgroundColor: 'transparent',
    marginTop: Platform.OS === 'ios' ? 28 : 38,
    height: 40,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'center'
  },
  title: {
    fontSize: FontSetting.nav_title,
    color: 'white',
    paddingHorizontal: 16,
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
  },
  scrollViewContent: {
    marginTop: DEFAULT_HEADER_MAX_HEIGHT,
  },
  row: {
    height: 40,
    margin: 16,
    backgroundColor: '#D3D3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  largeTitle: {
    fontSize: FontSetting.big_title,
    color: '#fff',
    lineHeight: 50
  }
});

class ScrollableHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  getHeaderMaxHeight() {
    const { headerMaxHeight } = this.props;
    return headerMaxHeight || DEFAULT_HEADER_MAX_HEIGHT;
  }

  getHeaderScrollDistance() {
    return this.getHeaderMaxHeight() - DEFAULT_HEADER_MIN_HEIGHT;
  }

  getInputRange() {
   return [0, this.getHeaderScrollDistance()];
  }

  getOverlayBgColor() {
    const { overlayBgColor } = this.props;
    return overlayBgColor || DEFAULT_HEADER_COLOR;
  }

  getHeaderTranslate() {
    const { scrollY } = this.state;

    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, -this.getHeaderScrollDistance()],
      extrapolate: 'clamp',
    });
  }

  getOverlayOpacity() {
    const { scrollY } = this.state;

    return scrollY.interpolate({
      inputRange: [0, this.getHeaderScrollDistance() / 2, this.getHeaderScrollDistance()],
      outputRange: [1, 1, 0],
      extrapolate: 'clamp',
    });
  }

  getOverlayTranslate() {
    const { scrollY } = this.state;

    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [0, DEFAULT_HEADER_MIN_HEIGHT],
      extrapolate: 'clamp',
    });
  }

  getTitleScale() {
    const { scrollY } = this.state;

    return scrollY.interpolate({
      inputRange: this.getInputRange(),
      outputRange: [this.getHeaderMaxHeight(), this.getHeaderScrollDistance()],
      extrapolate: 'clamp',
    });
  }

  getTitleTranslate() {
    const { scrollY } = this.state;
    let distance = this.getHeaderScrollDistance();

    return scrollY.interpolate({
      inputRange: [0, distance / 2, distance],
      outputRange: [0, 0, -8],
      extrapolate: 'clamp',
    });
  }

  getNavigationTranslate() {
    const { scrollY } = this.state;
    let distance = this.getHeaderScrollDistance();
    let z = Platform.OS === 'ios' ? -4 : -8

    return scrollY.interpolate({
      inputRange: [0, distance / 2, distance],
      outputRange: [0, 0, z],
      extrapolate: 'clamp',
    });
  }

  renderStatusBar() {
    return (
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="rgba(0, 0, 0, 0.251)"
      />
    )
  }

  renderContent() {
    return (
      <Animated.ScrollView
        style={[styles.fill, this.props.style]}
        scrollEventThrottle={1}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
          { useNativeDriver: true },
        )}>

        <View style={[styles.scrollViewContent, { marginTop: this.getHeaderMaxHeight() }]}>
          { this.props.renderContent() }
        </View>

      </Animated.ScrollView>
    );
  }

  renderTitle() {
    if (!this.props.title) { return null }

    return (
      <View style={{position: 'absolute', left: NAVIGATION_BUTTON_WIDTH, right: NAVIGATION_BUTTON_WIDTH, bottom: 2}}>
        <Text numberOfLines={1} style={styles.title} numberOfLines={1}>{this.props.title}</Text>
      </View>
    )
  }

  renderOverlay() {
    return (
      <Animated.View
        style={[
          styles.overlay,
          {
            height: this.getHeaderMaxHeight(),
            opacity: this.getOverlayOpacity(),
            backgroundColor: this.getOverlayBgColor(),
            transform: [{ translateY: this.getOverlayTranslate() }],
          },
        ]}
      />
    )
  }

  renderLargeTitle() {
    if (!this.props.largeTitle) {
      return null
    }

    return (
      <Animated.View
        style={[
          { transform: [{ translateY: this.getTitleScale() }] },
          { opacity: this.getOverlayOpacity() }
        ]}
      >
        <View style={{position: 'absolute', left: 20, right: 0, bottom: 10}}>
          <Text numberOfLines={1} style={styles.largeTitle}>{this.props.largeTitle}</Text>
        </View>
      </Animated.View>
    )
  }

  renderForeground() {
    if (!!this.props.largeTitle || !!this.props.renderLogo || !this.props.renderForeground) {
      return null
    }

    return (
      <Animated.View
        style={[
          { transform: [{ translateY: this.getTitleScale() }] },
          { opacity: this.getOverlayOpacity() }
        ]}>

        <View style={{position: 'absolute', left: 20, right: 20, bottom: 10}}>
          { this.props.renderForeground() }
        </View>
      </Animated.View>
    )
  }

  renderLogo() {
    if (!!this.props.largeTitle || !this.props.renderLogo) {
      return null
    }

    return (
      <Animated.View
        style={[
          { transform: [{ translateY: 0 }]},
          { bottom: -this.getHeaderMaxHeight() },
          { opacity: this.getOverlayOpacity() }
        ]}>

        <View style={{position: 'absolute', left: 20, right: 20, bottom: 0}}>
          { this.props.renderLogo() }
        </View>
      </Animated.View>
    )
  }

  renderNavigation() {
    if (!this.props.renderNavigation) {
      return (null)
    }

    return (
      <Animated.View
        style={[
          styles.bar,
          {
            transform: [
              { translateY: this.getNavigationTranslate() },
            ],
          },
        ]}
      >
        { this.props.renderNavigation() }
      </Animated.View>
    )
  }

  renderProgress() {
    if (!!this.props.enableProgressBar && this.props.progressValue > -1) {
      return (
        <View style={{position: 'absolute', left: 0, right: 0, bottom: -4}}>
          <Progress.Bar progress={this.props.progressValue} borderRadius={0} width={null} color='red' unfilledColor='rgb(19, 93, 153)' borderColor='transparent' />
        </View>
      )
    } else {
      return (null)
    }
  }

  renderHeader() {
    let bgColor = this.props.backgroundColor || DEFAULT_HEADER_COLOR;

    return (
      <Animated.View
        style={[
          styles.header,
          { height: this.getHeaderMaxHeight() },
          { backgroundColor: bgColor, transform: [{ translateY: this.getHeaderTranslate() }] }
        ]}
      >
        { this.renderTitle() }
        { this.renderProgress() }
        { this.renderOverlay() }
        { this.renderLargeTitle() }
        { this.renderLogo() }
        { this.renderForeground() }
      </Animated.View>
    )
  }

  render() {
    return (
      <View style={styles.fill}>
        { this.renderStatusBar() }
        { this.renderContent() }
        { this.renderHeader() }
        { this.renderNavigation()}
      </View>
    );
  }
}

ScrollableHeader.propTypes = {
  renderContent: PropTypes.func,
  renderNavigation: PropTypes.func,
  title: PropTypes.string,
  largeTitle: PropTypes.string,
  renderForeground: PropTypes.func,
  renderLogo: PropTypes.func,
  headerMaxHeight: PropTypes.number,
  backgroundColor: PropTypes.string,
  enableProgressBar: PropTypes.bool,
  progressValue: PropTypes.number,
};

ScrollableHeader.defaultProps = {
  renderContent: () => <View />,
  renderNavigation: null,
  title: null,
  largeTitle: null,
  renderLogo: null,
  renderForeground: null,
  headerMaxHeight: DEFAULT_HEADER_MAX_HEIGHT,
  backgroundColor: null,
  enableProgressBar: false,
  progressValue: 0
};

export default ScrollableHeader;
