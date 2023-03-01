import React, {Component} from 'react';
import {
  Text,
  View,
  Platform,
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';

import store from '../../../redux/store';
import PersonalUnderstandingScore from './PersonalUnderstandingScore';
import Form from './_Form';
import realm from '../../../db/schema';
import User from '../../../utils/user';
import uuidv4 from '../../../utils/uuidv4';

import { Container, Header, Content, ListItem, Thumbnail, Left, Body, Right, Icon, Card, CardItem, Title, Button } from 'native-base';

import ScrollableHeader from '../../../components/scrollable_header';
import scrollHeaderStyles from '../../../assets/style_sheets/scroll_header';
import * as Progress from 'react-native-progress';
import FooterBar from '../../../components/footer/FooterBar';
import Result from './Result';
import BackButton from '../../../components/shared/back_button';
import { Colors } from '../../../assets/style_sheets/main/colors';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import firebase from 'react-native-firebase';
import keyword from '../../../data/analytics/keyword';

import { connect } from "react-redux";
import { resetQuizOne } from '../../../redux/features/careerAssessment/quizOneSlice';

class PersonalUnderstandingForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
      score: 0,
      testCount: 0,
    };

    this.formRef = React.createRef();
    this.props.navigation.setParams({
      handleSubmit: this.handleSubmit,
      _handleBack: this._handleBack.bind(this)
    });
  };

  _handleBack() {
    this.props.route.params.refresh();
    this.props.navigation.goBack();
  }

  setModalVisible = (visible) => {
    this.setState({modalVisible: visible});
  }

  handleSubmit = () => {
    let formValues = this.parseFormValue({...this.props.quizOneAnswer});
    if (!formValues) {
      return this.refs.toast.show('សូមបំពេញសំណួរខាងក្រោមជាមុនសិន...!', DURATION.SHORT);
    }

    this.submitForm(this._buildData(formValues));
  };

  _buildData(formValues) {
    let score = new PersonalUnderstandingScore(formValues).calculate();
    let obj = Object.assign({}, formValues);

    obj.userUuid = User.getID();
    obj.score = score.toString();

    return obj;
  }

  submitForm(values) {
    let user = User.getCurrent();
    let game = user.games[user.games.length - 1];
    let list = game.personalUnderstandings;
    let isPass = values.score >= 12;
    let resultKeyword = isPass ? keyword.CAREER_ASSESSMENT_PERSONAL_UNDERSTANDING_TEST_PASS : keyword.CAREER_ASSESSMENT_PERSONAL_UNDERSTANDING_TEST_FAIL;

    realm.write(() => {
      // firebase.analytics().logEvent(resultKeyword);

      list.push(values);

      this.setState({testCount: list.length, score: values.score});
      this.setModalVisible(true);
      this.props.resetQuizOne();
    });
  };

  parseFormValue(values) {
    values['uuid'] = uuidv4();
    if(values['everTalkedWithAnyoneAboutCareer']) {
      values['everTalkedWithAnyoneAboutCareer'] = values['everTalkedWithAnyoneAboutCareer'].map(function(i){ return {value: i }; } );
    }

    return values;
  };

  _renderContent = () => {
    return (
      <Form ref={this.formRef} />
    )
  }

  _renderNavigation = () => {
    return (<BackButton buttonColor='#fff' navigation={this.props.navigation}/>)
  }

  _renderForeground = () => {
    return (
      <View>
        <Text style={[scrollHeaderStyles.largeTitle, {color: '#fff'}]}>ស្វែងយល់ពីខ្លួនឯង</Text>
        <View style={{borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingHorizontal: 5, paddingTop: 6, width: 110, backgroundColor: 'rgb(22, 99, 176)'}}>
          <Text style={{color: '#fff', fontSize: 13, lineHeight: 22}}>ឆ្លើយរួចរាល់</Text>
        </View>
        <Progress.Bar progress={0.3} width={null} color='#fff' unfilledColor='rgb(19, 93, 153)' borderColor='transparent' />
      </View>
    )
  }

  _resetStore = () => {
    this.props.resetQuizOne();
  }

  _renderResult() {
    return (
      <Result
        modalVisible={this.state.modalVisible}
        setModalVisible={this.setModalVisible}
        callback={this._resetStore}
        score={this.state.score}
        navigation={this.props.navigation}
        testCount={this.state.testCount}/>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollableHeader
          backgroundColor={Colors.blue}
          textColor={'#fff'}
          statusBarColor={Colors.blueStatusBar}
          barStyle={'light-content'}
          renderContent={ this._renderContent }
          renderNavigation={ this._renderNavigation }
          renderForeground={ this._renderForeground }
          title={'ស្វែងយល់ពីខ្លួនឯង'}
          largeTitle={'ស្វែងយល់ពីខ្លួនឯង'}
        />

        { this._renderResult() }
        { !this.state.modalVisible && <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={this.handleSubmit} /> }
        <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </View>
    )
  };
}

const mapStateToProps = (state) => ({
  quizOneAnswer: state.quizOneAnswer.value
});

const mapDispatchToProps = { resetQuizOne };

export default connect(mapStateToProps, mapDispatchToProps)(PersonalUnderstandingForm);
