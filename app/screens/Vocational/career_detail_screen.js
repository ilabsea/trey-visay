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
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';
import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';
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

  _renderForeground = () => {
    return (
      <View style={{backgroundColor: 'transparent', height: 50, justifyContent: 'center', alignItems: 'flex-end', marginBottom: 16, flexDirection: 'row'}}>
        { !this.state.isLogin &&
          <Image
            style={{width: 50, height: 48}}
            source={require('../../assets/images/account/register.png')}/>
        }
      </View>
    )
  }

  _renderNavigation = () => {
    return (
      <View style={{flexDirection: 'row'}}>
        <BackButton navigation={this.props.navigation}/>
      </View>
    )
  }

  _renderContent = () => {
    return (
      <View>
        {this.renderSchoolList()}
        {this.renderVideoList()}
      </View>
    )
  }

  render() {
    return (
      <ScrollableHeader
        renderContent={ this._renderContent }
        renderNavigation={ this._renderNavigation }
        renderForeground={ this._renderForeground }
        title={this.state.career.name}
        largeTitle={this.state.career.name}
      />
    );
  }
}
