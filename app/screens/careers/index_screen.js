import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

// Utils
import mainStyles from '../../assets/style_sheets/main/main';
import { FontSetting } from "../../assets/style_sheets/font_setting";
import ButtonList from '../../components/list/button_list';
import StatusBar from '../../components/shared/status_bar';
import SchoolListView from '../../components/schools/school_list';
import characteristicList from '../../data/json/characteristic_jobs';
import mapping from '../../data/json/careers/mapping';
import schoolList from '../../data/json/universities';

export default class CareerIndexScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      careers: []
    }
  }

  componentWillMount() {
    let careerClusterCode = this.props.navigation.state.params.code;

    codes = mapping.filter(obj => { return obj.career_cluster_code == careerClusterCode });
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

    this.setState({
      careers : careers
    })
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
