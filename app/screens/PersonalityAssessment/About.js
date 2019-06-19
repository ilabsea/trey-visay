import React, { Component } from 'react';
import {
  View,
  Text,
} from 'react-native';

import { Container, Content } from 'native-base';

export default class About extends Component {
  _renderContent = () => {
    return (
      <Content style={{padding: 20}}>
        <Text>តាមការសិក្សាស្រាវជ្រាវរបស់អ្នកឯកទេសខាងចិត្តសាស្ត្របង្ហាញថា បុគ្គលិកលក្ខណៈរបស់មនុស្ស ត្រូវបានចែកចេញជា ៦ ប្រភេទ៖</Text>

        <View style={{flexDirection: 'row', paddingLeft: 20, marginBottom: 12}}>
          <View style={{flex: 1}}>
            <Text>1. ប្រាកដនិយម</Text>
            <Text>(Realistic)</Text>
          </View>
          <View style={{flex: 1}}>
            <Text>4. សង្គម</Text>
            <Text>(Social)</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', paddingLeft: 20, marginBottom: 12}}>
          <View style={{flex: 1}}>
            <Text>2. ពូកែអង្កេត</Text>
            <Text>(Investigative)</Text>
          </View>
          <View style={{flex: 1}}>
            <Text>5. ត្រិះរិះពិចារណា</Text>
            <Text>(Enterprising)</Text>
          </View>
        </View>

        <View style={{flexDirection: 'row', paddingLeft: 20}}>
          <View style={{flex: 1}}>
            <Text>3. សិល្បៈនិយម</Text>
            <Text>(Artisitc)</Text>
          </View>
          <View style={{flex: 1}}>
            <Text>6. សណ្ដាប់ធ្នាប់</Text>
            <Text>(Conventional)</Text>
          </View>
        </View>
      </Content>
    )
  }

  render() {
    return (
      <Container>
        { this._renderContent() }
      </Container>
    )
  }
}
