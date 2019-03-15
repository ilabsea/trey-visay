import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Button,
  Platform,
  TouchableOpacity,
} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FooterBar from '../../components/FooterBar';
import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import CheckboxGroup from '../../components/checkbox_group';
import personalities from '../../data/json/personality';

export default class Realistic extends Component {
  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;

    return {
      title: state.params && state.params.title,
      headerTitleStyle: [headerStyles.headerTitleStyle],
      headerRight: (<TouchableOpacity style={headerStyles.actionWrapper}>
                      <Text style={headerStyles.saveText}><Text>{state.params && state.params.total || 0} </Text> / 18</Text>
                    </TouchableOpacity>)
    }
  };

  screens = [
    { category: 'realistic', nextCategory: 'investigative', nextScreen: 'InvestigativeScreen' },
    { category: 'investigative', nextCategory: 'artistic', nextScreen: 'ArtisticScreen' },
    { category: 'artistic', nextCategory: 'social', nextScreen: 'SocialScreen' },
    { category: 'social', nextCategory: 'enterprising', nextScreen: 'EnterprisingScreen' },
    { category: 'enterprising', nextCategory: 'conventional', nextScreen: 'ConventionalScreen' },
    { category: 'conventional', nextCategory: '', nextScreen: 'AssessmentResultScreen' }
  ];

  constructor(props) {
    super(props);

    let index = 0;
    if (!!props.navigation.state.params && !!props.navigation.state.params.category) {
      index = this.screens.map(e => e.category).indexOf(props.navigation.state.params.category);
    }

    this.screen = this.screens[index];
    this.state = {
      personalities: personalities.filter(item => item.category == this.screen.category)
    }
  }

  _handleChecked(value) {
    let items = value
    this.props.navigation.setParams({total: items.length});
    // this.setState({jobs: value});
  }

  _renderCheckBoxes() {
    let checkboxes = this.state.personalities.map(item => {
      return { value: item.code, label: item.name_km };
    });

    return (
      <View style={styles.box}>
        <Text style={styles.subTitle}>ខ្ញុំគិតថាខ្ញុំជាមនុស្ស</Text>

        <View>
          <CheckboxGroup
            onSelect={(selected) => {this._handleChecked(selected)}}
            items={checkboxes}
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
    );
  }

  _goNext = () => {
    this.props.navigation.navigate(this.screen.nextScreen, {category: this.screen.nextCategory});
  }

  render() {
    return(

      <View style={{flex: 1}}>
        <ScrollView style={{flex: 1}}>
          <View style={{margin: 16}}>
            <View style={{flexDirection: 'row', marginVertical: 16}}>
              <MaterialIcon name='stars' color='#e94b35' size={24} style={{marginRight: 8}} />
              <Text>សូមបំពេញក្នុងប្រអប់ខាងមុខឃ្លាទាំងឡាយណាដែលបរិយាយពីអត្តចរិករបស់អ្នក!</Text>
            </View>

            { this._renderCheckBoxes() }
          </View>
        </ScrollView>

        <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={this._goNext} />
      </View>
    )
  }
}
