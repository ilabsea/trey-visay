import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';

import ScrollableHeader from '../../components/scrollable_header';
import { Container, Content, Button, Icon } from "native-base";

export default class DetailScreen extends Component {
  constructor(props){
    super(props);

    let career = this.props.navigation.state.params.career;

    this.state = {
      career: career,
      title: `អំពី${career.name}`
    }
  }

  _renderContent = () => {
    return (
      <Container>
        <Content padder>
          <Text>{this.state.career.description || 'មិនទាន់មានទិន្នន័យ'}</Text>
        </Content>
      </Container>
    )
  }

  _renderNavigation = () => {
    return (
      <Button transparent onPress={() => this.props.navigation.goBack()}>
        <Icon name='arrow-back' style={{color: '#fff'}} />
      </Button>
    )
  }

  _renderForeground = () => {
    let imageHeight = 160;

    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1, justifyContent: 'flex-end'}}>
          <Text style={{fontSize: 18, color: '#fff'}}>{this.state.title}</Text>
        </View>

        <View style={{marginRight: -20}}>
          <Image
            resizeMode="cover"
            style={{width: imageHeight, height: imageHeight}}
            source={require('../../assets/images/careers/edu_hat.png')}/>
        </View>
      </View>
    );
  }

  render() {
    return (
      <ScrollableHeader
        renderContent={ this._renderContent }
        renderNavigation={ this._renderNavigation }
        renderForeground={ this._renderForeground }
        title={this.state.title}
        headerMaxHeight={200}
      />
    )
  }
}
