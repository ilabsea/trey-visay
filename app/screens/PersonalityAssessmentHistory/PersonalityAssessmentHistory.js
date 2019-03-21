import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  processColor,
  StyleSheet,
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import formStyles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import BackButton from '../../components/back_button';
import { BarChart } from 'react-native-charts-wrapper';
import realm from '../../schema';
import User from '../../utils/user';
import personalityList from '../../data/json/personality';

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

  _renderButton(category, index) {
    return (
      <TouchableOpacity
        key={index}
        style={[formStyles.box, {marginTop: 0, marginBottom: 8, flexDirection: 'row', alignItems: 'center'}]}
        onPress={() => this._handleButtonClick(category)}
      >
        <Image source={require('../../assets/images/list.png')} style={{width: 60, height: 60, marginRight: 16}} />
        <Text style={[formStyles.subTitle, {flex: 1}]}>{category.label} ({this.state.assessment[category.value].length})</Text>
        <AwesomeIcon name='angle-right' size={24}/>
      </TouchableOpacity>
    )
  }

  _renderPersonalityGroups() {
    return (
      <View style={{marginBottom: 16}}>
        <Text style={headerStyles.body2}>សេចក្តីលម្អិត</Text>
        { this.categories.map((category, index) => this._renderButton(category, index)) }
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
      }
    };

    return (
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <BarChart
            style={styles.chart}
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
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{margin: 16, flex: 1}}>
            <Text>បុគ្គលិកលក្ខណៈរបស់អ្នក អាចជួយអ្នកក្នុងការជ្រើសរើសមុខជំនាញសិក្សា ឬអាជីពការងារមានភាពប្រសើរជាមូលដ្ឋាននាំអ្នកឆ្ពោះទៅមាគ៌ាជីវិតជោគជ័យនាថ្ងៃអនាគត។</Text>
            <Text style={headerStyles.body2}>លទ្ធផលរបស់អ្នក</Text>

            { this._renderChart() }
            { this._renderPersonalityGroups() }
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    backgroundColor: '#F5FCFF',
    marginBottom: 10,
    paddingVertical: 10
  },
  chart: {
    flex: 1
  }
});
