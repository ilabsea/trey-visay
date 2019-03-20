import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Thumbnail } from 'react-native-thumbnail-video';
import RF from "react-native-responsive-fontsize";
import {FontSetting} from "../../assets/style_sheets/font_setting";
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
        <View style={styles.row}>
          <Thumbnail
            url={this.props.item.url}
            imageWidth={imageWidth}
            imageHeight={100}
            iconStyle={{width: '20%', height: '30%'}}
            onPress={ this.props.onPress }
          />
          <View style={styles.textContainer}>
            <Text style={styles.title}>{ this.props.item.title }</Text>
            <Text style={styles.source}>{ this.props.item.author }</Text>
          </View>

        </View>
        <Divider style={styles.divider}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    flexDirection: 'row',
  },
  textContainer: {
    flex: 1,
    padding: 8,
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
  },
  title: {
    fontSize: FontSetting.title
  },
  source: {
    fontSize: FontSetting.sub_title,
    color: '#3A3A3A',
    textAlign: 'justify',
  },
  divider: {
    marginLeft: 16
  }
});
