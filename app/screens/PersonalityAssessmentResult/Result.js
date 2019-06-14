import React, { Component } from 'react';
import {
  View,
  processColor,
  Text,
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import ButtonList from '../../components/list/button_list';

import { HorizontalBarChart } from 'react-native-charts-wrapper';
import personalityList from '../../data/json/personality';
import categoryList from '../../data/json/personality_category';
import mainStyles from '../../assets/style_sheets/main/main';
import styles from '../../assets/style_sheets/assessment';
import { Colors } from '../../assets/style_sheets/main/colors';

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
      <View>
        <View style={[mainStyles.blueTitleBox]}>
          <AwesomeIcon name='globe' color={Colors.blue} size={24} />
          <Text style={[mainStyles.title, { paddingLeft: 8 }]}>
            ជម្រើសរបស់អ្នក
          </Text>
        </View>

        <View style={[mainStyles.subTitleBox, {height: 220, paddingVertical: 10}]}>
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
      <ButtonList
        onPress={() => this._handleButtonClick(category)}
        index={index}
        numberAtRight={this.props.assessment[category.name_en].length}
        icon={{color: Colors.blue, src: require('../../assets/icons/result/white-user.png')}}
        title={category.name_km}
        hasLine={true}/>
    );
  }

  _renderPersonalityGroups() {
    return (
      <View>
        <Text style={mainStyles.sectionText}>ផ្នែកវិទ្យាសាស្ត្រ</Text>

        <View style={[mainStyles.box]}>
          { categoryList.filter(category => category.group == 'science').map((category, index) => this._renderListItem(category, index)) }
        </View>

        <Text style={mainStyles.sectionText}>ផ្នែកវិទ្យាសាស្ត្រសង្គម</Text>

        <View style={[mainStyles.box]}>
          { categoryList.filter(category => category.group == 'social').map((category, index) => this._renderListItem(category, index)) }
        </View>
      </View>
    );
  }

  _renderContent = () => {
    return (
      <View style={{paddingTop: 0}}>
        { this._renderChart() }
        { this._renderPersonalityGroups() }
      </View>
    )
  }

  render() {
    return ( this._renderContent() )
  }
}
