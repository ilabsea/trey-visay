import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';
import careers from '../../data/json/characteristic_jobs';
import IonicIcon from 'react-native-vector-icons/Ionicons';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Accordion from 'react-native-collapsible/Accordion';
import { Divider } from 'react-native-elements';

import BackButton from '../../components/back_button';

let job;
export default class CareerDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;
    return {
      headerTitle: !!state.params && state.params.title
    }
  };

  state = {
    activeSections: []
  };

  componentWillMount() {
    let id = this.props.navigation.state.params.careerId || '1';
    job = careers.find((obj) => obj.id == id);
    this.props.navigation.setParams({title: job.career_title});
  }

  _renderHeader(career, index, isActive) {
    let myStyle = {borderBottomWidth: 0.5, marginTop: 10};

    if (isActive) {
      myStyle = {};
    }

    return (
      <View>
        <View style={[{flexDirection: 'row', alignItems: 'center'}]}>
          <IonicIcon name='md-briefcase' size={24} color='#1976d2' style={{marginRight: 10}}/>
          <Text style={[styles.subTitle, {flex: 1}]}>{career.name}</Text>

          { !isActive && <AwesomeIcon name='caret-down' size={24} color='#1976d2' /> }
          { isActive && <AwesomeIcon name='caret-up' size={24} color='#1976d2' /> }
        </View>

        { !isActive && <Divider style={{marginLeft: 34}}/>}
      </View>
    );
  }

  _renderContent(career) {
    return (
      <View>
        <Text>{career.description || 'content is not available'}</Text>
        <Divider style={{marginLeft: 34, marginVertical: 10}}/>
      </View>
    );
  }

  _updateSections = activeSections => {
    this.setState({ activeSections });
  };

  render() {
    return(
      <ScrollView>
        <View style={{margin: 16}}>
          <View style={styles.box}>
            <Accordion
              touchableProps={{underlayColor:"#F7FAF7"}}
              sectionContainerStyle={{padding: 10}}
              activeSections={this.state.activeSections}
              sections={job.careers}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              onChange={this._updateSections}
            />
          </View>
        </View>
      </ScrollView>
    );
  };
}
