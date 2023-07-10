import React, {useState} from 'react';
import { StyleSheet, View, processColor } from 'react-native';
import { BarChart } from 'react-native-charts-wrapper';

import intelligenceTypes from '../../data/json/intelligence_types.json';

const MultiIntelligentResultBarChart = ({quiz}) => {
  const intelligenceScore = quiz.sortedIntelligenceScore;
  const yData = intelligenceScore.map(c => ({y: c[1]}));
  const xData = intelligenceScore.map(c => {
    const index = intelligenceTypes.findIndex((type) => type.code == c[0])
    return index != -1 ? intelligenceTypes[index].name_km : '';
  })

  const [data, setData] = useState({
    dataSets: [{
      values: yData,
      label: '',
      config: {
        drawValues: false,
        colors: [processColor('#6ED490'), processColor('#9D4072'), processColor('#8B8000'), processColor('#C6B8D9'), processColor('#F2D3B5'), processColor('#BFDAED'), processColor('#1076DA')]
      }
    }],
  })

  const [xAxis, setXAxis] = useState({
    enabled: true,
    valueFormatter: xData,
	  labelRotationAngle: -70,
    granularityEnabled: true,
    position: 'BOTTOM',
    gridColor: processColor('white'),
    textSize: 10,
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

  return (
    <View style={styles.container}>
      <BarChart
        style={styles.chart}
        data={data}
        xAxis={xAxis}
        yAxis={yAxis}
        chartDescription={{text: ''}}
        legend={{enabled: false}}
        touchEnabled={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: 250,
    marginVertical: 16,
    borderRadius: 6,
  },
  chart: {
    flex: 1,
    marginVertical: 16,
    marginTop: 0,
  }
});

export default MultiIntelligentResultBarChart;
