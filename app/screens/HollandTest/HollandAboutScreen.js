import React from 'react';
import {
  View,
  StyleSheet,
  Image,
} from 'react-native';

import mainStyles from '../../assets/style_sheets/main/main';
import Text from '../../components/Text';
import CustomNavigationHeader from '../../components/shared/CustomNavigationHeader';
import {screenHorizontalPadding} from '../../constants/component_constant';

const HollandAboutScreen = ({route, navigation}) => {
  renderContent = () => {
    return (
      <View style={{padding: screenHorizontalPadding, paddingTop: 8, backgroundColor: 'white', flex: 1}}>
        <Text style={{marginBottom: 10}}>
          ធ្វើតេស្តវាយតម្លៃមុខរបរ និងអាជីព ដើម្បីដឹងពីចំណង់ចូលចិត្ត ទេពកោសល្យ និងអាជីពដែលស័ក្តិសមសំរាប់អ្នកនៅពេលអនាគត
        </Text>
        <View style={styles.rowWrapper}>
          <View style={[styles.imageWrapper, mainStyles.boxShadow]}>
            <Image style={{width: 18, height: 24}} source={require('../../assets/images/career_tests/personality.png')} />
          </View>

          <Text>១. ស្វែងយល់អំពីខ្លួន</Text>
        </View>
        <View style={styles.rowWrapper}>
          <View style={[styles.imageWrapper, mainStyles.boxShadow]}>
            <Image source={require('../../assets/images/career_tests/careers.png')} />
          </View>
          <Text>២. វាយតម្លៃផែនការមុខរបរ</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      <CustomNavigationHeader title='អំពីការវាយតម្លៃមុខរបរនិងអាជីព' headerStyle={{zIndex: 1}} />
      {renderContent()}
    </View>
  )
}

export default HollandAboutScreen

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  imageWrapper: {
    width: 64,
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14
  },
})
