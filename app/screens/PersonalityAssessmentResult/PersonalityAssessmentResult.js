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

class PersonalityAssessmentResult extends Component {
  categories = [
    {label: 'ប្រាកដនិយម', value: 'realistic'},
    {label: 'ពូកែអង្កេត', value: 'investigative'},
    {label: 'សិល្បៈនិយម', value: 'artistic'},
    {label: 'សង្គម', value: 'social'},
    {label: 'ត្រិះរិះពិចារណា', value: 'enterprising'},
    {label: 'សណ្ដាប់ធ្នាប់', value: 'conventional'}];

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
      realm.create('PersonalityAssessment', this._buildData(), true);
      realm.create('Sidekiq', { paramUuid: this.state.assessment.uuid, tableName: 'PersonalityAssessment' }, true)

      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'AssessmentScreen' }), NavigationActions.navigate({ routeName: 'PersonalityAssessmentScreen' })], 1);
    });
  }

  _onYes() {
    realm.write(() => {
      realm.create('PersonalityAssessment', this._buildData(), true);
      realm.create('Sidekiq', { paramUuid: this.state.assessment.uuid, tableName: 'PersonalityAssessment' }, true)

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
    }

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

  _renderPersonalityGroup() {
    let doms = this.categories.map((category, index) => (<Text key={index}>{index+1}) {category.label} ({this.state.assessment[category.value].length})</Text>));

    return (<View>{doms}</View>);
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{margin: 16}}>
            <View style={{flexDirection: 'row', marginVertical: 16}}>
              <Text>បុគ្គលិកលក្ខណៈរបស់អ្នក អាចជួយអ្នកក្នុងការជ្រើសរើសមុខជំនាញសិក្សា ឬអាជីពការងារមានភាពប្រសើរជាមូលដ្ឋាននាំអ្នកឆ្ពោះទៅមាគ៌ាជីវិតជោគជ័យនាថ្ងៃអនាគត។</Text>
            </View>
            <Text style={{textAlign: 'center'}}>លទ្ធផលរបស់អ្នក</Text>

            { this._renderChart() }
            { this._renderPersonalityGroup() }
          </View>
        </ScrollView>

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <FooterBar icon='keyboard-arrow-right' text='រួចរាល់' onPress={this._goNext} />
      </View>
    );

  }
}

const styles = StyleSheet.create({
  container: {
    height: 220,
    backgroundColor: '#F5FCFF',
    marginVertical: 10,
    paddingVertical: 10
  },
  chart: {
    flex: 1
  }
});

export default PersonalityAssessmentResult;
