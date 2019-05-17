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
  BackHandler,
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import headerStyles from '../../assets/style_sheets/header';
import formStyles from '../../assets/style_sheets/profile_form';
import FooterBar from '../../components/footer/FooterBar';
import { NavigationActions } from 'react-navigation';
import BackConfirmDialog from '../../components/shared/back_confirm_dialog';
import {HorizontalBarChart} from 'react-native-charts-wrapper';
import realm from '../../db/schema';
import User from '../../utils/user';
import personalityList from '../../data/json/personality';
import categoryList from '../../data/json/personality_category';
import Sidekiq from '../../utils/models/sidekiq';

class PersonalityAssessmentResult extends Component {
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
      Sidekiq.create(this.state.assessment.uuid, 'PersonalityAssessment');

      this.props.navigation.reset([NavigationActions.navigate({ routeName: 'AssessmentScreen' }), NavigationActions.navigate({ routeName: 'PersonalityAssessmentScreen' })], 1);
    });
  }

  _onYes() {
    realm.write(() => {
      realm.create('PersonalityAssessment', this._buildData(), true);
      Sidekiq.create(this.state.assessment.uuid, 'PersonalityAssessment');

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
    let arr = categoryList.map(category => {return {y: this.state.assessment[category.name_en].length}});
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
      <View style={{flex: 1}}>
        <View style={styles.container}>
          <HorizontalBarChart
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

  _handleButtonClick(category) {
    let codes = this.state.assessment[category.name_en].map(x => x.value);
    let personalities = personalityList.filter(x => codes.includes(x.code));

    this.props.navigation.navigate('PersonalityCategoryScreen', {
      title: category.name_km,
      entries: personalities,
      category: category,
      assessment: this.state.assessment
    });
  }

  _renderButton(category, index) {
    return (
      <TouchableOpacity
        key={index}
        style={[formStyles.box, {marginTop: 0, marginBottom: 8, flexDirection: 'row', alignItems: 'center'}]}
        onPress={() => this._handleButtonClick(category)}
      >
        <Image source={require('../../assets/images/list.png')} style={{width: 60, height: 60, marginRight: 16}} />
        <Text style={[formStyles.subTitle, {flex: 1}]}>{category.name_km} ({this.state.assessment[category.name_en].length})</Text>
        <AwesomeIcon name='angle-right' size={24}/>
      </TouchableOpacity>
    )
  }

  _renderPersonalityGroup() {
    return (
      <View style={{marginBottom: 16}}>
        <Text style={headerStyles.body2}>ផ្នែកវិទ្យសាស្ត្រ</Text>
        { categoryList.filter(category => category.group == 'science').map((category, index) => this._renderButton(category, index)) }

        <Text style={headerStyles.body2}>ផ្នែកវិទ្យាសាស្ត្រសង្គម</Text>
        { categoryList.filter(category => category.group == 'social').map((category, index) => this._renderButton(category, index)) }
      </View>
    );
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{margin: 16}}>
            <View style={{flexDirection: 'row', marginVertical: 16}}>
              <Text>បុគ្គលិកលក្ខណៈរបស់អ្នក អាចជួយអ្នកក្នុងការជ្រើសរើសមុខជំនាញសិក្សា ឬអាជីពការងារមានភាពប្រសើរជាមូលដ្ឋាននាំអ្នកឆ្ពោះទៅមាគ៌ាជីវិតជោគជ័យនាថ្ងៃអនាគត។</Text>
            </View>
            <Text style={headerStyles.body2}>លទ្ធផលរបស់អ្នក</Text>

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
        <FooterBar icon='done' text='រួចរាល់' onPress={this._goNext} />
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
