import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  // Button,
  Platform,
  TouchableOpacity,
  BackHandler,
} from 'react-native';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FooterBar from '../../components/footer/FooterBar';
import styles from '../../assets/style_sheets/profile_form';
import headerStyles from '../../assets/style_sheets/header';
import CheckboxGroup from '../../components/checkbox_group';
import personalities from '../../data/json/personality';
import BackConfirmDialog from '../../components/shared/back_confirm_dialog';
import { NavigationActions } from 'react-navigation';
import { Container, Header, Content, ListItem, Thumbnail, Left, Body, Right, Icon, Card, CardItem, Title, Button } from 'native-base';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import CloseButton from '../../components/shared/close_button';
import NextButton from '../../components/NextButton';

import realm from '../../db/schema';
import User from '../../utils/user';
import te from '../../data/translates/km';

export default class PersonalityAssessmentRealistic extends Component {
  // static navigationOptions = ({ navigation }) => {
  //   const { state } = navigation;

  //   return {
  //     title: state.params && state.params.title,
  //     headerTitleStyle: [headerStyles.headerTitleStyle],
  //     headerRight: (<TouchableOpacity style={headerStyles.actionWrapper}>
  //                     <Text style={headerStyles.saveText}><Text>{state.params && state.params.total || 0} </Text> / 18</Text>
  //                   </TouchableOpacity>)
  //   }
  // };

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

    let assessments = realm.objects('PersonalityAssessment').filtered('isDone = false AND userUuid = "' + User.getID() + '"');
    let assessment = assessments[assessments.length - 1];
    let data = assessment[this.screen.category].map((obj)=> obj.value);

    this.state = {
      personalities: personalities.filter(item => item.category == this.screen.category),
      data: data,
      assessment: assessment,
      index: index
    }

    this._backHandler();
  }

  _backHandler() {
    this.props.navigation.setParams({
      _handleBack: this._handleBack.bind(this),
      goNext: this._goNext.bind(this)
    });

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

  _onYes() {
    realm.write(() => {
      realm.create('PersonalityAssessment', this._buildData(), true);
      this._closeDialog();
    });
  }

  _closeDialog() {
    this.setState({confirmDialogVisible: false});
    this.props.navigation.reset([NavigationActions.navigate({ routeName: 'AssessmentScreen' }), NavigationActions.navigate({ routeName: 'PersonalityAssessmentScreen' })], 1);
  }

  _onNo() {
    realm.write(() => {
      realm.delete(this.state.assessment);
      this._closeDialog();
    });
  }

  _toTitleCase(str) {
    return str.replace(/^[a-z]/, function (x) {return x.toUpperCase()})
  }

  _buildData(step) {
    let screen = step || `${this._toTitleCase(this.screen.category)}Screen`;
    let data = this.state.data.map((value) => { return { value: value } })

    obj = {
      uuid: this.state.assessment.uuid,
      step: screen,
    };

    obj[this.screen.category] = data;

    return obj;
  }

  _handleChecked(value) {
    console.log('value', value)
    this.props.navigation.setParams({total: value.length});
    this.setState({data: value});
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
            checked={this.state.data}
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
    realm.write(() => {
      realm.create('PersonalityAssessment', this._buildData(this.screen.nextScreen), true);

      this.props.navigation.navigate(this.screen.nextScreen, {category: this.screen.nextCategory});
    });
  }

  _renderNumberIcon(num) {
    let number = (this.state.index || 0) + 1;
    let iconStyle = number == num ? {} : comStyles.inactiveIcon;

    return (
      <View style={comStyles.numberWrapper}>
        <View style={[comStyles.numberIcon, iconStyle]}>
          <Text style={comStyles.iconText}>{num}</Text>
        </View>
      </View>
    )
  }

  _renderLine() {
    return (
      <View style={comStyles.line}></View>
    )
  }

  _renderHeader() {
    return(
      <Container style={{flex: 1}}>
        <HeaderImageScrollView
          minHeight={64}
          maxOverlayOpacity={0}
          disableHeaderGrow='true'
          androidStatusBarColor='rgb(24,118,211)'
          iosBarStyle='light-content'
          renderTouchableFixedForeground={() => {
            return (
              <Header noShadow style={comStyles.header}>
                <Left>
                  <Button transparent onPress={() => this._handleBack()}>
                    <Icon name='arrow-back' style={{color: '#fff'}} />
                  </Button>
                </Left>

                <Body>
                  <Title style={{color: '#fff'}}>តេស្ត{te[this.screen.category]}</Title>
                </Body>

                <Right>
                  <Text style={{color: '#fff'}}>{this.state.data.length} / 18</Text>
                </Right>
              </Header>
            )
          }}
          renderForeground={() =>  (
              <Header span style={comStyles.header}>
                <View style={{ width: '100%', position: 'absolute', bottom: 10, flexDirection: 'row', alignItems: 'center'}}>
                  { this._renderNumberIcon(1) }
                  { this._renderLine() }
                  { this._renderNumberIcon(2) }
                  { this._renderLine() }
                  { this._renderNumberIcon(3) }
                  { this._renderLine() }
                  { this._renderNumberIcon(4) }
                  { this._renderLine() }
                  { this._renderNumberIcon(5) }
                  { this._renderLine() }
                  { this._renderNumberIcon(6) }
                </View>
              </Header>
          )}>

          <Content padder>
            <TriggeringView onHide={() => this.setState({showMe: true})} onDisplay={() => this.setState({showMe: false})}>
            </TriggeringView>

            <View style={{flexDirection: 'row'}}>
              <Text style={{flex: 1}}>សូមបំពេញក្នុងប្រអប់ខាងមុខឃ្លាទាំងឡាយណាដែល បរិយាយពីអត្តចរិករបស់អ្នក!</Text>
            </View>

            { this._renderCheckBoxes() }
          </Content>
        </HeaderImageScrollView>
      </Container>
    )
  }

  render() {
    return(
      <View style={{flex: 1}}>
        { this._renderHeader() }

        <BackConfirmDialog
          visible={this.state.confirmDialogVisible}
          onTouchOutside={() => this.setState({confirmDialogVisible: false})}
          onPressYes={() => this._onYes()}
          onPressNo={() => this._onNo()}
        />
        <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={this._goNext} />
      </View>
    )
  }
}

const comStyles = StyleSheet.create({
  numberWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  numberIcon: {
    backgroundColor: '#fff',
    width: 30, height: 30,
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inactiveIcon: {
    backgroundColor: 'rgb(13,82,150)'
  },
  iconText: {
    fontSize: 20,
    color: 'rgb(24,118,211)'
  },
  header: {
    backgroundColor: 'rgb(24,118,211)',
    borderBottomWidth: 0
  },
  line: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgb(13,82,150)',
    margin: 5
  }
});
