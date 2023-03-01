import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-paper';

import mainStyles from '../../assets/style_sheets/main/main';
import StatusBar from '../../components/shared/status_bar';
import characteristicList from '../../data/json/characteristic_jobs';
import realm from '../../db/schema';
import User from '../../utils/user';
import CareerImages from '../../assets/images_js/careers_images';

export default class PersonalityJobsReport extends Component {
  componentWillMount() {
    let user = User.getCurrent();
    let game = user.games.filtered('uuid="' + this.props.route.params.gameUuid + '"')[0];
    let personalityCareers = game.personalityCareers.map(career => career.value);
    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);
    let jobs = currentGroup.careers.filter(career => personalityCareers.includes(career.code));

    this.setState({
      user: user,
      game: game,
      jobs: jobs,
    })
  }

  _renderContent() {
    return (
      <View>
        <Text style={mainStyles.sectionText}>មុខរបរ</Text>
        <Divider/>
        <View style={{paddingHorizontal: 20}}>
          { this.state.jobs.map((job, i) => {
            let imageUrl = CareerImages['default'];
            if (!!job.image_name) { imageUrl = CareerImages[job.image_name] }

            return (
              <View key={i} style={mainStyles.thumnailList}>
                <Image
                  style={{width: 78, height: 78}}
                  source={imageUrl} />
                <Text style={{flex: 1, paddingHorizontal: 18}}>{job.name}</Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />

        <ScrollView>
          <View style={{flex: 1, marginTop: 8}}>
            { this._renderContent() }
          </View>
        </ScrollView>
      </View>
    )
  }
}
