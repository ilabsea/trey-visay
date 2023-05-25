import React, {useState} from 'react';
import { StyleSheet, View, processColor } from 'react-native';
import { BarChart } from 'react-native-charts-wrapper';
import { useSelector } from 'react-redux';
import characteristicsColor from './json/characteristics_color';

const HollandTestResultBarChart = (props) => {
  const currentQuiz = useSelector((state) => state.currentQuiz.value);
  const hollandScore = currentQuiz.sortedHollandScore;
  const yData = hollandScore.map(c => ({y: c[1]}));
  const yColors = hollandScore.map(c => characteristicsColor[c[0]]);
  const xData = hollandScore.map(c => c[0]);

  const [data, setData] = useState({
    dataSets: [{
      // values: [{y: 500}, {y: 400}, {y: 300}, {y: 200}, {y: 100}, {y: 50}],
      values: yData,
      label: '',
      config: {
        drawValues: false,
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

export default HollandTestResultBarChart;
