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

import StatusBar from '../shared/status_bar';
import { FontSetting } from '../../assets/style_sheets/font_setting';
import CarouselItem from '../shared/carousel_item';
import HomeOptions from './home_options';

const { width, height } = Dimensions.get('window');

class CarouselView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeSlide: 0
    }
  }

  renderItem(options) {
    if(!this.props.user && options.url=='CareerCounsellorStack'){
      options.url = 'AccountStack';
    }
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(options.url)}
        style={styles.btnBox}>
        <View style={[styles.imageWrapper, { backgroundColor: options.background_color }]}>
          <Image
            style={styles.btnImage}
            resizeMode="contain"
            source={options.source_image}
          />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.btnLabel}>{options.title}</Text>
          { options.has_start_btn &&
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              <Text style={{width: wp('54%')}}>{options.description}</Text>
              <TouchableOpacity onPress={() => this.props.navigation.navigate(options.url)} style={styles.btnStart}>
                <Text style={{color: '#fff'}}>ចាប់ផ្តេីម</Text>
              </TouchableOpacity>
            </View>
          }

          { !options.has_start_btn && <Text>{options.description}</Text> }

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
          backgroundColor: 'rgb(24, 118, 211)'
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
        <StatusBar />
        <CarouselItem
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
    height: hp('68%'),
  },
  textWrapper:{
    marginLeft: 16,
    marginTop: 16,
    justifyContent: 'center'
  },
  btnLabel: {
    fontSize: FontSetting.big_title,
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
    width: wp('84%'),
    height: hp('42%'),
    alignSelf: 'center'
  },
  btnStart: {
    backgroundColor: 'rgb(24, 118, 211)',
    borderRadius: 12,
    width: wp('26%'),
    height: hp('8%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center'
  }
});

export default CarouselView;
