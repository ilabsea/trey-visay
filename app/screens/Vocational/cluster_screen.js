import React, { Component } from 'react';
import { View, Text, FlatList } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

// Utils
import mainStyles from '../../assets/style_sheets/main/main';
import StatusBar from '../../components/shared/status_bar';
import ButtonList from '../../components/list/button_list';
import CardItem from '../../components/list/card_item';
import CarouselItem from '../../components/shared/carousel_item';
import BackButton from '../../components/shared/back_button';
import ScrollableHeader from '../../components/scrollable_header';
import CareersClusterObj from '../../utils/Vocational/CareerCluster';

export default class CareerClusterScreen extends Component {
  careersClusters = [];
  _keyExtractor = (item, index) => index.toString();

  constructor(props){
    super(props);
    CareersClusterObj.setCareersClusters();
    this.careersClusters = CareersClusterObj.getCareersClusters();
    this.state = {
      loading: false,
      size: 3
    }
  }

  renderItem(item, index){
    return(
      <CardItem item={item} text={item.name} index={index} width={'40%'} height={'18%'}
        onPress={() => this.props.navigation.navigate('CareerDetailScreen', {
          career: item
        })} />
    )
  }

  renderCareerCluster(cluster, i) {
    return (
      <View key={i} style={mainStyles.carouselBox}>
        <ButtonList hasLine={false} title={cluster.name_kh} boldFont={{fontWeight: 'bold'}}
          onPress={() => {
            this.props.navigation.navigate('CareerIndexScreen', {
              code: cluster.code,
              title: cluster.name_kh,
              careers: cluster.careers
            })
          }} />
        <CarouselItem
          data={cluster.careers}
          renderItem={({item, index}) => this.renderItem(item, index)}/>
      </View>
    )
  }

  handleLoadMore = () => {
    size = this.state.size + 3;
    this.setState({size: size})
  }

  renderContent = () => {
    return (
      <View style={{backgroundColor: 'paleGrey', marginTop: 20}}>
        <FlatList
          data={ this.careersClusters.slice(0, this.state.size) }
          renderItem={ ({item, i}) => this.renderCareerCluster(item, i) }
          refreshing={false}
          keyExtractor={this._keyExtractor}
          onEndReached={this.handleLoadMore.bind(this)}
          onEndReachedThreshold={0.4}
        />
      </View>
    )
  }

  renderNavigation = () => {
    return (
      <BackButton navigation={this.props.navigation} text='ត្រលប់ក្រោយ'/>
    )
  }

  render() {
    let title = 'ប្រភេទការងារ';

    return (
      <ScrollableHeader
        renderContent={ this.renderContent }
        renderNavigation={ this.renderNavigation }
        title={title}
        largeTitle={title}
      />
    );
  }
}
