import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';

class ImageButton extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let selected = this.props.selected ? { backgroundColor : 'red' }: '';
    return(
      <View>
        <TouchableOpacity style={[styles.touchBtn, selected]} onPress={this.props.onPress}>
          <Image
            source={require('../../assets/images/cat.jpg')}
            style={styles.image} />
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
     width: 100,
     height: 100,
     borderRadius: 5
  },
  touchBtn:{
    marginRight: 20
  }
})

export default ImageButton;
