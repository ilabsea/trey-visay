import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Platform
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import StatusBar from '../status_bar';
import { FontSetting } from '../../../assets/style_sheets/font_setting';
import HomeOptions from './home_options';

const { width, height } = Dimensions.get('window');

class CarouselView extends Component {
  constructor(props) {
    super(props);
  }

  renderItem(options) {
    console.log('this.props.user : ',this.props.user);
    if(!!this.props.user && options.url=='CareerCounsellorStack'){
      console.log('here')
      options.url = 'AccountStack';
    }
    console.log('options : ', options.url);
    return (
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate(options.url)}
        style={styles.btnBox}>
        <View style={[styles.btnFab, { backgroundColor: options.icon_bg_color }]}>
          { !(options.icon_type == 'material') &&
            <AwesomeIcon style={styles.icon} name={options.icon_name} size={40} color='#fff' />
          }

          { options.icon_type == 'material' &&
            <MaterialIcon style={styles.icon} name={options.icon_name} size={44} color='#fff' />
          }
        </View>
        <Text style={styles.btnLabel}>{options.title}</Text>
        <Text style={styles.btnDescription}>{options.description}</Text>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.scrollContainer}>
        <StatusBar />
        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={HomeOptions}
          renderItem={({item}) => this.renderItem(item)}
          sliderWidth={width}
          itemWidth={width-80}
          layout={'default'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    marginTop: 22
  },
  btnBox: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius:16,
  },
  btnLabel: {
    color: '#1976d2',
    width: '100%',
    fontSize: FontSetting.big_title,
    textAlign: 'center',
    ...Platform.select({
      android: {
        lineHeight: 48,
      }
    })
  },
  btnDescription: {
    fontSize: FontSetting.dashboard_subtitle,
    padding: 8
  },
  btnFab: {
    width: width - 80,
    height: height/2 - 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius:16,
    borderTopRightRadius:16,
  }
});

export default CarouselView;
