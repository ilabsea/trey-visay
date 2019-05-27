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
  Dimensions,
  FlatList
} from 'react-native';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';

import mainStyles from '../../assets/style_sheets/main/main';
import StatusBar from '../../components/shared/status_bar';
import SchoolListView from '../../components/schools/school_list';
import VideoListView from '../../components/video/video_list';
import universities from '../../data/json/universities';
import mapping from '../../data/json/careers/mapping';
import videoList from '../../data/json/videos';

export default class ShowCategoryScreen extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount() {
    let career = this.props.navigation.state.params.career;
    let schools = universities.filter((school, pos) => {
      return career.schools.includes(school.code)
    });

    let careerCluster = mapping.find(code => {return code.career_code == career.code})
    let videos = [];
    if(careerCluster.video_code){
      let videoCodes = careerCluster.video_code.split(';').map(function(item) {
        return item.trim();
      });;
      videos = videoList.filter((video, pos) => { return videoCodes.includes(video.code) });
    }

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
          សាលា ៖
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
      <VideoListView
        onPress={() => this._onOpenUrl(item.url)}
        item={item} />
    )
  }

  renderVideoList(){
    let { width } = Dimensions.get('window');
    return(
      <View>
        <Text style={mainStyles.sectionText}>
          វីដេអូ ៖
        </Text>

        <FlatList
          data={ this.state.videos }
          renderItem={ ({item}) => this.renderItem(item) }
          keyExtractor={this._keyExtractor}
        />
      </View>
    )
  }

  renderNoData(){
    return(
      <View style={{flex:1, alignItems: 'center', marginTop: 24}}>
        <Text >
          គ្មានទិន្នន័យ
        </Text>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <ScrollView style={{flex: 1}}>
          { this.state.schools.length > 0 && this.renderSchoolList() }

          { this.state.videos.length > 0 && this.renderVideoList() }
          { this.state.schools.length == 0
            && this.state.videos.length == 0
            && this.renderNoData() }

        </ScrollView>
      </View>
    );
  }
}
