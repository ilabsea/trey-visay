import React, { Component } from 'react';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { View, StyleSheet, Text } from 'react-native';
import { Container, Content, ListItem, Left, Body, Icon, Right } from 'native-base';
import styles from '../../assets/style_sheets/list';
import majorList from '../../data/json/personality_major';

import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';

export default class PersonalityAssessmentMajorList extends Component {
  _onPressItem(major) {
    if (!major.basic_knowledge) { return; }

    this.props.navigation.navigate('MajorDetailScreen', {title: major.name_km, major: major})
  }

  _renderMajorList = () => {
    let category = this.props.navigation.getParam('category');
    let majors = majorList.filter(obj => category.majors.includes(obj.code));
    let arr = majors.filter(x => !!x.basic_knowledge);
    arr = arr.concat(majors.filter(x => !x.basic_knowledge));

    let doms = arr.map((major, index) => {
      return (
        <ListItem
          key={index}
          button
          onPress={() => this._onPressItem(major)}
          >
          <Body>
            <Text>{major.name_km}</Text>
          </Body>
          <Right>
            { !!major.basic_knowledge && <AwesomeIcon name='angle-right' size={24} color='#bbb' /> }
          </Right>
        </ListItem>
      )
    });

    return (
      <View>
        <Text style={{padding: 16}}>អ្នកដែលស្ថិតក្នុងក្រុមមនុស្សដែលមានប្រភេទបុគ្គលិកលក្ខណៈបែប{category.name_km}គួរជ្រើសយកការសិក្សាលើមុខជំនាញពាក់ព័ន្ធដូចជា៖</Text>

        <Content style={{backgroundColor: '#fff'}}>
          { doms }
        </Content>
      </View>
    );
  }

  _renderForeground = () => {
    return (
      <View style={{marginBottom: -4}}>
        <Text style={scrollHeaderStyles.largeTitle}>ជម្រើសនៃការសិក្សាកម្រិតឧត្តមសិក្សា</Text>
        <Text style={scrollHeaderStyles.subTitle}>ជំនាញសិក្សានៅសាកលវិទ្យាល័យ</Text>
      </View>
    )
  }

  render() {
    let title = 'ជម្រើសនៃការសិក្សាកម្រិតឧត្តមសិក្សា';
    return (
      <ScrollableHeader
        renderContent={ this._renderMajorList }
        renderNavigation={ () => <BackButton navigation={this.props.navigation}/> }
        title={title}
        renderForeground={ this._renderForeground }
      />
    )
  }
}
