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
import characteristicList from '../../data/json/characteristic_jobs';
import mapping from '../../data/json/careers/mapping';

export default class CareerIndexScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      careers: this.getCareers()
    }
  }

  getCareers() {
    let careerClusterCode = this.props.navigation.state.params.code;
    let codes = mapping.filter(obj => obj.career_cluster_code == careerClusterCode);
    codes = codes.map(x => x.career_code);

    let careerList = characteristicList.map(x => x.careers);
    careerList = [].concat.apply([], careerList);

    let allCareers = [...new Set(careerList.map(x => x.code))];
    allCareers = allCareers.map(code => careerList.find(item => item.code == code));

    return allCareers.filter(x => codes.includes(x.code));
  }

  renderCareer(career, i) {
    return(
      <View key={i}>
        <ButtonList
          onPress={() => {
            this.props.navigation.navigate('CareerDetailScreen', {
              career: career
            })
          }}
          title={career.name} />
      </View>
    )
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <StatusBar />

        <ScrollView>
          <View style={mainStyles.box}>
            { this.state.careers.map((career, i) => {
              { return(this.renderCareer(career, i)) }
            })}
          </View>
        </ScrollView>
      </View>
    )
  }
}
