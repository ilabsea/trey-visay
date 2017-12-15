import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import BackConfirmDialog from '../../components/back_confirm_dialog';

import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from './style';

import realm from '../../schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';
import RadioGroup from '../../components/radio_group';

let careers = [];

export default class RecommendationScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;

    return {
      title: 'ការណែនាំ',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>ការណែនាំ</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginHorizontal: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
    }
  };



  componentWillMount() {
    this._initState();
  }

  _initState() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    let game = user.games[user.games.length - 1];

    this.state = {
      currentJob: '',
      user: user,
      game: game
    }
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
    this._handleSubmit();
  }

  _buildData() {
    let obj = Object.assign({}, this.state, {
      uuid: this.state.game.uuid,
      goalCareer: this.state.currentJob,
      step: 'GoalScreen'
    })

    return obj;
  }

  _handleSubmit() {
    realm.write(() => {
      realm.create('Game', this._buildData(), true);
      this.props.navigation.navigate('GoalScreen', {career: this.state.currentJob});
    });
  }

  _formatDataForCheckbox(jobs) {
    let arr = [];

    for(let i = 0; i < jobs.length; i++) {
      arr.push({ value: jobs[i].careerName, label: jobs[i].recommendation })
    }
    return arr;
  }

  _renderRadioGroups() {
    let game = realm.objects('Game').filtered('uuid="' + 123 + '"')[0];
    let options = this._formatDataForCheckbox(game.recommendations);

    return (
      <View style={styles.box}>
        <RadioForm formHorizontal={false} animation={true}>
          { options.map((obj, i) => {
            let myStyle = (i == options.length - 1) ? {} : { borderBottomWidth: 0.5, marginBottom: 16 }

            return (
              <View key={i} style={[{paddingHorizontal: 16}, myStyle]}>
                <Text style={styles.subTitle}>{obj.value}</Text>

                <RadioButton labelHorizontal={true}>
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    isSelected={this.state.currentJob == obj.value}
                    onPress={(text) => this.setState({currentJob: text})}
                    buttonSize={10}
                    buttonOuterSize={20}
                    buttonColor={'#4caf50'}
                  />

                  <RadioButtonLabel
                    obj={obj}
                    index={i}
                    labelHorizontal={true}
                    onPress={(text) => this.setState({currentJob: text})}
                    labelStyle={{fontSize: 16, lineHeight: 25, fontFamily: 'Kantumruy',}}
                    labelWrapStyle={{marginRight: 20, paddingVertical: 10}}
                  />
                </RadioButton>
              </View>
            )
          })}
        </RadioForm>
      </View>
    )
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
        <View style={{flex: 1}}>
          <ScrollView style={{flex: 1}}>
            <View style={{margin: 16, flex: 1}}>
              <Text style={{marginBottom: 8}}>ចូរអានការណែនាំ និងជ្រើសរើសមុខរបរមួយក្នុងចំណោម២មុខរបរខាងក្រោម</Text>
              { this._renderRadioGroups() }
            </View>
          </ScrollView>

          { this._renderFooter() }
        </View>
      </ThemeProvider>
    );
  };
}
