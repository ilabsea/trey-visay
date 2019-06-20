import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Content, Accordion } from "native-base";

import categoryList from '../../data/json/characteristic_jobs';
import CardItem from '../../components/list/card_item';
import StatusBar from '../../components/shared/status_bar';
import mainStyles from '../../assets/style_sheets/main/main';

import Images from '../../assets/images';

export default class ShowCategoryScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;
    return {
      title: !!state.params && state.params.title
    }
  };

  constructor(props) {
    super(props);

    let id = this.props.navigation.state.params.careerId || '1';
    category = categoryList.find((obj) => obj.id == id);
    this.props.navigation.setParams({title: category.career_title});

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
              career: career
            })}/>
        </View>
      )
    })

    return (
      <View style={mainStyles.grid}>
        {doms}
      </View>
    );
  }

  _renderContent() {
    return (
      <ScrollView>
        <Content>
          { this._renderItems() }
        </Content>
      </ScrollView>
    )
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <StatusBar translucent={false} />

        { this._renderContent() }
      </View>
    );
  };
}
