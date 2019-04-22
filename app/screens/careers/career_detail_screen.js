import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  NetInfo,
  Linking,
  Dimensions
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import Carousel from 'react-native-snap-carousel';
import { Divider } from 'react-native-elements';

import mainStyles from '../../assets/style_sheets/main/main';
import StatusBar from '../../components/shared/status_bar';
import SchoolListView from '../../components/schools/school_list';
import VideoView from '../../components/careers/video_view';
import universities from '../../data/json/universities';
import mapping from '../../data/json/careers/mapping';
import videoList from '../../data/json/videos';

export default class CareerDetailScreen extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    let career = this.props.navigation.state.params.career;
    let schools = universities.filter((school, pos) => {
      return career.schools.includes(school.code)
    });

    let careerCluster = mapping.find(code => {return code.career_code == career.code})
    let videoCodes = careerCluster.video_code.split(';').map(function(item) {
      return item.trim();
    });;
    let videos = videoList.filter((video, pos) => { return videoCodes.includes(video.code) });

    this.setState({
      schools: schools,
      career: career,
      videos: videos
    })
  }

  _keyExtractor = (item, index) => index.toString();

  renderSchoolList(){
    return (
      <View>
        <Text style={mainStyles.sectionText}>
          សាលាខាងក្រោមមានបង្រៀនជំនាញនេះ ៖
        </Text>

        <SchoolListView navigation={this.props.navigation} data={this.state.schools}/>
      </View>
    )
  }

  onOpenUrl(url) {
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        return;
      }

      return Linking.openURL(url);
    }).catch(()=>{});
  }

  renderItem(item) {
    return (
      <VideoView
        onPress={() => this.onOpenUrl(item.url)}
        item={item} />
    )
  }

  renderVideoList(){
    let { width } = Dimensions.get('window');
    return(
      <View>
        <Text style={mainStyles.sectionText}>
          សូមមេីលវីដេអូខាងក្រោមដេីម្បីស្វែងយល់ពីជំនាញនេះ ៖
        </Text>

        <Carousel
          ref={(c) => { this._carousel = c; }}
          data={this.state.videos}
          renderItem={({item}) => this.renderItem(item)}
          sliderWidth={width}
          itemWidth={width-80}
          layout={'defualt'}
        />
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <ScrollView style={{flex: 1}}>
          { this.renderSchoolList() }

          { this.renderVideoList() }
        </ScrollView>
      </View>
    );
  }
}
