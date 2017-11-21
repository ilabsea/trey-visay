import React, { Component } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import CheckboxGroup from 'react-native-checkbox-group';
import { CheckBox } from 'react-native-elements'

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';

import careers from '../../data/json/careers.json';

let groups = {
  group1: [],
  group2: [],
  group3: [],
  group4: [],
  group5: [],
  group6: [],
  group7: [],
  group8: [],
  group9: [],
  group10: [],
  group11: [],
  group12: [],
  group13: [],
  group14: [],
  group15: [],
  group16: [],
}

export default class CareerPlanningForm extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ជ្រើសរើស៣មុខរបរ',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>ជ្រើសរើស៣មុខរបរ</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
      headerRight: (<TouchableOpacity style={headerStyles.actionWrapper}>
                      <Text style={headerStyles.saveText}>{state.params && state.params.total || 0} / 3</Text>
                    </TouchableOpacity>),
    }
  };

  _renderCheckBoxes(index, group) {
    let title = careers[index].name;
    let checkboxes = this._formatDataForCheckbox(index);

    return(
      <View style={styles.box}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={[styles.subTitle, {flex: 1}]}>{index + 1}) {title}</Text>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CareerDetailScreen', {title: title, careerId: index + 1})}>
            <AwesomeIcon name='question-circle' color='#1976d2' size={24} />
          </TouchableOpacity>
        </View>

        <View>
          <CheckboxGroup
            callback={(selected) => {this._handleChecked(group, selected)}}
            iconColor={"#4caf50"}
            iconSize={30}
            checkedIcon="ios-checkbox-outline"
            uncheckedIcon="ios-square-outline"
            checkboxes={checkboxes}
            labelStyle={{
              color: '#333',
              fontSize: 20,
              marginLeft: 10
            }}
            rowStyle={{
              flexDirection: 'row'
            }}
            rowDirection={"column"}
          />
        </View>
      </View>
    )
  }

  _formatDataForCheckbox(id) {
    let jobs = careers[id].children;
    let arr = [];

    for(let i = 0; i < jobs.length; i++) {
      arr.push({ value: jobs[i].id, label: jobs[i].name })
    }
    return arr;
  }

  _handleChecked(group, value) {
    let obj = {};
    obj[group] = value;
    groups[group] = value;

    this.setState(obj);
    this._countSelected();
  }

  _countSelected() {
    let total = this._totalSelected().length;
    this.props.navigation.setParams({total: total});

    if(total > 3) {
      alert('only 3 is allowed')
    }
  }

  _totalSelected() {
    let arr = [];

    for (i = 1; i < 17; i++) {
      arr = arr.concat(groups['group'+i]);
    }

    return arr;
  }

  _renderAgricultureAndResources() {
    return this._renderCheckBoxes(0, 'group1');
  }

  _renderConstruction() {
    return this._renderCheckBoxes(1, 'group2');
  }

  _renderArtAndCommunication() {
    return this._renderCheckBoxes(2, 'group3');
  }

  _renderTradeAndAdministration() {
    return this._renderCheckBoxes(3, 'group4');
  }

  _renderEducationAndTraining() {
    return this._renderCheckBoxes(4, 'group5');
  }

  _renderFinancialAndInsurance() {
    return this._renderCheckBoxes(5, 'group6');
  }

  _renderPublicAdministration() {
    return this._renderCheckBoxes(6, 'group7');
  }

  _renderHealthScience() {
    return this._renderCheckBoxes(7, 'group8');
  }

  _renderHospitalityTourismAndEntertainment() {
    return this._renderCheckBoxes(8, 'group9');
  }

  _renderServicesForPublic() {
    return this._renderCheckBoxes(9, 'group10');
  }

  _renderInformatics() {
    return this._renderCheckBoxes(10, 'group11');
  }

  _renderLegalAndPublicSafety() {
    return this._renderCheckBoxes(11, 'group12');
  }

  _renderManufacturing() {
    return this._renderCheckBoxes(12, 'group13');
  }

  _renderRetailWholesaleAndServices() {
    return this._renderCheckBoxes(13, 'group14');
  }

  _renderScienceResearchEngineeringAndMathematics() {
    return this._renderCheckBoxes(14, 'group15');
  }

  _renderShippingDistributionAndManagement() {
    return this._renderCheckBoxes(15, 'group16');
  }

  _renderFooter() {
    return(
      <View style={shareStyles.footerWrapper}>
        <TouchableOpacity onPress={this._goNext.bind(this)} style={shareStyles.btnNext}>
          <Text style={shareStyles.btnText}>បន្តទៀត</Text>
          <Icon name='keyboard-arrow-right' color='#fff' size={24} />
        </TouchableOpacity>
      </View>
    )
  }

  _goNext() {
    let total = this._totalSelected().length;
    if (total != 3) {
      return alert('You must select 3 careers only!');
    }

    this._handleSubmit();
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Career', this._buildData(), true);
      this.props.navigation.navigate('SubjectScreen');
    });
  }

  _buildData() {
    let career_ids = this._totalSelected() + '';
    return {
      uuid: '123',
      // uuid: uuidv4(),
      userUuid: User.getID(),
      careerByFavorite: career_ids
    };
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <ScrollView>
          <View style={{margin: 16}}>
            { this._renderAgricultureAndResources() }
            { this._renderConstruction() }
            { this._renderArtAndCommunication() }
            { this._renderTradeAndAdministration() }
            { this._renderEducationAndTraining() }
            { this._renderFinancialAndInsurance() }
            { this._renderPublicAdministration() }
            { this._renderHealthScience() }
            { this._renderHospitalityTourismAndEntertainment() }
            { this._renderServicesForPublic() }
            { this._renderInformatics() }
            { this._renderLegalAndPublicSafety() }
            { this._renderManufacturing() }
            { this._renderRetailWholesaleAndServices() }
            { this._renderScienceResearchEngineeringAndMathematics() }
            { this._renderShippingDistributionAndManagement() }
          </View>

          { this._renderFooter() }
        </ScrollView>
      </ThemeProvider>
    );
  };
}
