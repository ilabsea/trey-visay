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
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import BackConfirmDialog from '../../components/shared/back_confirm_dialog';
import CloseButton from '../../components/shared/close_button';
import FooterBar from '../../components/footer/FooterBar';
import CardItem from '../../components/list/card_item';
import CarouselItem from '../../components/shared/carousel_item';
import ButtonList from '../../components/list/button_list';

import mainStyles from '../../assets/style_sheets/main/main';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';
import Images from '../../assets/images';

import realm from '../../db/schema';
import User from '../../utils/user';

import careerCategory from '../../data/json/characteristic_jobs';

export default class CategoriesScreen extends Component {
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
    this.setState({confirmDialogVisible: false});
    this.props.navigation.dispatch({type: 'Navigation/RESET', index: 0, key: null, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorScreen'}]});
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);

      this._onYes();
    });
  }

  renderItem(career, index){
    return(
      <CardItem text={career.name} index={index}
        onPress={() => this.props.navigation.navigate('ShowCategoryScreen', {
          career: career
        })} />
    )
  }

  renderCareer(careerTypeObj, i) {
    return (
      <View>
        <ButtonList hasLine={false} title={careerTypeObj.career_title}
          onPress={() => {
            this.props.navigation.navigate('ShowCategoryScreen', {careerId: careerTypeObj.id})
          }} />
          <CarouselItem
            data={careerTypeObj.careers}
            renderItem={({item, index}) => this.renderItem(item, index)}/>
      </View>
    )
  }

  renderContent() {
    return (
      <View>
        { careerCategory.slice(0, 3).map((careerType, i) => {
          { return (this.renderCareer(careerType, i))}
        })}
      </View>
    )
  }

  render() {
    return(
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <ScrollView style={{flex: 1}}>
          { this.renderContent() }
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
