import React, {Component} from 'react';
import {
  Text,
  View,
  Linking,
  Dimensions,
  FlatList
} from 'react-native';

import mainStyles from '../../assets/style_sheets/main/main';
import SchoolListView from '../../components/schools/school_list';
import VideoListView from '../../components/video/video_list';
import universities from '../../data/json/universities';
import mapping from '../../data/json/careers/mapping';
import videoList from '../../data/json/videos';
import ScrollableHeader from '../../components/scrollable_header';
import CareerProfile from '../../components/careers/CareerProfile';

import Job from '../../models/Job';

export default class ShowCategoryScreen extends Component {
  constructor(props){
    super(props);

    // let career = props.route.params.career;
    const career = Job.findById(props.route.params.career_id)
    let videos = []

    // let schools = universities.filter((school, pos) => career.schools.includes(school.code));
    // let careerCluster = mapping.find(code => code.career_code == career.code)
    // let videos = [];

    // if (careerCluster.video_code) {
    //   let videoCodes = careerCluster.video_code.split(';').map(item => item.trim());
    //   videos = videoList.filter((video, pos) => videoCodes.includes(video.code));
    // }

    this.state = {
      // schools: schools,
      schools: Job.getSchoolsByJobId(props.route.params.career_id),
      career: career,
      videos: Job.getVideosById(props.route.params.career_id)
    };
  }

  _keyExtractor = (item, index) => index.toString();

  renderSchoolList(){
    return (
      <View>
        { !!this.state.schools.length && <Text style={mainStyles.sectionText}>មហាវិទ្យាល័យ</Text>}
        <SchoolListView navigation={this.props.navigation} data={this.state.schools}/>
      </View>
    )
  }

  _onOpenUrl(url) {
    Linking.canOpenURL(url).then((supported) => {
      if (!supported) {
        return;
      }

      return Linking.openURL(url);
    }).catch(()=>{});
  }

  renderItem(item) {
    return <VideoListView onPress={() => this._onOpenUrl(item.url)} item={item} />
  }

  renderVideoList(){
    let { width } = Dimensions.get('window');
    return(
      <React.Fragment>
        <Text style={[mainStyles.sectionText, {marginBottom: 4, marginTop: 8}]}>វីដេអូ</Text>
        <FlatList
          data={ this.state.videos }
          renderItem={ ({item}) => this.renderItem(item) }
          keyExtractor={this._keyExtractor}
        />
      </React.Fragment>
    )
  }

  _renderContent = () => {
    return (
      <View style={{paddingBottom: 20}}>
        {this.renderSchoolList()}
        {!!this.state.videos.length && this.renderVideoList()}
      </View>
    )
  }

  render() {
    return (
      <ScrollableHeader
        renderContent={ this._renderContent }
        title={this.state.career.name}
        renderForeground={ () => <CareerProfile career={this.state.career} /> }
        headerMaxHeight={240}
      />
    )
  }
}
