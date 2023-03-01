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
import BackButton from '../../components/shared/back_button';
import CareerProfile from '../../components/careers/CareerProfile';

export default class ShowCategoryScreen extends Component {
  constructor(props){
    super(props);

    let career = props.route.params.career;
    let schools = universities.filter((school, pos) => career.schools.includes(school.code));
    let careerCluster = mapping.find(code => code.career_code == career.code)
    let videos = [];

    if (careerCluster.video_code) {
      let videoCodes = careerCluster.video_code.split(';').map(item => item.trim());
      videos = videoList.filter((video, pos) => videoCodes.includes(video.code));
    }

    this.state = {
      schools: schools,
      career: career,
      videos: videos
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
        { !!this.state.videos.length && <Text style={mainStyles.sectionText}>វីដេអូ</Text> }

        <FlatList
          data={ this.state.videos }
          renderItem={ ({item}) => this.renderItem(item) }
          keyExtractor={this._keyExtractor}
        />
      </View>
    )
  }

  _renderContent = () => {
    return (
      <View style={{paddingBottom: 20}}>
        {this.renderSchoolList()}
        {this.renderVideoList()}
      </View>
    )
  }

  render() {
    return (
      <ScrollableHeader
        renderContent={ this._renderContent }
        title={this.state.career.name}
        renderNavigation={ () => <BackButton navigation={this.props.navigation}/> }
        renderForeground={ () => <CareerProfile career={this.state.career} /> }
        headerMaxHeight={240}
      />
    )
  }
}
