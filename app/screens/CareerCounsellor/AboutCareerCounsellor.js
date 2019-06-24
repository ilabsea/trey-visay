import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import { Container, Content } from 'native-base';
import mainStyles from '../../assets/style_sheets/main/main';

export default class AboutCareerCounsellor extends Component {
  _renderContent = () => {
    return (
      <Content style={{padding: 20}}>
        <Text>
          ធ្វើតេស្តវាយតម្លៃមុខរបរ​ និងអាជីព ដើម្បីដឹងពីចំណង់​ចូលចិត្ត​​ ទេពកោសល្យ និងអាជីពដែលស័ក្តិសមសំរាប់អ្នកនៅពេលអនាគត
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
      </Content>
    )
  }

  render() {
    return (
      <Container>
        {this._renderContent()}
      </Container>
    )
  }
}

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
