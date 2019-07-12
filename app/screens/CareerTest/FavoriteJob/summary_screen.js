import React, { Component } from 'react';
import {
  View,
  Text,
  BackHandler,
  Platform,
  Image,
  TouchableOpacity,
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';
import { NavigationActions } from 'react-navigation';
import { Divider } from 'react-native-elements';

import RadioButtonGroup from '../../../components/radio_button_group';
import BackConfirmDialog from '../../../components/shared/back_confirm_dialog';
import FooterBar from '../../../components/footer/FooterBar';

import mainStyles from '../../../assets/style_sheets/main/main';

import realm from '../../../db/schema';
import User from '../../../utils/user';
import characteristicList from '../../../data/json/characteristic_jobs';

import ScrollableHeader from '../../../components/scrollable_header';
import scrollHeaderStyles from '../../../assets/style_sheets/scroll_header';
import * as Progress from 'react-native-progress';
import ProgressStep from '../ProgressStep/ProgressStep';
import CloseButton from '../../../components/shared/close_button';
import { Radio } from 'native-base';
import Images from '../../../assets/images_js/careers_images';
import {Colors} from '../../../assets/style_sheets/main/colors';

export default class SummaryScreen extends Component {
  constructor(props) {
    super(props);

    this.props.navigation.setParams({
      _handleBack: this._handleBack.bind(this),
      goNext: this._goNext.bind(this)
    });
    this._initState();
    this._backHandler();
  }

  _initState() {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];
    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);
    let careerCodes = game.personalityCareers.map((obj) => obj.value);
    let userCareers = currentGroup.careers.filter((item, pos) => { return careerCodes.includes(item.code) });

    this.state = {
      userCareers: userCareers,
      currentGroup: currentGroup,
      user: user,
      game: game,
      confirmDialogVisible: false,
      mostFavorableJob: game.mostFavorableJobCode,
    };
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

  _onYes() {
    realm.write(() => {
      realm.create('Game', this._buildData('SummaryScreen'), true);
      this._closeDialog();
    });
  }

  _closeDialog() {
    this.setState({confirmDialogVisible: false});
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'CareerCounsellorScreen' })])
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.game);
      this._closeDialog();
    });
  }

  _buildData(step) {
    let obj =  {
      uuid: this.state.game.uuid,
      mostFavorableJobCode: this.state.mostFavorableJob || null,
      goalCareer: this.state.mostFavorableJob && this.state.currentGroup.careers.find((obj) => obj.code == this.state.mostFavorableJob).name || null,
      step: step || 'RecommendationScreen'
    }

    return obj;
  }

  _formatDataForCheckbox(jobs) {
    return jobs.map(job => { return { value: job.code, label: job.name, image_name: job.image_name }})
  }

  _goNext() {
    if (!this.state.mostFavorableJob) {
      return this.refs.toast.show('សូូមជ្រើសរើសមុខរបរចំនួន 1!', DURATION.SHORT);
    }

    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    this._handleSubmit();
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData('RecommendationScreen'), true);
      this.props.navigation.navigate('RecommendationScreen');
    });
  }

  _renderList = () => {
    let careers = this._formatDataForCheckbox(this.state.userCareers);

    return (
      <View style={{paddingHorizontal: 20}}>
        { careers.map((career, index)=> {
          let imageUrl = Images.default;
          if (!!career.image_name) { imageUrl = Images[career.image_name] }

          return (
            <TouchableOpacity onPress={() => this.setState({mostFavorableJob: career.value})} key={index} style={mainStyles.thumnailList}>
              <Image
                style={{width: 78, height: 78, borderTopLeftRadius: 8, borderBottomLeftRadius: 8}}
                source={imageUrl} />
              <Text style={{flex: 1, paddingHorizontal: 18}}>{career.label}</Text>
              <Radio selected={career.value == this.state.mostFavorableJob} />
            </TouchableOpacity>
          )
        })}
      </View>
    )
  }

  _renderContent = () => {
    return (
      <View>
        <View style={{flexDirection: 'row', padding: 16, paddingBottom: 10}}>
          <Text style={{flex: 1}}>ចូរប្អូនជ្រើសរើស មុខរបរ ឬការងារ ១ដែលប្អូនចូលចិត្តបំផុត ដើម្បីដាក់គោលដៅ និងផែនការអនាគត!</Text>
        </View>

        { this._renderList() }
      </View>
    )
  }

  _renderNavigation = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <CloseButton navigation={this.props.navigation}/>
        <Text style={scrollHeaderStyles.whiteNavTitle}>ជ្រើសរើសមុខរបរពីតារាងសង្ខេបលទ្ធផល</Text>
      </View>
    )
  }

  _renderForeground = () => {
    return (
      <View>
        <ProgressStep progressIndex={3} />

        <View>
          <View style={scrollHeaderStyles.progressTextWrapper}>
            <Text style={scrollHeaderStyles.progressText}>ឆ្លើយរួចរាល់</Text>
          </View>

          <Progress.Bar progress={!!this.state.mostFavorableJob + 0} width={null} color='#fff' unfilledColor='rgb(19, 93, 153)' borderColor='transparent' />
        </View>
      </View>
    );
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollableHeader
          backgroundColor={Colors.blue}
          textColor={'#fff'}
          statusBarColor={Colors.blueStatusBar}
          barStyle={'light-content'}
          renderContent={ this._renderContent }
          renderNavigation={ this._renderNavigation }
          renderForeground={this._renderForeground }
          headerMaxHeight={162}
          enableProgressBar={true}
          progressValue={!!this.state.mostFavorableJob + 0}
        />

        <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={this._goNext.bind(this)} />

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </View>
    )
  };
}
