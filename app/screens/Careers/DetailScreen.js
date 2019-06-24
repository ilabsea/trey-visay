import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  Platform
} from 'react-native';
import mainStyles from '../../assets/style_sheets/main/main';
import Images from '../../assets/images_js/careers_images';
import StatusBar from '../../components/shared/status_bar';

export default class DetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack, state } = navigation;
    let marginTop = !!state.params && state.params.fromShowCategory ? 0 : 24;
    return {
      headerStyle: {
        marginTop: Platform.OS == 'ios' ? 0 : marginTop
      }
    }
  };

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
    let imageName = this.state.career.image_name ? this.state.career.image_name: 'default';
    return (
      <View style={{margin: 20}}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Image
            resizeMode="cover"
            style={{width: imageHeight, height: imageHeight, borderRadius: 8}}
            source={Images[imageName]}/>
            <Text style={mainStyles.title}>{this.state.title}</Text>
        </View>
        <Text>{this.state.career.description || 'មិនទាន់មានទិន្នន័យ'}</Text>
      </View>
    )
  }

  render() {
    return (
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <StatusBar />
        { this._renderContent() }
      </ScrollView>
    )
  }
}
