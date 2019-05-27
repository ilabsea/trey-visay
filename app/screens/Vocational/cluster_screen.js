import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

// Utils
import mainStyles from '../../assets/style_sheets/main/main';
import StatusBar from '../../components/shared/status_bar';
import ButtonList from '../../components/list/button_list';
import CardItem from '../../components/list/card_item';
import CarouselItem from '../../components/shared/carousel_item';
import LongText from '../../components/careers/long_text';
import characteristicList from '../../data/json/characteristic_jobs';
import careersClusters from '../../data/json/careers/career_clusters';
import mapping from '../../data/json/careers/mapping';

export default class CareerClusterScreen extends Component {
  componentWillMount() {
    let currentGroup = characteristicList.find((obj) => obj.id == 4);

    this.setState({
      currentGroup: currentGroup,
    });
    this.props.navigation.setParams({
      title: 'ជំនាញវិជ្ជាជីវៈ',
      content: currentGroup.recommendation
    })
  }

  getCareers(cluster){
    codes = mapping.filter(obj => { return obj.career_cluster_code == cluster.code });
    careers = [];
    characteristicList.map(obj => {
      for (let i = 0 ; i < codes.length; i++) {
        careerCode = codes[i].career_code;
        obj.careers.filter(c => {
          if (c.code == careerCode ){
            careers.push(c)
          }
        })
      }
    });

    return careers;
  }

  renderItem(item, index){
    return(
      <CardItem text={item.name} index={index} width={'40%'} height={'18%'}
        onPress={() => this.props.navigation.navigate('CareerDetailScreen', {
          career: item
        })} />
    )
  }

  renderCareerCluster(cluster, i) {
    careers = this.getCareers(cluster);
    return (
      <View key={i} style={mainStyles.carouselBox}>
        <ButtonList hasLine={false} title={cluster.name_kh}
          onPress={() => {
            this.props.navigation.navigate('CareerIndexScreen', {
              code: cluster.code,
              title: cluster.name_kh
            })
          }} />
        <CarouselItem
          data={careers}
          renderItem={({item, index}) => this.renderItem(item, index)}/>
      </View>
    )
  }

  renderContent() {
    return (
      <View style={{backgroundColor: 'paleGrey'}}>
        <LongText text={this.state.currentGroup.recommendation} />

        <Text style={mainStyles.sectionText}>
          មុខរបរមានដូចខាងក្រោម៖
        </Text>

        { careersClusters.map((cluster, i) => {
          { return (this.renderCareerCluster(cluster, i))}
        })}
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />

        <ScrollView>
          { this.renderContent() }
        </ScrollView>
      </View>
    );
  }
}
