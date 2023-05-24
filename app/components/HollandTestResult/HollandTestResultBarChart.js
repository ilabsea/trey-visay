import React, {useState} from 'react';
import { StyleSheet, View, processColor } from 'react-native';
import {BarChart} from 'react-native-charts-wrapper';

const R_COLOR = processColor('#6ED490');
const I_COLOR = processColor('#E5BED3');
const A_COLOR = processColor('#FCFCB3');
const S_COLOR = processColor('#C6B8D9');
const E_COLOR = processColor('#F2D3B5');
const C_COLOR = processColor('#BFDAED');

const HollandTestResultBarChart = (props) => {
  const [data, setData] = useState({
    dataSets: [{
      values: [{y: 500}, {y: 400}, {y: 300}, {y: 200}, {y: 100}, {y: 50}],
      label: '',
      config: {
        drawValues: false,
        colors: [R_COLOR, I_COLOR, A_COLOR, S_COLOR, E_COLOR, C_COLOR]
      }
    }],
  })

  const [xAxis, setXAxis] = useState({
    enabled: true,
    valueFormatter: ['R', 'I', 'A', 'S', 'E', 'C'],
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
    borderRadius: 6
  },
  chart: {
    flex: 1,
    marginVertical: 16
  }
});

export default HollandTestResultBarChart