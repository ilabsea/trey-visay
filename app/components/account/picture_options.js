import React, {Component} from 'react';
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import ImageButton from './image_button';

class PictureOptions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: [true, false]
    }
  }

  setValue(val){
    this.props.user[this.props.stateName] = val;
    this.setStyle(val);
  }

  setStyle(val){
    let selectedValues = val == 'ប្រុស' ? {selected: [true, false]} : {selected:[false, true]};
    this.setState(selectedValues);
  }

  render() {
    return(
      <View>
        <Text style={styles.label}> ភេទ </Text>
        <View style={styles.imageContainer}>
          <ImageButton onPress={() => this.setValue('ប្រុស') } selected={this.state.selected[0]} />
          <ImageButton onPress={() => this.setValue('ស្រី') }  selected={this.state.selected[1]}  />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row'
  },
  label:{
    color: '#A9A9A9'
  }
})

export default PictureOptions;
