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
    return (
      <View style={{margin: 20}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            resizeMode="cover"
            style={{width: imageHeight, height: imageHeight}}
            source={require('../../assets/images/careers/default.png')}/>
            <Text style={mainStyles.title}>{this.state.title}</Text>
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
