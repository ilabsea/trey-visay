import React, { Component } from 'react';
import {
  View,
  processColor,
} from 'react-native';

import { HorizontalBarChart } from 'react-native-charts-wrapper';
import realm from '../../schema';
import User from '../../utils/user';
import personalityList from '../../data/json/personality';

import { Container, Content, ListItem, Thumbnail, Text, Left, Body, Right, Button, Icon } from 'native-base';

export default class PersonalityAssessmentHistory extends Component {
  categories = [
    { value: 'realistic', label: 'ប្រាកដនិយម'},
    { value: 'investigative', label: 'ពូកែអង្កេត'},
    { value: 'artistic', label: 'សិល្បៈនិយម'},
    { value: 'social', label: 'សង្គម'},
    { value: 'enterprising', label: 'ត្រិះរិះពិចារណា'},
    { value: 'conventional', label: 'សណ្ដាប់ធ្នាប់'},
  ];

  constructor(props) {
    super(props);

    let assessment = realm.objects('PersonalityAssessment').filtered('uuid=="' + props.navigation.state.params.assessmentUuid + '"')[0];

    this.state = {
      assessment: assessment,
    };
  }

  _handleButtonClick(category) {
    let codes = this.state.assessment[category.value].map(x => x.value);
    let personalities = personalityList.filter(x => codes.includes(x.code));

    if (!!personalities.length) {
      this.props.navigation.navigate('RealisticHistoryScreen', { title: category.label, entries: personalities })
    }
  }

  _renderListItem(category, index) {
    return (
      <ListItem
        key={index}
        button={true}
        onPress={() => this._handleButtonClick(category)}
        thumbnail>
        <Left>
          <Thumbnail square source={require('../../assets/images/list.png')} />
        </Left>
        <Body>
          <Text>{category.label} ({this.state.assessment[category.value].length})</Text>
        </Body>
        <Right>
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

  render () {
    return (
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
        </Container>
    );
  }
}
