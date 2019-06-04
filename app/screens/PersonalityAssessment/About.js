import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import ScrollableHeader from '../../components/scrollable_header';
import { Content, Button, Icon, Card, CardItem, Body, Left, Thumbnail } from 'native-base';

export default class About extends Component {
  _renderContent = () => {
    return (
      <Card transparent>
        <CardItem header bordered>
          <Left>
            <Thumbnail source={require('../../assets/images/list.png')} />
            <Body>
              <Text>ការធ្វើតេស្តស្វែងយល់អំពី បុគ្គលិកលក្ខណៈ</Text>
            </Body>
          </Left>
        </CardItem>

        <CardItem>
          <Body>
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
          </Body>
        </CardItem>
      </Card>
    )
  }

  _renderNavigation = () => {
    return (
      <Button transparent onPress={() => this.props.navigation.goBack()}>
        <Icon name='arrow-back' style={{color: '#fff'}} />
      </Button>
    )
  }

  render() {
    let title = 'អំពីការធ្វើតេស្តស្វែងយល់បុគ្គលិកលក្ខណៈ';
    return (
      <ScrollableHeader
        renderContent={ this._renderContent }
        renderNavigation={ this._renderNavigation }
        title={title}
        renderForeground={() => <Text style={styles.largeTitle}>{title}</Text>}
      />
    )
  }
}

const styles = StyleSheet.create({
  rowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  imageWrapper: {
    width: 64,
    height: 64,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14
  },
  largeTitle: {
    fontSize: 20,
    color: '#fff',
    lineHeight: 42
  }
})
