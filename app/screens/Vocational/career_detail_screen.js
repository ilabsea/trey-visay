import React, {Component} from 'react';
import { View, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

import mainStyles from '../../assets/style_sheets/main/main';
import SchoolListView from '../../components/schools/school_list';
import VideoListView from '../../components/video/video_list';
import ScrollableHeader from '../../components/scrollable_header';
import Text from '../../components/Text';
import CareerProfile from '../../components/careers/CareerProfile';
import JobDetailAccordion from '../../components/jobDetails/JobDetailAccordion'

import Job from '../../models/Job';
import visitService from '../../services/visit_service';

export default class ShowCategoryScreen extends Component {
  constructor(props){
    super(props);
    this.state = {
      schools: Job.getSchoolsByJobId(props.route.params.career_id),
      career: Job.findById(props.route.params.career_id),
      videos: Job.getVideosById(props.route.params.career_id)
    };
  }

  componentDidMount() {
    visitService.recordVisitDetailScreen('job', this.props.route.params.career_id)
  }

  _keyExtractor = (item, index) => index.toString();

  renderSchoolList(){
    return (
      <React.Fragment>
        <Text style={mainStyles.sectionText}>មហាវិទ្យាល័យ</Text>
        <SchoolListView data={this.state.schools}/>
      </React.Fragment>
    )
  }

  renderVideo(video) {
    return <VideoListView key={video.uuid} item={video} />
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
      <View style={{paddingBottom: 20, paddingTop: 8}}>
        <JobDetailAccordion job={this.state.career} />
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
