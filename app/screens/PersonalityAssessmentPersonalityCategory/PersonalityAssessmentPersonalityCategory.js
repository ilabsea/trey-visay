import React, { Component } from 'react';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import {
  View,
  ScrollView,
  StyleSheet,
  BackHandler,
} from 'react-native';

import { Divider } from 'react-native-paper';
import majorList from '../../data/json/personality_major';
import mainStyles from '../../assets/style_sheets/main/main';
import { Colors } from '../../assets/style_sheets/main/colors';
import styles from '../../assets/style_sheets/assessment';
import ButtonList from '../../components/list/button_list';
import { goBack, navigate } from '../StackNav/RootNavigation';
import Text from '../../components/Text';

export default class PersonalityAssessmentPersonalityCategory extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: props.route.params.category
    }

    BackHandler.addEventListener('hardwareBackPress', this._onClickBackHandler);
  }

  _onClickBackHandler = () => {
    BackHandler.removeEventListener('hardwareBackPress', this._onClickBackHandler);

    goBack();

    return true
  }

  _renderList() {
    let entries = this.props.route.params.entries;

    if (!entries.length) { return (null); }

    let doms = entries.map((entry, index) => {
      let showDivider = index < entries.length - 1;

      return (
        <View key={index}>
          <View style={{flexDirection: 'row', alignItems: 'center', marginVertical: 10}}>
            <AwesomeIcon name='check-square' size={24} color='rgb(17, 130, 254)' style={{marginRight: 8}} />
            <Text>{entry.name_km}</Text>
          </View>

          { showDivider && <Divider style={{marginLeft: 2}}/> }
        </View>
      )
    });

    return (
      <View>
        <View style={mainStyles.blueTitleBox}>
          <AwesomeIcon name='globe' color={Colors.blue} size={24} />
          <Text style={[mainStyles.title, { paddingLeft: 8 }]}>
            ចម្លើយបុគ្គលិកលក្ខណៈរបស់អ្នក
          </Text>
        </View>

        <View style={[mainStyles.subTitleBox, {paddingTop: 0, paddingBottom: 0}]}>
          {doms}
        </View>
      </View>
    );
  }

  _renderDescription() {
    if (!this.state.category.description) {
      return (null);
    }

    let doms = this.state.category.description.split(';').map((text, index) => {
      return (
        <Text key={index}>{`\u2022 ${text}`}</Text>
      );
    })

    return (
      <View>
        <View style={mainStyles.blueTitleBox}>
          <AwesomeIcon name='globe' color={Colors.blue} size={24} />
          <Text style={[mainStyles.title, { paddingLeft: 8 }]}>
            មនុស្សបែប{this.props.route.params.title}
          </Text>
        </View>

        <View style={mainStyles.subTitleBox}>
          {doms}
        </View>
      </View>
    );
  }

  _renderButtonList() {
    let options = [
      {label: 'ជម្រើសនៃការសិក្សាកម្រិតមធ្យមសិក្សាទុតិយភូមិ', screen: 'HighSchoolStudyOptionScreen'},
      {label: 'ជម្រើសនៃការសិក្សាកម្រិតឧត្តមសិក្សា', screen: 'MajorListScreen'},
      {label: 'ជម្រើសអាជីពការងារសក្ដិសម', screen: 'PersonalityAssessmentJobListScreen'},
    ];

    let doms = options.map((option, index) => {
      return (
        <ButtonList
          key={index}
          onPress={() => {
            navigate(option.screen, {
              category: this.state.category,
              assessment: this.props.route.params.assessment
            })}
          }
          title={option.label}
          hasLine={true}/>
      )
    });

    return (
      <View>
        <Text style={mainStyles.sectionText}>ព័ត៌មានបន្ថែម</Text>

        <View style={{backgroundColor: '#fff'}}>{ doms }</View>
      </View>
    );
  }

  _renderContent = () => {
    return (
      <View style={{paddingBottom: 20}}>
        { this._renderList() }
        { this._renderDescription() }
        { this._renderButtonList() }
      </View>
    )
  }

  render() {
    return (
      <ScrollView>
        { this._renderContent() }
      </ScrollView>
    )
  }
}
