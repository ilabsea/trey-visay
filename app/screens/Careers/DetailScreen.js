import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView
} from 'react-native';
import mainStyles from '../../assets/style_sheets/main/main';

export default class DetailScreen extends Component {
  constructor(props){
    super(props);

    let career = this.props.navigation.state.params.career;

    this.state = {
      career: career,
      title: career.name
    }
  }

  _renderContent = () => {
    let imageHeight = 160;
    let imageUrl = require('../../assets/images/careers/default.png');
    if (this.state.career.image_name) {
      imageUrl = {uri: this.state.career.image_name};
    }

    return (
      <View style={{margin: 20}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            resizeMode="cover"
            style={{width: imageHeight, height: imageHeight, borderRadius: 8}}
            source={imageUrl}/>
          <Text style={[mainStyles.title, {marginTop: 8}]}>{this.state.title}</Text>
        </View>
        <Text>{this.state.career.description || 'មិនទាន់មានទិន្នន័យ'}</Text>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        { this._renderContent() }
      </ScrollView>
    )
  }
}
