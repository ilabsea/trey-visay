import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { FontSetting } from "../../assets/style_sheets/font_setting";
import ButtonList from '../list/button_list';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Text from '../Text';

const { width, height } = Dimensions.get('window');

export default class CareerItem extends Component  {
  constructor(props){
    super(props);
  }

  renderItem(item, index){
    return(
      <TouchableOpacity style={styles.btnBox} key={index}
        onPress={() => {
          this.props.navigation.navigate('ShowCategoryScreen', {
            career: item
          })
        }}>
        <View style={styles.btnImage} >
        </View>
        <View style={styles.textContainer}>
          <Text>{ item.name }</Text>
        </View>
      </TouchableOpacity>
    )
  }

  renderMainItem(){
    let cluster = this.props.cluster;
    return (
      <ButtonList
        hasLine={false}
        onPress={() => {
          this.props.navigation.navigate('CareerIndexScreen', {
            code: cluster.code,
            title: cluster.name_kh
          })
        }}
        title={cluster.name_kh} />
    )
  }

  renderCarousel(){
    return(
      <View style={{paddingLeft: 16}}>
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.props.careers}
          renderItem={({item, index}) => this.renderItem(item, index)}
          sliderWidth={width}
          itemWidth={wp('45%')}
          layout={'default'}
          layoutCardOffset={'9'}
          activeSlideAlignment='start'
        />
      </View>
    )
  }

  render(){
    return(
      <View>
        { this.renderMainItem() }
        { this.renderCarousel() }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1
  },
  btnBox: {
    backgroundColor: '#D0D0D0',
    borderRadius:16,
    height: hp('28%')
  },
  btnImage: {
    width: wp('45%'),
    height: hp('20%'),
    borderTopLeftRadius:16,
    borderTopRightRadius:16,
    backgroundColor: 'gray',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: wp('40%'),
    alignSelf: 'center'
  }
});
