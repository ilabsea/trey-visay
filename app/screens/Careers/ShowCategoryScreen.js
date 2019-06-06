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
import StatusBar from '../../components/shared/status_bar';
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
    let {width} = Dimensions.get('window');
    let totalMargin = 60;
    let height = (width/2 - totalMargin) * 1.6;

    let doms = this.state.careers.map((career, index) => {
      let imageUrl = require('../../assets/images/careers/default.png');
      if (career.image) { imageUrl = Images[career.image] }

      return (
        <View key={index} style={{width: '50%', height: height, padding: 10}}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('CareerDetailScreen', {career: career})}>
            <View style={{backgroundColor: '#fff', height: '100%', borderRadius: 8, overflow: 'hidden'}}>
              <Image
                resizeMode="cover"
                style={{width: '100%', height: '70%', borderTopLeftRadius: 8, borderTopRightRadius: 8}}
                source={imageUrl} />

              <View style={{padding: 5, flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{fontSize: 13, lineHeight: 24}} numberOfLines={2}>{career.name}</Text>
              </View>
            </View>
          </TouchableOpacity>

        </View>
      )
    })

    return (
      <View style={{flexWrap: 'wrap', flexDirection: 'row', padding: 10}}>
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
