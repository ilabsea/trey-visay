import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Thumbnail } from 'react-native-thumbnail-video';
import RF from "react-native-responsive-fontsize"

export default class VideoList extends Component  {
  constructor(props){
    super(props);
  }
  render(){
    let { width } = Dimensions.get('window');
    let imageWidth = width/2-58;

    return(<View style={styles.row}>
        <Thumbnail
          url={this.props.item.url}
          imageWidth={imageWidth}
          imageHeight={73}
          onPress={ this.props.onPress }
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{ this.props.item.title }</Text>
          <Text style={styles.source}>{ this.props.item.author }</Text>
        </View>
      </View>)
  }
}

const styles = StyleSheet.create({
  row: {
    margin: 8,
    marginBottom: 0,
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
    fontSize: RF(2.4)
  },
  source: {
    fontSize: RF(2),
    color: '#3A3A3A',
    textAlign: 'justify',
  }
});
