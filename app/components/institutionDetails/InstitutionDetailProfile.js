import React from 'react';
import { StyleSheet, View } from 'react-native';

import { FontSetting } from '../../assets/style_sheets/font_setting';
import InstitutionDetailLogo from './InstitutionDetailLogo';
import Text from '../Text';

const InstitutionDetailProfile = ({profileSize, name, category, schoolLogo}) => {
  const CATEGORIES = { public: 'សាលារដ្ឋ', private: 'សាលាឯកជន', ngo: 'អង្គការ', default: '' }
  return (
    <View>
      <View style={[styles.bottomLogo, {top: -profileSize/2}]}>
        <InstitutionDetailLogo profileSize={profileSize} schoolLogo={schoolLogo}/>
      </View>

      <View style={{marginTop: 67}}>
        <Text style={[styles.largeTitle]}>{name}</Text>
        <Text style={styles.subTitle}>{CATEGORIES[category] || CATEGORIES.default}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomLogo: {
    position: 'absolute',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  largeTitle: {
    textAlign: 'center',
    paddingTop: 20,
    paddingHorizontal: 16,
    fontSize: FontSetting.big_title,
    color: 'black'
  },
  subTitle: {
    textAlign: 'center',
    color: 'rgb(155, 155, 155)'
  }
});

export default InstitutionDetailProfile