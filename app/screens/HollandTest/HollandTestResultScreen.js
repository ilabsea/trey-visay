import React, {useState} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  processColor
} from 'react-native';

import {BarChart} from 'react-native-charts-wrapper';
import { Text, BackButton, ScrollableHeader, FooterBar } from '../../components';
import ButtonList from '../../components/list/button_list';
import Color from '../../themes/color';
import Quiz from '../../models/Quiz';
import { useSelector, useDispatch } from 'react-redux'

const COLOR = {
  R: processColor('#B8D9C3'),
  I: processColor('#E5BED3'),
  A: processColor('#FCFCB3'),
  S: processColor('#C6B8D9'),
  E: processColor('#F2D3B5'),
  C: processColor('#BFDAED'),
}

const HollandTestResult = ({navigation}) => {
  const title = "តេស្តបុគ្គលិកលក្ខណៈ"
  const currentQuiz = useSelector((state) => state.currentQuiz.value);

  const totalScore = Object.entries(currentQuiz.totalScore).sort((a,b) => b[1] - a[1]);
  const yData = totalScore.map(c => ({y: c[1]}));
  const yColors = totalScore.map(c => COLOR[c[0]]);
  const xData = totalScore.map(c => c[0]);

  const [data, setData] = useState({
    dataSets: [{
      // values: [{y: 500}, {y: 400}, {y: 300}, {y: 200}, {y: 100}, {y: 50}],
      values: yData,
      label: '',
      config: {
        // colors: [R_COLOR, I_COLOR, A_COLOR, S_COLOR, E_COLOR, C_COLOR]
        colors: yColors
      }
    }],
  })

  const [xAxis, setXAxis] = useState({
    enabled: true,
    // valueFormatter: ['R', 'I', 'A', 'S', 'E', 'C'],
    valueFormatter: xData,
    granularityEnabled: true,
    position: 'BOTTOM',
    gridColor: processColor('white'),
    textSize: 16,
    avoidFirstLastClipping: true,
  })

  const [yAxis, setYAxis] = useState({
    left: {
      drawLabels: false,
      drawAxisLine: false,
      drawGridLines: false,
      zeroLine: {
        enabled: true,
        lineWidth: 1.5
      }
    },
    right: {
      enabled: false
    }
  })

  const renderContent = () => {
    return (
      <View style={{flex: 1}}>
        <View style={{padding: 16}}>
          <Text>ខាងក្រោមនេះ ជាលទ្ធផលតេស្ដរបស់អ្នក! សូមអ្នកឈ្វេងយល់ពីការពណ៌នាលម្អិតអំពីបុគ្គលិកលក្ខណៈរបស់អ្នកដូចខាងក្រោម </Text>

          <View style={styles.container}>
            <BarChart
              style={styles.chart}
              data={data}
              xAxis={xAxis}
              yAxis={yAxis}
              chartDescription={{text: ''}}
              legend={{enabled: false}}
            />
          </View>

          <Text>បុគ្គលិកលក្ខណៈរបស់អ្នកគឺស្ថិតក្នុងក្រុម</Text>
        </View>

        <View style={{backgroundColor: '#fff'}}>
          <ButtonList
            hasLine={true}
            icon={{color: Color.blue, src: require('../../assets/icons/others/info.png')}}
            onPress={() => { this.props.navigation.navigate('AboutCareerCounsellorScreen') }}
            title='R: ប្រាកដនិយម' />
        </View>
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
      <ScrollableHeader
        renderContent={ renderContent }
        renderNavigation={ () => <BackButton onPress={() => navigation.popToTop()} /> }
        title={title}
        largeTitle={title}
      />

      <FooterBar icon='keyboard-arrow-right' text='បន្តជ្រើសរើសជំនាញសិក្សា ឬអាជីពការងារ' onPress={() => {}} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 250,
    marginVertical: 16,
    borderRadius: 6
  },
  chart: {
    flex: 1,
    marginVertical: 16
  }
});

export default HollandTestResult;
