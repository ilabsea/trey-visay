import React, { Component } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Platform
} from 'react-native';

// import Button from '../../components/shared/button';
import StatusBar from '../../components/shared/status_bar';
import formStyles from '../../assets/style_sheets/login_form';
// import styles from '../../assets/style_sheets/assessment';

import realm from '../../db/schema';
import User from '../../utils/user';
import uuidv4 from '../../utils/uuidv4';
import { longDateFormat } from '../../utils/date';
import { Container, Header, Content, ListItem, Thumbnail, Text, Left, Body, Right, Icon, Card, CardItem, Title, Button } from 'native-base';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';

// import Icon from 'react-native-vector-icons/MaterialIcons';
import ReactNativeParallaxHeader from 'react-native-parallax-header';


const SCREEN_HEIGHT = 1000
const IS_IPHONE_X = SCREEN_HEIGHT === 812 || SCREEN_HEIGHT === 896;
const STATUS_BAR_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 44 : 20) : 0;
const HEADER_HEIGHT = Platform.OS === 'ios' ? (IS_IPHONE_X ? 88 : 64) : 64;
const NAV_BAR_HEIGHT = HEADER_HEIGHT - STATUS_BAR_HEIGHT;

const images = {
  background: require('../../assets/images/list.png'), // Put your own image here
};

export default class PersonalityAssessment extends Component {
  constructor(props) {
    super(props);

    let assessments = realm.objects('PersonalityAssessment').filtered('userUuid="' + User.getID() +'"');
    let assessment = assessments[assessments.length-1];
    let completedAssessments = realm.objects('PersonalityAssessment').filtered('isDone = true AND userUuid="' + User.getID() +'"').sorted('createdAt', true);
    let isContinued = !!assessment && !assessment.isDone && !!assessment.step;

    this.state = {
      assessment: assessment,
      completedAssessments: completedAssessments,
      isContinued: isContinued,
    };
  }

  _renderInstruction() {
    return (
      <Card transparent>
        <CardItem header bordered>
          <Left>
            <Thumbnail source={require('../../assets/images/list.png')} />
            <Body>
              <Text>ការធ្វើតេស្តស្វែងយល់អំពី បុគ្គលិកលក្ខណៈ</Text>
            </Body>
          </Left>
        </CardItem>

        <CardItem>
          <Body>
            <Text>តាមការសិក្សាស្រាវជ្រាវរបស់អ្នកឯកទេសខាងចិត្តសាស្ត្របង្ហាញថា បុគ្គលិកលក្ខណៈរបស់មនុស្ស ត្រូវបានចែកចេញជា ៦ ប្រភេទ៖</Text>

            <View style={{flexDirection: 'row', paddingLeft: 20, marginBottom: 12}}>
              <View style={{flex: 1}}>
                <Text>1. ប្រាកដនិយម</Text>
                <Text>(Realistic)</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>4. សង្គម</Text>
                <Text>(Social)</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingLeft: 20, marginBottom: 12}}>
              <View style={{flex: 1}}>
                <Text>2. ពូកែអង្កេត</Text>
                <Text>(Investigative)</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>5. ត្រិះរិះពិចារណា</Text>
                <Text>(Enterprising)</Text>
              </View>
            </View>

            <View style={{flexDirection: 'row', paddingLeft: 20}}>
              <View style={{flex: 1}}>
                <Text>3. សិល្បៈនិយម</Text>
                <Text>(Artisitc)</Text>
              </View>
              <View style={{flex: 1}}>
                <Text>6. សណ្ដាប់ធ្នាប់</Text>
                <Text>(Conventional)</Text>
              </View>
            </View>
          </Body>
        </CardItem>

        <CardItem footer style={{flexDirection: 'column'}}>
          <Button
            style={styles.button}
            onPress={this._startNewAssessment.bind(this)}>
            <Text style={styles.btnText}>
              ចាប់ផ្តើមថ្មី
            </Text>
          </Button>

          { this.state.isContinued &&
            <Button
              style={[styles.button, { backgroundColor: '#1976d2' , marginTop: 16}]}
              onPress={this._continueStep.bind(this)}
              >
              <Text style={styles.btnText}>បន្តទៅវគ្គមុន</Text>
            </Button>
          }

        </CardItem>
      </Card>
    )
  }

  _continueStep() {
    let category = this.state.assessment.step.split('Screen')[0].toLowerCase();
    this.props.navigation.navigate(this.state.assessment.step, {category: category});
  }

  _startNewAssessment() {
    let uncompletedAssessments = realm.objects('PersonalityAssessment').filtered('isDone = false AND userUuid = "' + User.getID() + '"');

    realm.write(() => {
      realm.delete(uncompletedAssessments);
      realm.create('PersonalityAssessment', this._buildData());

      this.props.navigation.navigate('RealisticScreen');
    });
  }

  _buildData() {
    return {
      uuid: uuidv4(),
      userUuid: User.getID(),
      createdAt: new Date()
    };
  }

  _renderHistory() {
    let count = this.state.completedAssessments.length;

    return(
      <View>
        { !!count &&
          <ListItem itemDivider>
            <Text>លទ្ធផលធ្វើតេស្ត</Text>
          </ListItem>
        }

        { this.state.completedAssessments.map((assessment, i) => this._renderListItem(assessment, i, count)) }
      </View>
    );
  }

  _renderListItem(assessment, index, count) {
    return (
      <ListItem
        key={index}
        button={true}
        onPress={() => this.props.navigation.navigate('AssessmentResultHistoryScreen', {num: (count - index), assessmentUuid: assessment.uuid})}
        thumbnail>
        <Left>
          <Thumbnail square source={require('../../assets/images/checklist.png')} />
        </Left>
        <Body>
          <Text>តេស្តលើកទី {count - index}</Text>
          <Text note numberOfLines={1}>ធ្វើនៅ: {longDateFormat(assessment.createdAt)}</Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }

  _renderHeader() {
    return(
      <Container style={{flex: 1}}>
        <HeaderImageScrollView
          minHeight={64}
          maxOverlayOpacity={0}
          disableHeaderGrow='true'
          renderTouchableFixedForeground={() => {
            return (
              <Header noShadow style={{borderBottomWidth: 0}}>
                <Left>
                  <Button transparent onPress={() => this.props.navigation.goBack(null)}>
                    <Icon name='arrow-back' />
                  </Button>
                </Left>

                { this.state.showMe &&
                  <Body>
                    <Title>Header</Title>
                  </Body>
                }
                <Right/>
              </Header>
            )
          }}

          renderForeground={() => (
            <Header span>
              <Body>
                <Title>Header</Title>
              </Body>
              <Right />
            </Header>
          )}
          >
          <StatusBar />
          <Content>
            <TriggeringView onHide={() => this.setState({showMe: true})} onDisplay={() => this.setState({showMe: false})}>
            </TriggeringView>
            { this._renderInstruction() }
            { this._renderHistory() }
          </Content>

        </HeaderImageScrollView>
      </Container>
    )
  }

  renderNavBar = () => (
    <View style={styles.navContainer}>
      <View style={styles.statusBar} />
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.iconLeft} onPress={() => {}}>
          <Icon name="add" size={25} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconRight} onPress={() => {}}>
          <Icon name="search" size={25} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  )

  renderContent = () => {
    return (
      <Content>
        { this._renderInstruction() }
        { this._renderInstruction() }
      </Content>
    )
  }

  render() {
    // return (
    //   <View style={styles.container}>
    //     <ReactNativeParallaxHeader
    //       headerMinHeight={HEADER_HEIGHT}
    //       headerMaxHeight={150}
    //       extraScrollHeight={20}
    //       navbarColor="#3498db"
    //       title="Parallax Header"
    //       titleStyle={styles.titleStyle}
    //       backgroundImageScale={1.2}
    //       renderNavBar={this.renderNavBar}
    //       renderContent={this.renderContent}
    //       containerStyle={styles.container}
    //       contentContainerStyle={styles.contentContainer}
    //       innerContainerStyle={styles.container}
    //       scrollViewProps={{
    //         onScrollBeginDrag: () => console.log('onScrollBeginDrag'),
    //         onScrollEndDrag: () => console.log('onScrollEndDrag'),
    //       }}
    //     />
    //   </View>
    // );

    return(
      this._renderHeader()
    )

    return (
      <Container style={{flex: 1}}>
        <StatusBar />
        <Content>
          { this._renderInstruction() }
          { this._renderHistory() }
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
  },
  navContainer: {
    height: HEADER_HEIGHT,
    marginHorizontal: 10,
  },
  statusBar: {
    height: STATUS_BAR_HEIGHT,
    backgroundColor: 'transparent',
  },
  navBar: {
    height: NAV_BAR_HEIGHT,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: 'transparent',
  },
  titleStyle: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
