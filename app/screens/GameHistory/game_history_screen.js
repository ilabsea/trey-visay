import React, { Component } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';

import { Divider } from 'react-native-paper';

import { Colors } from '../../assets/style_sheets/main/colors';
import mainStyles from '../../assets/style_sheets/main/main';

import ButtonList from '../../components/list/button_list';
import Goal from '../../components/GameHistory/Goal/Goal';
import OneList from '../../components/list/one_list';
import SchoolListView from '../../components/schools/school_list';
import { FontSetting } from "../../assets/style_sheets/font_setting";

import realm from '../../db/schema';
import User from '../../utils/user';
import schoolList from '../../data/json/universities';
import characteristicList from '../../data/json/characteristic_jobs';
import Images from '../../assets/images';
import Text from '../../components/Text';

export default class GameHistoryScreen extends Component {
  componentWillMount() {
    this._initState();
  }

  _initState() {
    let user = User.getCurrent();
    let game = user.games.filtered('uuid=="' + this.props.route.params.gameUuid + '"')[0];
    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);
    let currentJob = currentGroup.careers.find((career) => career.code == game.mostFavorableJobCode);
    let schools = schoolList.filter((school, pos) => {
      return currentJob.schools.includes(school.code)
    });

    if(currentJob.unknown_schools)
      schools.push({universityName: currentJob.unknown_schools});

    this.setState({
      user: user,
      game: game,
      gameUuid: this.props.route.params.gameUuid,
      schools: schools,
      currentJob: currentJob
    });
  }

  _goNext() {
    this._handleSubmit();
  }

  _buildData() {
    return {
      uuid: this.state.game.uuid,
      step: 'ContactScreen',
      isDone: true
    };
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData(), true);
      this.props.navigation.dispatch({type: 'Navigation/RESET', routeName: 'ContactScreen', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'CareerCounsellorScreen'}]});
    });
  }

  _renderSchool() {
    if (!this.state.schools.length && !this.state.currentJob.unknown_schools) {
      return (null)
    }

    return (
      <View>
        <Text style={mainStyles.sectionText}>គ្រឹះស្ថានសិក្សា</Text>
        <View style={mainStyles.box}>
          <ButtonList
            onPress={() => {
              this.props.navigation.navigate('SchoolListScreen', {
                schools: this.state.schools
              })
            }}
            icon={{color: Colors.blue, src: require('../../assets/icons/result/white-building.png')}}
            title='គ្រឹះស្ថានសិក្សា' />
        </View>
      </View>
    )
  }

  _renderButton(label, screenName, icon) {
    return (
      <ButtonList
        icon={icon}
        onPress={() => {
          this.props.navigation.navigate(screenName, {
            gameUuid: this.state.gameUuid
          })
        }}
        hasLine={true}
        title={label} />
    )
  }

  _renderTest1Trigger() {
    let icon = {color: Colors.blue, src: require('../../assets/icons/result/white-user.png')};

    return (
      <View>
        <Text style={mainStyles.sectionText}>ធ្វើតេស្តដំណាក់កាលទី 1</Text>
        <View style={mainStyles.box}>
          { this._renderButton('ស្វែងយល់អំពីខ្លួនឯង', 'PersonalUnderstandingReport', icon) }
        </View>
      </View>
    )
  }

  _renderTest2Trigger() {
    let subjectIcon = {color: Colors.blue, src: require('../../assets/icons/result/white-book.png')};
    let personalityIcon = {color: Colors.blue, src: require('../../assets/icons/result/white-user.png')};
    let choiceIcon = {color: Colors.blue, src: require('../../assets/icons/result/white-suitcase.png')};
    let recommendationIcon = {color: Colors.blue, src: require('../../assets/icons/result/white-comment.png')};
    return (
      <View>
        <Text style={mainStyles.sectionText}>ធ្វើតេស្តដំណាក់កាលទី 2</Text>
        <View style={mainStyles.box}>
          { this._renderButton('ការបំពេញមុខវិជ្ជា', 'SubjectReport', subjectIcon) }
          { this._renderButton('ការបំពេញបុគ្គលិកលក្ខណៈ', 'StudentPersonalityReport', personalityIcon) }
          { this._renderButton('ការជ្រើសរើសមុខរបរផ្អែកលើបុគ្គលិកលក្ខណៈ', 'PersonalityJobsReport', choiceIcon) }
          { this._renderButton('ការផ្តល់អនុសាសន៍', 'RecommendationReport', recommendationIcon) }
        </View>
      </View>
    )
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <ScrollView>
          <View style={{paddingBottom: 12}}>
            <Goal game={this.state.game}/>
            { this._renderSchool() }
            { this._renderTest1Trigger() }
            { this._renderTest2Trigger() }
          </View>
        </ScrollView>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  image: {
    width: 70,
    height: 70
  },
  schoolAddress: {
    marginLeft: 8,
    fontSize: FontSetting.sub_title
  }
})
