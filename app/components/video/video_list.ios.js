import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Thumbnail } from 'react-native-thumbnail-video';
import { FontSetting } from "../../assets/style_sheets/font_setting";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-elements';

export default class VideoList extends Component  {
  constructor(props){
    super(props);
  }
  render(){
    let { width } = Dimensions.get('window');
    let imageWidth = width/2-58;

    return(
      <View>
        <TouchableOpacity style={styles.row} onPress={ this.props.onPress }>
          <Thumbnail
            url={this.props.item.url}
            imageWidth={imageWidth}
            imageHeight={100}
            iconStyle={{width: '20%', height: '30%'}}
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{ this.props.item.title }</Text>
            <Text style={styles.source}>{ this.props.item.author }</Text>
          </View>

          <View style={{alignSelf: 'center'}}>
            <AwesomeIcon name='angle-right' size={24} color='#bbb'/>
          </View>
        </TouchableOpacity>
        <Divider style={styles.divider}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 16
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
    marginRight: 16
  },
  title: {
    fontSize: FontSetting.title
  },
  source: {
    fontSize: FontSetting.sub_title,
    color: '#3A3A3A',
  },
  icon: {
    alignSelf: 'center',
  },
  divider: {
    marginLeft: 100
  }
});
