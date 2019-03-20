import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { Thumbnail } from 'react-native-thumbnail-video';

export default class VideoList extends Component  {
  constructor(props){
    super(props);
  }

  render(){
    let { width } = Dimensions.get('window');
    let imageWidth = width/2-24;

    return(<TouchableOpacity style={styles.row} onPress={this.props.onPress }>
        <Thumbnail
          url={this.props.item.url}
          imageWidth={imageWidth}
        />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{ this.props.item.title }</Text>
          <Text style={styles.title}>{ this.props.item.author }</Text>
        </View>
      </TouchableOpacity>)
  }
}

const styles = StyleSheet.create({
  row: {
    margin: 8,
    marginBottom: 0,
    flex: 1,
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    padding: 10
  }
});
