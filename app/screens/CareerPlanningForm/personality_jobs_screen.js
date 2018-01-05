import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

import CheckboxGroup from '../../components/checkbox_group';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';
// import personalityJobs from '../../data/json/personality_jobs';
import personalityJobs from '../../data/json/characteristic_jobs';
// import characteristicList from '../../data/json/characteristic_jobs';

let careers = [];

export default class PersonalityJobsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ជ្រើសរើស៣មុខរបរចេញពីបុគ្គលិកលក្ខណៈរបស់អ្នក',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>{state.params.title}</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='arrow-back' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
      headerRight: (<TouchableOpacity style={headerStyles.actionWrapper}>
                      <Text style={headerStyles.saveText}>{state.params && state.params.total || 0} / 3</Text>
                      <TouchableOpacity onPress={() => { state.params.refresh(careers); goBack()} } style={{marginHorizontal: 16}}>
                        <Text style={headerStyles.saveText}>Done</Text>
                      </TouchableOpacity>
                    </TouchableOpacity>),
    }
  };

  careers = [];

  componentWillMount() {
    this._handleSetSelectCareer();
  }

  _handleSetSelectCareer() {
    let groupNumber = this.props.navigation.state.params.groupNumber;
    let jobs = personalityJobs.find((obj) => obj.id == groupNumber).careers;
    let selectedJobs = this.props.navigation.state.params.selectedCareers || [];
    let arr = jobs.filter(function (item, pos) { return selectedJobs.includes(item.id) });
    careers = arr.map((obj) => obj.id);
  }

  _renderCheckBoxes() {
    let groupNumber = this.props.navigation.state.params.groupNumber;
    let checkboxes = this._formatDataForCheckbox(groupNumber);

    return(
      <View style={styles.box}>
        <Text style={styles.subTitle}>មុខរបរ</Text>

        <View>
          <CheckboxGroup
            onSelect={(selected) => {this._handleChecked(selected)}}
            items={checkboxes}
            checked={careers}
            style={{
              icon: {
                color: '#4caf50',
                size: 30
              },
              container: {
                flexDirection: 'row',
                borderTopWidth: 0.5,
                borderColor: '#ccc',
                paddingVertical: 8,
              },
              label: {
                color: '#333',
                fontSize: 16,
                marginLeft: 10
              }
            }}
          />
        </View>
      </View>
    )
  }

  _formatDataForCheckbox(id) {
    let jobs = personalityJobs.find((obj) => obj.id == id).careers;
    let arr = [];

    for(let i = 0; i < jobs.length; i++) {
      arr.push({ value: jobs[i].id, label: jobs[i].name })
    }
    return arr;
  }

  _handleChecked(value) {
    careers = value
    this.props.navigation.setParams({total: careers.length});

    if (careers.length > 3) {
      return alert('You must select 3 careers only!');
    }
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16}}>
              <View style={{flexDirection: 'row', marginVertical: 16}}>
                <MaterialIcon name='stars' color='#e94b35' size={24} style={{marginRight: 8}} />
                <Text>សូមជ្រើសរើសមុខរបរខាងក្រោមយ៉ាងច្រើនចំនួន៣៖</Text>
              </View>

              { this._renderCheckBoxes() }
            </View>
          </ScrollView>
        </View>
      </ThemeProvider>
    );
  };
}
