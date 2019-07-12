import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { Content } from "native-base";

import categoryList from '../../data/json/characteristic_jobs';
import CardItem from '../../components/list/card_item';
import StatusBar from '../../components/shared/status_bar';
import mainStyles from '../../assets/style_sheets/main/main';

export default class ShowCategoryScreen extends Component {
  constructor(props) {
    super(props);

    let id = props.navigation.state.params.careerId || '1';
    category = categoryList.find((obj) => obj.id == id);
    props.navigation.setParams({title: category.career_title});

    this.state = {
      careers: category.careers
    }
  }

  _renderItems() {
    let doms = this.state.careers.map((career, index) => {
      return(
        <View key={index} style={{marginBottom: 20}}>
          <CardItem
            borderRadiusOnlyOnTop={true}
            item={career}
            text={career.name}
            width={'42%'}
            height={'20%'}
            onPress={() => this.props.navigation.navigate('CareerDetailScreen', {
              career: career,
              fromShowCategory: true
            })}/>
        </View>
      )
    })

    return (
      <View style={[mainStyles.grid, {marginBottom: 0}]}>
        {doms}
      </View>
    );
  }

  _renderContent() {
    return (
      <ScrollView>
        { this._renderItems() }
      </ScrollView>
    )
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <StatusBar />

        { this._renderContent() }
      </View>
    );
  };
}
