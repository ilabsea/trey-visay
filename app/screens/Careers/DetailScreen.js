import React, {Component} from 'react';
import {
  Text,
  View,
} from 'react-native';

import CareerProfile from '../../components/careers/CareerProfile';
import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';

export default class DetailScreen extends Component {
  constructor(props){
    super(props);

    this.state = { career: props.navigation.getParam('career') };
  }

  _renderContent = () => {
    return (
      <View style={{marginTop: 16, padding: 20, backgroundColor: '#fff'}}>
        <Text style={{textAlign: 'justify'}}>{this.state.career.description || 'មិនទាន់មានទិន្នន័យ'}</Text>
      </View>
    )
  }

  render() {
    return (
      <ScrollableHeader
        renderContent={ this._renderContent }
        title={this.state.career.name}
        renderNavigation={ () => <BackButton navigation={this.props.navigation}/> }
        renderForeground={ () => <CareerProfile career={this.state.career} /> }
        headerMaxHeight={240}
      />
    )
  }
}
