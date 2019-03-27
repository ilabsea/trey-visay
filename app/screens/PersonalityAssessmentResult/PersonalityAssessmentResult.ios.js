import React, { Component } from 'react';
import {
  View,
  BackHandler,
  processColor,
} from 'react-native';

import { Container, Content, ListItem, Text, Left, Body, Right, Button, Icon, Badge } from 'native-base';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FooterBar from '../../components/FooterBar';
import { NavigationActions } from 'react-navigation';
import BackConfirmDialog from '../../components/back_confirm_dialog';
import {HorizontalBarChart} from 'react-native-charts-wrapper';
import realm from '../../schema';
import User from '../../utils/user';
import personalityList from '../../data/json/personality';

class PersonalityAssessmentResult extends Component {
  categories = [
    {label: 'ប្រាកដនិយម', value: 'realistic'},
    {label: 'ពូកែអង្កេត', value: 'investigative'},
    {label: 'សិល្បៈនិយម', value: 'artistic'},
    {label: 'សង្គម', value: 'social'},
    {label: 'ត្រិះរិះពិចារណា', value: 'enterprising'},
    {label: 'សណ្ដាប់ធ្នាប់', value: 'conventional'}];

  constructor(props) {
    super(props);

    let assessments = realm.objects('PersonalityAssessment').filtered('isDone = false AND userUuid = "' + User.getID() + '"');
    let assessment = assessments[assessments.length - 1];

    this.state = {
      assessment: assessment,
    };
  }

  componentDidMount() {
    this._backHandler();
  }

  _backHandler() {
    this.props.navigation.setParams({_handleBack: this._handleBack.bind(this)});
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
      realm.create('Sidekiq', { paramUuid: this.state.assessment.uuid, tableName: 'PersonalityAssessment' }, true)

      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'AssessmentScreen' }), NavigationActions.navigate({ routeName: 'PersonalityAssessmentScreen' })], 1);
    });
  }

  _onYes() {
    realm.write(() => {
      realm.create('PersonalityAssessment', this._buildData(), true);
      realm.create('Sidekiq', { paramUuid: this.state.assessment.uuid, tableName: 'PersonalityAssessment' }, true)

      this.setState({confirmDialogVisible: false});
      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'AssessmentScreen' }), NavigationActions.navigate({ routeName: 'PersonalityAssessmentScreen' })], 1);
    });
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.assessment);

      this.setState({confirmDialogVisible: false});
      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'AssessmentScreen' }), NavigationActions.navigate({ routeName: 'PersonalityAssessmentScreen' })], 1);
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
    let arr = this.categories.map(category => {return {y: this.state.assessment[category.value].length}});
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
        valueFormatter: this.categories.map(x => x.label),
        granularityEnabled: true,
        granularity : 1,
        position: 'BOTTOM',
        labelCount: 6,
      },
      yAxis: {left:{axisMinimum: 0}}
    }

    return (
      <View style={{flex: 1}}>
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
    let codes = this.state.assessment[category.value].map(x => x.value);
    let personalities = personalityList.filter(x => codes.includes(x.code));

    this.props.navigation.navigate('MajorListScreen', { title: category.label, entries: personalities })
  }

  _renderListItem(category, index) {
    return (
      <ListItem
        key={index}
        button={true}
        icon
        onPress={() => this._handleButtonClick(category)}>
        <Left>
          <Button style={{ backgroundColor: "#4caf50" }}>
            <Icon active name="airplane" />
          </Button>
        </Left>
        <Body>
          <Text>{category.label}</Text>
        </Body>
        <Right>
          <Text>{this.state.assessment[category.value].length}</Text>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }

  _renderPersonalityGroups() {
    return (
      <View>
        <ListItem itemDivider>
          <Text>សេចក្តីលម្អិត</Text>
        </ListItem>

        { this.categories.map((category, index) => this._renderListItem(category, index)) }
      </View>
    );
  }


  render() {
    return(
      <Container>
        <Content>
            <Content padder>
              <Text>បុគ្គលិកលក្ខណៈរបស់អ្នក អាចជួយអ្នកក្នុងការជ្រើសរើសមុខជំនាញសិក្សា ឬអាជីពការងារមានភាពប្រសើរជាមូលដ្ឋាននាំអ្នកឆ្ពោះទៅមាគ៌ាជីវិតជោគជ័យនាថ្ងៃអនាគត។</Text>
            </Content>

            <ListItem itemDivider>
              <Text>លទ្ធផលរបស់អ្នក</Text>
            </ListItem>

            { this._renderChart() }
            { this._renderPersonalityGroups() }
        </Content>

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <FooterBar icon='keyboard-arrow-right' text='រួចរាល់' onPress={this._goNext} />
      </Container>
    );

  }
}

export default PersonalityAssessmentResult;
