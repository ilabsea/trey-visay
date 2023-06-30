import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Colors } from '../../../assets/style_sheets/main/colors';
import {Text} from '../../../components';

const FilterButton = (props) => {
  let active = props.selectedItem == props.item;
  let activeIconBg = active ? { backgroundColor: Colors.blue }: { backgroundColor: Colors.gray };
  let activeText = active ? { color: Colors.blue }: '';

  return <TouchableOpacity style={[styles.btn, props.style]} onPress={() => props.updateSelectedItem(props.selectedItem == props.item ? '' : props.item)}>
            <View style={[styles.iconWrapper, activeIconBg]}>
              <Image
                source={require("../../../assets/icons/school/major.png")}
                resizeMode='contain'
                style={styles.icon}
              />
            </View>
            <Text numberOfLines={2} style={[activeText, { flex: 1 , paddingRight: 16, lineHeight: 28}]}>{props.label}</Text>
          </TouchableOpacity>
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
    marginRight: 16,
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:  'rgb(155, 155, 155)'
  },
  icon:{
    width: 18,
    height: 18
  }
})

export default FilterButton;