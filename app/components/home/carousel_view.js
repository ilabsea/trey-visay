import React, { Component } from 'react';
import {
  View,
  // Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform,
  Image
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Pagination } from 'react-native-snap-carousel';
// Todo:
// import firebase from 'react-native-firebase';

import { FontSetting } from '../../assets/style_sheets/font_setting';
import { Colors } from '../../assets/style_sheets/main/colors';

import CarouselItem from '../shared/carousel_item';
import HomeOptions from './home_options';

import User from '../../utils/user';
import LinearGradient from 'react-native-linear-gradient';
import Ripple from 'react-native-material-ripple';
import { navigate } from '../../screens/StackNav/RootNavigation';
import Text from '../Text';

const { width, height } = Dimensions.get('window');

class CarouselView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0
    }

    this.textBoxHeight = 0;
    this.countView = 0;
  }

  _handleLoginParams(item) {
    let option = Object.assign({}, item);
    option.params = {};

    if (option.url != 'CareerCounsellorStack' && option.url != 'PersonalityAssessmentStack') {
      return option;
    }

    if (!!User.getCurrent()) {
      return option;
    }

    option.params = { screen: 'Login', params: {from: option.url} };
    option.url = 'AccountStack';

    return option
  }

  onPressButton(item) {
    let option = this._handleLoginParams(item);
    // firebase.analytics().logEvent(item.firebase_event_name);
    navigate(option.url, option.params);
  }

  onLayout = (e) => {
    this.countView += 1;
    this.textBoxHeight = Math.max(this.textBoxHeight, e.nativeEvent.layout.height);

    if (this.countView == HomeOptions.length) {
      return this.setState({textBoxHeight: this.textBoxHeight})
    }
  }

  getHeightStyle() {
    return this.state.textBoxHeight > 0 ? { height: this.state.textBoxHeight } : {};
  }

  renderItem(option) {
    let fontSizeStyle = Platform.OS === 'ios' ? {} : {fontSize: FontSetting.nav_title};

    return (
      <Ripple
        onPress={ () => this.onPressButton(option) }>
        <View style={styles.btnBox}>
          <LinearGradient
            colors={option.color}
            start={{x: 0, y: 0}} end={{x: 1, y: 1}}
            style={styles.imageWrapper}>

            <Image
              resizeMode="center"
              source={option.source_image}
            />
          </LinearGradient>

          <View style={[styles.textWrapper, this.getHeightStyle()]} onLayout={this.onLayout} >
            <Text style={styles.btnLabel}>{option.title}</Text>

            <View style={{flexDirection: 'row'}}>
              <Text style={{paddingRight: 4, flex: 1}}>{option.description}</Text>

              <View>
                <TouchableOpacity onPress={() => this.onPressButton(option)} style={styles.btnStart}>
                  <Text style={[fontSizeStyle, {color: '#fff', fontWeight: 'bold'}]}>{option.button_text}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Ripple>
    )
  }

  pagination () {
    const { activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={HomeOptions.length}
        activeDotIndex={activeSlide}
        dotStyle={{
          width: 30,
          height: 12,
          borderRadius: 8,
          marginHorizontal: 1,
          backgroundColor: Colors.blue
        }}
        inactiveDotStyle={{
          width: 12,
          height: 12,
          borderRadius: 8,
          backgroundColor: 'rgb(215, 215, 215)'
        }}
        inactiveDotOpacity={1}
        inactiveDotScale={1}
      />
    );
  }

  render() {
    let opacityStyle = this.state.textBoxHeight > 0 ? {opacity: 1} : {opacity: 0};

    return (
      <View style={[styles.container, opacityStyle]}>
        <View style={{flex: 1}}>
          <CarouselItem
            noStyle={true}
            width='90%'
            height='100%'
            data={HomeOptions}
            enableSnap={true}
            renderItem={({item}) => this.renderItem(item)}
            onSnapToItem={(index) => this.setState({ activeSlide: index }) }
            activeSlideAlignment='center'/>
        </View>

        { this.pagination() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22,
    flex: 1,
  },
  btnBox: {
    borderRadius:12,
    backgroundColor: 'white',
    width: wp('88%'),
    height: '100%',
    overflow: 'hidden'
  },
  textWrapper:{
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  btnLabel: {
    fontSize: FontSetting.big_title,
    fontWeight:'bold',
    // fontFamily: 'KantumruyBold',
    ...Platform.select({
      android: {
        lineHeight: 48,
      }
    })
  },
  imageWrapper: {
    flex: 1,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnStart: {
    backgroundColor: Colors.blue,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    minWidth: 76
  }
});

export default CarouselView;
