import React, { Component } from 'react';
import {
  View,
  processColor,
  Text,
  StyleSheet
} from 'react-native';

import { ListItem, Left, Body, Right, Button, Icon} from 'native-base';

import { HorizontalBarChart } from 'react-native-charts-wrapper';
import personalityList from '../../data/json/personality';
import categoryList from '../../data/json/personality_category';

export default class Result extends Component {
  _renderChart() {
    let arr = categoryList.map(category => {return {y: this.props.assessment[category.name_en].length}});
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
    let codes = this.props.assessment[category.name_en].map(x => x.value);
    let personalities = personalityList.filter(x => codes.includes(x.code));

    this.props.navigation.navigate('PersonalityCategoryScreen', {
      title: category.name_km,
      entries: personalities,
      category: category,
      assessment: this.props.assessment
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
          <Text>{this.props.assessment[category.name_en].length}</Text>
          <Icon name="ios-arrow-forward" />
        </Right>
      </ListItem>
    );
  }

  _renderPersonalityGroups() {
    return (
      <View>
        <ListItem itemDivider style={styles.header}>
          <Text>ផ្នែកវិទ្យាសាស្ត្រ</Text>
        </ListItem>

        <View style={{backgroundColor: '#fff'}}>
          { categoryList.filter(category => category.group == 'science').map((category, index) => this._renderListItem(category, index)) }
        </View>

        <ListItem itemDivider style={styles.header}>
          <Text>ផ្នែកវិទ្យាសាស្ត្រសង្គម</Text>
        </ListItem>

        <View style={{backgroundColor: '#fff'}}>
          { categoryList.filter(category => category.group == 'social').map((category, index) => this._renderListItem(category, index)) }
        </View>
      </View>
    );
  }

  _renderContent = () => {
    return (
      <View style={{padding: 16, paddingTop: 0}}>
        <ListItem itemDivider style={styles.header}>
          <Text>ជម្រើសរបស់អ្នក</Text>
        </ListItem>

        { this._renderChart() }
        { this._renderPersonalityGroups() }
      </View>
    )
  }

  render() {
    return ( this._renderContent() )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'rgba(24, 118, 211, 0.2)',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginTop: 16
  },
})
