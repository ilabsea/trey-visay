import React, { Component } from 'react';
import {
  View
} from 'react-native';
import ButtonList from '../../components/list/button_list';
import User from '../../utils/user';
import { Colors } from '../../assets/style_sheets/main/colors';

export default class Others extends Component {
  constructor(props){
    super(props);

    this.state = {
      user: User.getCurrent()
    }
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('didFocus', (payload) => this.componentDidFocus(payload)),
    ];
  }

  componentDidFocus() {
    this.setState({user: User.getCurrent()});
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  _logOut() {
    User.logout(() => {
      this.setState({user: false})
      this.props.navigation.navigate('Home');
    })
  }

  render() {
    return (
      <View>
        <View style={{marginTop: 16, backgroundColor: 'white'}}>
          <ButtonList
            hasLine={true}
            icon={{color: Colors.blue, src: require('../../assets/icons/others/info.png')}}
            onPress={() => { this.props.navigation.navigate('About') }}
            title='អំពីកម្មវិធី' />
          { !!this.state.user &&
            <ButtonList
              hasLine={true}
              icon={{color: 'rgb(245, 166, 35)', src: require('../../assets/icons/others/key.png')}}
              onPress={() => { this.props.navigation.navigate('ChangePassword') }}
              title='ផ្លាស់ប្តូរលេខសំងាត់' />
          }
        </View>

        <View style={{marginTop: 16, backgroundColor: 'white'}}>
          <ButtonList
            hasLine={true}
            icon={{color: 'rgb(172, 175, 193)', src: require('../../assets/icons/others/term_condition.png')}}
            onPress={() => { this.props.navigation.navigate('TermsCondition') }}
            title='Terms & Conditions' />
        </View>

        { !!this.state.user &&
          <View style={{marginTop: 16, backgroundColor: 'white'}}>
            <ButtonList
              hasLine={true}
              icon={{color: 'rgb(238, 18, 45)', src: require('../../assets/icons/others/logout.png')}}
              onPress={() => { this._logOut() }}
              title='ចាកចេញ' />
          </View>
        }
      </View>
    );
  }
}
