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
import mainStyles from "../../assets/style_sheets/main/main";

export default class VideoView extends Component  {
  render(){
    let { width } = Dimensions.get('window');
    let imageWidth = width-80;

    return(
      <View>
        <TouchableOpacity style={styles.row} onPress={ this.props.onPress }>
          <Thumbnail
            url={this.props.item.url}
            imageWidth={imageWidth}
          />
          <View style={styles.textContainer}>
            <Text style={mainStyles.title}>{ this.props.item.title }</Text>
            <Text style={styles.source}>{ this.props.item.author }</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  row: {
    marginBottom: 0,
    flex: 1
  },
  textContainer: {
    padding: 8,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: FontSetting.title
  },
  source: {
    fontSize: FontSetting.sub_title,
    color: '#3A3A3A',
    textAlign: 'justify',
  }
});
