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

import StatusBar from '../status_bar';
import { FontSetting } from '../../../assets/style_sheets/font_setting';
import CarouselItem from '../carousel_item';
import HomeOptions from './home_options';

const { width, height } = Dimensions.get('window');

class CarouselView extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    this.state = {
      activeSlide: 0
    }
  }

  renderItem(options) {
    if(!!this.props.user && options.url=='CareerCounsellorStack'){
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
          <Text style={styles.btnDescription}>{options.description}</Text>
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
          width='92%'
          data={HomeOptions}
          renderItem={({item}) => this.renderItem(item)}
          onSnapToItem={(index) => this.setState({ activeSlide: index }) }/>

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
    height: hp('64%'),
  },
  textWrapper:{
    padding: 16
  },
  btnLabel: {
    fontSize: FontSetting.big_title,
    ...Platform.select({
      android: {
        lineHeight: 48,
      }
    })
  },
  btnDescription: {
    fontSize: FontSetting.dashboard_subtitle,
  },
  imageWrapper: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  },
  btnImage: {
    width: wp('84%'),
    height: hp('44%'),
    alignSelf: 'center'
  }
});

export default CarouselView;
