import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
} from 'react-native';

// Utils
import mainStyles from '../../assets/style_sheets/main/main';
import ButtonList from '../../components/list/button_list';
import StatusBar from '../../components/shared/status_bar';
import CardItem from '../../components/list/card_item';
import Job from '../../models/Job';

export default class CareerIndexScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      // careers: props.route.params.careers
      careers: Job.findAllByJobCluster(props.route.params.cluster_id)
    }
  }

  renderCareer(career, i) {
    return(
      <View style={{marginBottom: 20}} key={i}>
        <CardItem
          borderRadiusOnlyOnTop={true}
          item={career}
          text={career.name}
          width={'42%'}
          height={'20%'}
          onPress={() => this.props.navigation.navigate('CareerDetailScreen', {
            career: career
          })}/>
      </View>
    )
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <StatusBar />

        <ScrollView>
          <View style={[mainStyles.grid, {marginBottom: 0}]}>
            { this.state.careers.map((career, i) => {
              { return(this.renderCareer(career, i)) }
            })}
          </View>
        </ScrollView>
      </View>
    )
  }
}
