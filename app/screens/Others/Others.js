import React, { Component } from 'react';
import {
  View
} from 'react-native';
import ButtonList from '../../components/list/button_list';

export default class Others extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <View>
        <View style={{marginTop: 16, backgroundColor: 'white'}}>
          <ButtonList
            hasLine={true}
            icon={{color: 'rgb(24, 118, 211)', src: require('../../assets/icons/others/info.png')}}
            onPress={() => { this.props.navigation.navigate('About') }}
            title='អំពីកម្មវិធី' />
          <ButtonList
            hasLine={true}
            icon={{color: 'rgb(245, 166, 35)', src: require('../../assets/icons/others/key.png')}}
            onPress={() => { this.props.navigation.navigate('ChangePassword') }}
            title='ផ្លាស់ប្តូរលេខសំងាត់' />
        </View>

        <View style={{marginTop: 16, backgroundColor: 'white'}}>
          <ButtonList
            hasLine={true}
            icon={{color: 'rgb(172, 175, 193)', src: require('../../assets/icons/others/term_condition.png')}}
            onPress={() => { this.props.navigation.navigate('TermsCondition') }}
            title='Terms & Conditions' />
        </View>

        <View style={{marginTop: 16, backgroundColor: 'white'}}>
          <ButtonList
            hasLine={true}
            icon={{color: 'rgb(238, 18, 45)', src: require('../../assets/icons/others/logout.png')}}
            onPress={() => { this.props.navigation.navigate('TermsCondition') }}
            title='ចាកចេញ' />
        </View>
      </View>
    );
  }
}
