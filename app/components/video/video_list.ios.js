import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Thumbnail } from 'react-native-thumbnail-video';

export default class VideoList extends Component  {
  constructor(props){
    super(props);
  }
  render(){
    let { width } = Dimensions.get('window');
    let imageWidth = width/2-48;

    return(<View style={styles.row}>
        <Thumbnail
          url={this.props.item.url}
          imageWidth={imageWidth}
          imageHeight={78}
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
    height: 78,
    flex: 1,
    flexDirection: 'row'
  },
  textContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    padding: 8,
    fontSize: 12
  },
  source: {
    padding: 8,
    marginTop: -12,
    fontSize: 10,
    color: '#3A3A3A'
  }
});
