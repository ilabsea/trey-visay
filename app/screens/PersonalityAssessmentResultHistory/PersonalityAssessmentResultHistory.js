import React, { Component } from 'react';
import {
  View,
  processColor,
  Text
} from 'react-native';

import { HorizontalBarChart } from 'react-native-charts-wrapper';
import realm from '../../db/schema';
import User from '../../utils/user';
import personalityList from '../../data/json/personality';
import categoryList from '../../data/json/personality_category';

import { Container, Content, ListItem, Left, Body, Right, Button, Icon, Badge } from 'native-base';
import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';
import BackConfirmDialog from '../../components/shared/back_confirm_dialog';
import ButtonList from '../../components/list/button_list';

export default class PersonalityAssessmentHistory extends Component {
  constructor(props) {
    super(props);

    let assessment = realm.objects('PersonalityAssessment').filtered('uuid=="' + props.navigation.state.params.assessmentUuid + '"')[0];

    this.state = {
      assessment: assessment,
    };
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
          <Button style={{ backgroundColor: "#4caf50" }}>
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

        { categoryList.filter(category => category.group == 'science').map((category, index) => this._renderListItem(category, index)) }

        <ListItem itemDivider>
          <Text>ផ្នែកវិទ្យាសាស្ត្រសង្គម</Text>
        </ListItem>

        { categoryList.filter(category => category.group == 'social').map((category, index) => this._renderListItem(category, index)) }
      </View>
    );
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
    };

    return (
      <View style={{flex: 1}}>
        <View style={{height: 220, paddingVertical: 6}}>
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

  _renderContent = () => {
    return (
      <Content>
        <Content padder>
          <Text>បុគ្គលិកលក្ខណៈរបស់អ្នក អាចជួយអ្នកក្នុងការជ្រើសរើសមុខជំនាញសិក្សា ឬអាជីពការងារមានភាពប្រសើរជាមូលដ្ឋាននាំអ្នកឆ្ពោះទៅមាគ៌ាជីវិតជោគជ័យនាថ្ងៃអនាគត។</Text>
        </Content>

        <ListItem itemDivider>
          <Text>ជម្រើសរបស់អ្នក</Text>
        </ListItem>

        { this._renderChart() }
        { this._renderPersonalityGroups() }
      </Content>
    )
  }

  _renderNavigation = () => {
    return (
      <BackButton navigation={this.props.navigation}/>
    )
  }

  render () {
    return (
      <Container>
        <ScrollableHeader
          renderContent={ this._renderContent }
          renderNavigation={ this._renderNavigation }
          largeTitle={'លទ្ធផលតេស្ត'}
          title={'លទ្ធផលតេស្ត'}
        />
      </Container>
    )
  }
}
