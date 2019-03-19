import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  BackHandler,
  Dimensions,
  processColor,
} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FooterBar from '../../components/FooterBar';

import { NavigationActions } from 'react-navigation';
import BackConfirmDialog from '../../components/back_confirm_dialog';

import {BarChart} from 'react-native-charts-wrapper';

import realm from '../../schema';
import User from '../../utils/user';


class Result extends Component {
  categories = ['realistic', 'investigative', 'artistic', 'social', 'enterprising', 'conventional'];

  constructor(props) {
    super(props);

    let assessments = realm.objects('PersonalityAssessment').filtered('isDone = false AND userUuid = "' + User.getID() + '"');
    let assessment = assessments[assessments.length - 1];

    this.state = {
      assessment: assessment,
    };


  }

  componentDidMount() {
    this._backHandler();
  }

  _backHandler() {
    this.props.navigation.setParams({_handleBack: this._handleBack.bind(this)});
    BackHandler.addEventListener('hardwareBackPress', this._onClickBackHandler);
  }

  _handleBack() {
    this.setState({confirmDialogVisible: true});
  }

  _onClickBackHandler = () => {
    this.setState({confirmDialogVisible: true});

    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);
    return true
  }

  _goNext = () => {
    realm.write(() => {
      realm.create('PersonalityAssessment', this._buildData(this.screen.nextScreen), true);

      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'AssessmentScreen' }), NavigationActions.navigate({ routeName: 'PersonalityAssessmentScreen' })], 1);
    });
  }

  _onYes() {
    realm.write(() => {
      realm.create('PersonalityAssessment', this._buildData(), true);

      this.setState({confirmDialogVisible: false});
      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'AssessmentScreen' }), NavigationActions.navigate({ routeName: 'PersonalityAssessmentScreen' })], 1);
    });
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.assessment);

      this.setState({confirmDialogVisible: false});
      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'AssessmentScreen' }), NavigationActions.navigate({ routeName: 'PersonalityAssessmentScreen' })], 1);
    });
  }

  _buildData() {
    return {
      uuid: this.state.assessment.uuid,
      step: 'ResultScreen',
      isDone: true
    };
  }

  render() {
    // return(
    //       <View>
    //         <Button title='Done' onPress={()=> this.props.navigation.reset([NavigationActions.navigate({ routeName: 'AssessmentScreen' }), NavigationActions.navigate({ routeName: 'PersonalityAssessmentScreen' })], 1)} />
    //       </View>
    // )

    let arr = this.categories.map(item => {return {y: this.state.assessment[item].length}});
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
        valueFormatter: ['ប្រាកដនិយម', 'ពូកែអង្កេត', 'សិល្បៈនិយម', 'សង្គម', 'ត្រិះរិះពិចារណា', 'សណ្ដាប់ធ្នាប់'],
        granularityEnabled: true,
        granularity : 1,
      }
    }

  return (
        <View style={{flex: 1}}>
          <View style={styles.container}>
            <BarChart
              style={styles.chart}
              data={option.data}
              xAxis={option.xAxis}
              animation={{durationX: 2000}}
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
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    backgroundColor: '#F5FCFF',
    margin: 10,
    paddingVertical: 10
  },
  chart: {
    flex: 1
  }
});

export default Result;
