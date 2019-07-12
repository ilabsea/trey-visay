import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import mainStyles from "../../assets/style_sheets/main/main";
import { Colors } from "../../assets/style_sheets/main/colors";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class GridList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedValue: ''
    }
  }

  setActive(value){
    this.setState({selectedValue: value});
  }

  render() {
    let icon = this.props.icon ? require('../../assets/icons/school/all_major.png') : require('../../assets/icons/school/major.png');
    let active = this.state.selectedValue == this.props.data;
    let activeIconBg = active ? { backgroundColor: Colors.blue }: null;
    let activeText = active ? { color: Colors.blue }: null;

    return (
      <TouchableOpacity
        style={styles.btn}
        onPress={() => this.setActive(this.props.data)}>
        <View style={[styles.iconWrapper, {activeIconBg}]}>
          <Image
            source={icon}
            resizeMode='contain'
            style={styles.icon}
          />
        </View>
        <Text style={activeText}>{this.props.data}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    width: wp('50%'),
    height: hp('10%'),
    backgroundColor: 'white',
    borderColor: 'rgb(200, 199, 204)',
    borderWidth: 0.5,
    alignItems: 'center'
  },
  iconWrapper:{
    width: 32,
    height: 32,
    borderRadius: 12,
    backgroundColor:  'rgb(155, 155, 155)',
    marginRight: 16,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon:{
    width: 18,
    height: 18
  }
})

export default GridList;
