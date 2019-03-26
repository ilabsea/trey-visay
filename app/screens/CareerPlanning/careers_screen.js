import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  BackHandler,
  Platform
} from 'react-native';

import { Divider } from 'react-native-elements';
import { NavigationActions } from 'react-navigation';

import mainStyles from '../../assets/style_sheets/main/main';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';
import Images from '../../assets/images';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import careerList from '../../data/json/characteristic_jobs';
import BackConfirmDialog from '../../components/shared/back_confirm_dialog';
import CloseButton from '../../components/shared/close_button';
import FooterBar from '../../components/FooterBar';


import realm from '../../db/schema';
import User from '../../utils/user';

export default class CareersScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDialogVisible: false,
      game: null
    }
  }

  componentWillMount() {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];
    this.setState({game : game});
    this.props.navigation.setParams({
      _handleBack: this._handleBack.bind(this),
      goNext: this._goNext.bind(this)
    });
    this._backHandler();
  }

  _handleBack() {
    this.setState({confirmDialogVisible: true});
  }

  _backHandler() {
    BackHandler.addEventListener('hardwareBackPress', this._onClickBackHandler);
  }

  _onClickBackHandler = () => {
    this.setState({confirmDialogVisible: true});
    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    return true
  }

  _goNext() {
    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    this.props.navigation.navigate('SubjectScreen');
  }

  _onYes() {
    this._closeDialog();
  }

  _closeDialog() {
    this.setState({confirmDialogVisible: false});
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'AssessmentScreen' }), NavigationActions.navigate({ routeName: 'CareerCounsellorScreen' })], 1)
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);

      this._closeDialog();
    });
  }

  _renderCareer(career, i) {
    return (
      <View key={i}>
        <TouchableOpacity
          style={mainStyles.btnList}
          onPress={() => {this.props.navigation.navigate('CareerDetailScreen',{careerId: career.id})}}
        >
          <Image source={Images[career.logoName]} style={{width: 30, height: 30, marginRight: 16}} />
          <Text style={mainStyles.title}>{career.career_title}</Text>
          <AwesomeIcon name='angle-right' size={24} color='#bbb' />
        </TouchableOpacity>
        <Divider style={{marginLeft: 58}}/>
      </View>
    )
  }

  _renderContent() {
    return (
      <View>
        { careerList.slice(0, 3).map((career, i) => {
          { return (this._renderCareer(career, i))}
        })}
      </View>
    )
  }

  render() {
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView style={{flex: 1}}>
          { this._renderContent() }
        </ScrollView>

        <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={this._goNext.bind(this)} />

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
      </View>
    );
  };
}
