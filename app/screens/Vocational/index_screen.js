import React, {Component} from 'react';
import { ScrollView, View } from 'react-native';

// Utils
import mainStyles from '../../assets/style_sheets/main/main';
import CustomNavigationHeader from '../../components/shared/CustomNavigationHeader'
import CardItem from '../../components/list/card_item';
import Job from '../../models/Job';

export default class CareerIndexScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      careers: Job.findAllByJobCluster(props.route.params.cluster_code)
    }
  }

  renderCareer(career, i) {
    return(
      <View style={{marginBottom: 20}} key={i}>
        <CardItem
          borderRadiusOnlyOnTop={true}
          item={career}
          text={career.name}
          image={career.logoSource}
          width={'42%'}
          height={'20%'}
          onPress={() => this.props.navigation.navigate('CareerDetailScreen', {career_id: career.id})}/>
      </View>
    )
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <CustomNavigationHeader title={this.props.route.params.title} />

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
