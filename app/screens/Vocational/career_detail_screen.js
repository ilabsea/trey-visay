import React, {Component} from 'react';
import { View, Linking, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import mainStyles from '../../assets/style_sheets/main/main';
import SchoolListView from '../../components/schools/school_list';
import VideoListView from '../../components/video/video_list';
import ScrollableHeader from '../../components/scrollable_header';
import Text from '../../components/Text';
import CareerProfile from '../../components/careers/CareerProfile';

import Job from '../../models/Job';

export default class ShowCategoryScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      schools: Job.getSchoolsByJobId(props.route.params.career_id),
      career: Job.findById(props.route.params.career_id),
      videos: Job.getVideosById(props.route.params.career_id)
    };
  }

  _keyExtractor = (item, index) => index.toString();

  renderSchoolList(){
    return (
      <React.Fragment>
        <Text style={mainStyles.sectionText}>មហាវិទ្យាល័យ</Text>
        <SchoolListView navigation={this.props.navigation} data={this.state.schools}/>
      </React.Fragment>
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

  renderVideo(video) {
    return <VideoListView key={video.uuid} onPress={() => this._onOpenUrl(video.url)} item={video} />
  }

  renderVideoList(){
    return(
      <React.Fragment>
        <Text style={[mainStyles.sectionText, {marginBottom: 4, marginTop: 8}]}>វីដេអូ</Text>
        { this.state.videos.map(video => this.renderVideo(video)) }
      </React.Fragment>
    )
  }

  _renderContent = () => {
    return (
      <View style={{paddingBottom: 20}}>
        { !!this.state.schools.length && this.renderSchoolList()}
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
        headerMaxHeight={ (Platform.OS === 'ios' && DeviceInfo.hasNotch()) ? 220 : 240}
      />
    )
  }
}
