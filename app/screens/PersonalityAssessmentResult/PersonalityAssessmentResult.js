import React, { Component } from 'react';
import {
  View,
  BackHandler,
  processColor,
  Text,
  TouchableOpacity
} from 'react-native';

import { Container, Header, Content, ListItem, Left, Body, Right, Button, Icon, Title} from 'native-base';

import FooterBar from '../../components/footer/FooterBar';
import { NavigationActions } from 'react-navigation';
import BackConfirmDialog from '../../components/shared/back_confirm_dialog';
import {HorizontalBarChart} from 'react-native-charts-wrapper';
import realm from '../../db/schema';
import User from '../../utils/user';
import personalityList from '../../data/json/personality';
import categoryList from '../../data/json/personality_category';
import Sidekiq from '../../utils/models/sidekiq';
import ScrollableHeader from '../../components/scrollable_header';

class PersonalityAssessmentResult extends Component {
  constructor(props) {
    super(props);

    let assessments = realm.objects('PersonalityAssessment').filtered('isDone = false AND userUuid = "' + User.getID() + '"');
    let assessment = assessments[assessments.length - 1];

    this.state = {
      assessment: assessment,
    };

    this._backHandler();
  }

  _backHandler() {
    this.props.navigation.setParams({
      _handleBack: this._handleBack.bind(this),
      goNext: this._goNext.bind(this)
    });
    BackHandler.addEventListener('hardwareBackPress', this._onClickBackHandler);
  }

  _handleBack() {
    this.setState({confirmDialogVisible: true});
  }

  _onClickBackHandler = () => {
    this.setState({confirmDialogVisible: true});

    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    return true
  }

  _goNext = () => {
    realm.write(() => {
      realm.create('PersonalityAssessment', this._buildData(), true);
      Sidekiq.create(this.state.assessment.uuid, 'PersonalityAssessment');
      this._closeDialog();
    });
  }

  _onYes() {
    realm.write(() => {
      realm.create('PersonalityAssessment', this._buildData(), true);
      Sidekiq.create(this.state.assessment.uuid, 'PersonalityAssessment');
      this._closeDialog();
    });
  }

  _closeDialog() {
    this.setState({confirmDialogVisible: false});
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'PersonalityAssessmentScreen' })]);
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.assessment);
      this._closeDialog();
    });
  }

  _buildData() {
    return {
      uuid: this.state.assessment.uuid,
      step: 'ResultScreen',
      isDone: true
    };
  }

  _renderChart() {
    let arr = categoryList.map(category => {return {y: this.state.assessment[category.name_en].length}});
    let option = {
      legend: {
        enabled: true,
        textSize: 14,
        form: 'SQUARE',
        formSize: 14,
        xEntrySpace: 10,
        yEntrySpace: 5,
        formToTextSpace: 5,
        wordWrapEnabled: true,
        maxSizePercent: 0.5
      },
      data: {
        dataSets: [{
          values: arr,
          label: 'បុគ្គលិកលក្ខណៈ',
          config: {
            color: processColor('teal'),
            barShadowColor: processColor('lightgrey'),
            highlightAlpha: 90,
            highlightColor: processColor('red'),
          }
        }],
        config: {
          barWidth: 0.7,
        }
      },
      xAxis: {
        valueFormatter: categoryList.map(x => x.name_km),
        granularityEnabled: true,
        granularity : 1,
        position: 'BOTTOM',
        labelCount: 6,
      },
      yAxis: {left:{axisMinimum: 0}}
    }

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={{height: 220, paddingVertical: 10}}>
          <HorizontalBarChart
            style={{flex: 1}}
            data={option.data}
            xAxis={option.xAxis}
            animation={{durationX: 1000}}
            legend={option.legend}
            gridBackgroundColor={processColor('#ffffff')}
            visibleRange={{x: { min: 6, max: 6 }}}
            drawBarShadow={false}
            drawValueAboveBar={true}
            drawHighlightArrow={true}
          />
        </View>
      </View>
    );
  }

  _handleButtonClick(category) {
    let codes = this.state.assessment[category.name_en].map(x => x.value);
    let personalities = personalityList.filter(x => codes.includes(x.code));

    this.props.navigation.navigate('PersonalityCategoryScreen', {
      title: category.name_km,
      entries: personalities,
      category: category,
      assessment: this.state.assessment
    });
  }

  _renderListItem(category, index) {
    return (
      <ListItem
        key={index}
        button={true}
        icon
        onPress={() => this._handleButtonClick(category)}>
        <Left>
          <Button style={{ backgroundColor: "#1976d2" }}>
            <Icon active name="bulb" />
          </Button>
        </Left>
        <Body>
          <Text>{category.name_km}</Text>
        </Body>
        <Right>
          <Text>{this.state.assessment[category.name_en].length}</Text>
          <Icon name="ios-arrow-forward" />
        </Right>
      </ListItem>
    );
  }

  _renderPersonalityGroups() {
    return (
      <View>
        <ListItem itemDivider>
          <Text>ផ្នែកវិទ្យាសាស្ត្រ</Text>
        </ListItem>

        <View style={{backgroundColor: '#fff'}}>
          { categoryList.filter(category => category.group == 'science').map((category, index) => this._renderListItem(category, index)) }
        </View>

        <ListItem itemDivider>
          <Text>ផ្នែកវិទ្យាសាស្ត្រសង្គម</Text>
        </ListItem>

        <View style={{backgroundColor: '#fff'}}>
          { categoryList.filter(category => category.group == 'social').map((category, index) => this._renderListItem(category, index)) }
        </View>
      </View>
    );
  }

  _renderNavigation = () => {
    return (
      <Button transparent onPress={() => this._handleBack()}>
        <Icon name='arrow-back' style={{color: '#fff'}} />
      </Button>
    )
  }

  _renderContent = () => {
    return (
      <View>
        <ListItem itemDivider>
          <Text>ជម្រើសរបស់អ្នក</Text>
        </ListItem>

        { this._renderChart() }
        { this._renderPersonalityGroups() }
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollableHeader
          renderContent={ this._renderContent }
          renderNavigation={ this._renderNavigation }
          largeTitle={'លទ្ធផលតេស្ត'}
          title={'លទ្ធផលតេស្ត'}
        />

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={this._goNext} />
      </View>
    )
  }
}

export default PersonalityAssessmentResult;
