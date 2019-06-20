import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform,
  Image
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Pagination } from 'react-native-snap-carousel';

import { FontSetting } from '../../assets/style_sheets/font_setting';
import { Colors } from '../../assets/style_sheets/main/colors';

import CarouselItem from '../shared/carousel_item';
import HomeOptions from './home_options';
import User from '../../utils/user';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

class CarouselView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0
    }
  }

  _handleLoginOption(item) {
    let option = Object.assign({}, item);
    option.params = {};

    if (option.url != 'CareerCounsellorStack' && option.url != 'PersonalityAssessmentStack') {
      return option;
    }

    if (!!User.getCurrent()) {
      return option;
    }

    option.params = { from: option.url + "" };
    option.url = 'AccountStack';

    return option
  }

  onPressButton(item) {
    let option = this._handleLoginOption(item);
    this.props.navigation.navigate(option.url, option.params);
  }

  renderItem(option) {
    return (
      <TouchableOpacity
        onPress={ () => this.onPressButton(option) }
        style={styles.btnBox}>

        <LinearGradient
          colors={option.color}
          start={{x: 0, y: 0}} end={{x: 1, y: 1}}
          style={styles.imageWrapper}>
          <Image
            style={styles.btnImage}
            resizeMode="contain"
            source={option.source_image}
          />
        </LinearGradient>


        <View style={styles.textWrapper}>
          <Text style={styles.btnLabel}>{option.title}</Text>
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            <Text style={{width: wp('58%'), paddingRight: 4}}>{option.description}</Text>
            <TouchableOpacity onPress={() => this.onPressButton(option)} style={styles.btnStart}>
              <Text style={{color: '#fff'}}>{option.button_text}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
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
    return (
      <View style={styles.container}>
        <CarouselItem
          noStyle={true}
          width='90%'
          data={HomeOptions}
          renderItem={({item}) => this.renderItem(item)}
          onSnapToItem={(index) => this.setState({ activeSlide: index }) }
          activeSlideAlignment='center'/>

        { this.pagination() }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 22
  },
  btnBox: {
    borderRadius:12,
    backgroundColor: 'white',
    width: wp('88%'),
    height: hp('74%'),
    overflow: 'hidden'
  },
  textWrapper:{
    marginLeft: 16,
    marginTop:16
  },
  btnLabel: {
    fontSize: FontSetting.big_title,
    fontWeight: 'bold',
    ...Platform.select({
      android: {
        lineHeight: 48,
      }
    })
  },
  imageWrapper: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  btnImage: {
    width: wp('70%'),
    height: hp('50%'),
    alignSelf: 'center'
  },
  btnStart: {
    backgroundColor: Colors.blue,
    borderRadius: 12,
    width: wp('20%'),
    height: hp('8%'),
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CarouselView;
