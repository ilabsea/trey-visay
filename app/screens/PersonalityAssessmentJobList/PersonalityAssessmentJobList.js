import React, { Component } from 'react';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import { View, Text, ScrollView } from 'react-native';
import { Content, ListItem, Left, Body, Icon, Right, Card, CardItem } from 'native-base';
import majorList from '../../data/json/personality_major';
import characteristicList from '../../data/json/characteristic_jobs';
import styles from '../../assets/style_sheets/assessment';
import ButtonList from '../../components/list/button_list';

export default class PersonalityAssessmentJobList extends Component {
  _onPressListItem(job) {
    if(!job.short_description) { return; }

    this.props.navigation.navigate('PersonalityAssessmentJobDetailScreen', {title: job.name, job: job})
  }

  _renderList = () => {
    let category = this.props.navigation.getParam('category');
    let jobs = characteristicList.map((obj) => obj.careers);
    jobs = [].concat.apply([], jobs);
    jobs = jobs.filter(obj => category.careers.includes(obj.code));

    let allJobs = [...new Set(jobs.map(x => x.code))];
    allJobs = allJobs.map(code => jobs.find(job => job.code == code));

    let arr = allJobs.filter(x => !!x.short_description);
    arr = arr.concat(allJobs.filter(x => !x.short_description));

    let doms = arr.map((job, index) => {
      return (
        <ButtonList
          key={index}
          onPress={() => this._onPressListItem(job)}
          title={job.name}
          hideArrow={!job.short_description}
          hasLine={true}/>
      )
    });

    return (
      <Content style={{padding: 20, paddingTop: 4}}>
        <Card style={styles.curveBox}>
          <CardItem header bordered style={styles.header}>
            <Body>
              <Text>អ្នកដែលស្ថិតក្នុងក្រុមមនុស្សដែលមានប្រភេទបុគ្គលិកលក្ខណៈបែប{category.name_km}គួរចាប់យកអាជីពការងារជា៖</Text>
            </Body>
          </CardItem>

          { doms }
        </Card>
      </Content>
    );
  }

  render() {
    return (
      <ScrollView>
        { this._renderList() }
      </ScrollView>
    )
  }
}
