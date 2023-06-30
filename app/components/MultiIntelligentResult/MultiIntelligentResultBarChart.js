import React, {useState} from 'react';
import { StyleSheet, View, processColor, Text } from 'react-native';
import { BarChart } from 'react-native-charts-wrapper';

const MultiIntelligentResultBarChart = () => {
  const [data, setData] = useState({
    dataSets: [{
      values: [{y: 500}, {y: 400}, {y: 300}, {y: 200}, {y: 100}, {y: 70}, {y: 50}],
      label: '',
      config: {
        drawValues: false,
        colors: [processColor('#6ED490'), processColor('#9D4072'), processColor('#8B8000'), processColor('#C6B8D9'), processColor('#F2D3B5'), processColor('#BFDAED'), processColor('#1076DA')]
      }
    }],
  })

  const [xAxis, setXAxis] = useState({
    enabled: true,
    valueFormatter: ['Linguistic', 'Logical–mathematical', 'Bodily–kinaesthetic', 'Musical', 'Spatial-Visual', 'Interpersonal', 'Intrapersonal'],
	  labelRotationAngle: -70,
    granularityEnabled: true,
    position: 'BOTTOM',
    gridColor: processColor('white'),
    textSize: 10,
    // avoidFirstLastClipping: true,
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
