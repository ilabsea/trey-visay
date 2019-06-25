import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  Image,
  Linking,
  Dimensions,
  FlatList
} from 'react-native';

import mainStyles from '../../assets/style_sheets/main/main';
import StatusBar from '../../components/shared/status_bar';
import SchoolListView from '../../components/schools/school_list';
import VideoListView from '../../components/video/video_list';
import universities from '../../data/json/universities';
import mapping from '../../data/json/careers/mapping';
import videoList from '../../data/json/videos';
import Images from '../../assets/images_js/careers_images'

export default class ShowCategoryScreen extends Component {
  constructor(props){
    super(props);

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

  _renderCareerProfile() {
    let imageHeight = 160;
    let imageUrl = Images['default'];
    if (this.state.career.image_name) {
      imageUrl = Images[this.state.career.image_name];
    }

    return (
      <View style={{paddingTop: 20, paddingBottom: 16, alignItems: 'center', backgroundColor: '#fff'}}>
        <Image
          resizeMode="cover"
          style={{width: imageHeight, height: imageHeight, borderRadius: 8}}
          source={imageUrl}/>
        <Text style={[mainStyles.title, {marginTop: 8}]}>{this.state.career.name}</Text>
      </View>
    )
  }

  _renderContent = () => {
    return (
      <View>
        {this._renderCareerProfile() }
        {this.renderSchoolList()}
        {this.renderVideoList()}
      </View>
    )
  }

  render() {
    return (
      <ScrollView>
        <StatusBar />
        { this._renderContent() }
      </ScrollView>
    )
  }
}
