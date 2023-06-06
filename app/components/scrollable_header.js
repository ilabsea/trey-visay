// https://github.com/janicduplessis/react-native-scrollable-header
import React, { Component } from 'react';
import {
  Animated,
  StatusBar,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import PropTypes from 'prop-types';
import scrollableHeaderUtil from '../utils/scrollable_header_util';

import ScrollableHeaderMain from './scrollableHeaders/ScrollableHeaderMain';
import ScrollableHeaderNavigation from './scrollableHeaders/ScrollableHeaderNavigation'
// import { Header } from 'react-navigation';
// import { useHeaderHeight } from '@react-navigation/elements';

// Todo:
// const headerHeight = useHeaderHeight();

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
  }
});

class ScrollableHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollY: new Animated.Value(0),
    };
  }

  renderStatusBar() {
    let bgColor = this.props.statusBarColor || 'rgba(0, 0, 0, 0.251)';
    let barStyle = this.props.barStyle || 'dark-content';
    return (
      <StatusBar
        backgroundColor={bgColor}
        barStyle={barStyle}
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
        )}
      >
        <View style={[{ marginTop: scrollableHeaderUtil.getContentMarginTop(this.props.headerMaxHeight)}]}>
          { this.props.renderContent() }
        </View>
      </Animated.ScrollView>
    );
  }

  renderNavigation() {
    return <ScrollableHeaderNavigation
              scrollY={this.state.scrollY}
              headerMaxHeight={this.props.headerMaxHeight}
              renderNavigation={this.props.renderNavigation}
           />
  }

  renderHeader() {
    return <ScrollableHeaderMain
              backgroundColor={this.props.backgroundColor}
              progressValue={this.props.progressValue}
              enableProgressBar={this.props.enableProgressBar}
              largeTitle={this.props.largeTitle}
              title={this.props.title}
              scrollY={this.state.scrollY}
              headerMaxHeight={this.props.headerMaxHeight}
              textColor={this.props.textColor}
              renderLogo={this.props.renderLogo}
              renderForeground={this.props.renderForeground}
              overlayBgColor={this.props.overlayBgColor}
              headerStyle={this.props.headerStyle}
           />
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <React.Fragment>
          { this.renderStatusBar() }
          { this.renderNavigation()} 
          { this.renderContent() }
          { this.renderHeader() }
        </React.Fragment>
      </TouchableWithoutFeedback>
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
  overlayBgColor: PropTypes.string,
  textColor: PropTypes.string,
  headerStyle: PropTypes.object
};

ScrollableHeader.defaultProps = {
  renderContent: () => <View />,
  renderNavigation: null,
  title: null,
  largeTitle: null,
  renderLogo: null,
  renderForeground: null,
  headerMaxHeight: 0,
  backgroundColor: null,
  enableProgressBar: false,
  progressValue: 0,
  overlayBgColor: null,
  textColor: null,
  headerStyle: {}
};

export default ScrollableHeader;
