import React, { Component } from 'react';
import {
  View, Text, Container, Header, Left, Body, Right, Button, Icon, Title, Content
} from 'native-base';
import Accordion from 'react-native-collapsible/Accordion';

import API from '../../../api/schools';
import mainStyles from '../../../assets/style_sheets/main/main';

import ButtonList from '../../../components/list/button_list';

const SECTIONS = [
  {
    title: 'ជ្រេីសរេីសទីតាំង',
    content: 'Lorem ipsum...',
  },
  {
    title: 'ជ្រេីសរេីសជំនាញ',
    content: 'Lorem ipsum...',
  },
];


class FilterScreen extends Component {

  constructor(props){
    super(props);

    this.state ={
      majors: []
    }
  }

  componentDidMount(){

  }
  render(){
    return (
      <Container>
        <Content>
          <View style={[mainStyles.container , {marginTop: 26}]}>
            <ButtonList
              onPress={() => {
                console.log('hello button list')
              }}
              title='ជ្រេីសរេីសទីតាំង'
            />

            <ButtonList
              onPress={() => {
                console.log('hello button list')
              }}
              title='ជ្រេីសរេីសជំនាញ'
            />

          </View>
        </Content>
      </Container>
    )
  }
}


export default FilterScreen;
