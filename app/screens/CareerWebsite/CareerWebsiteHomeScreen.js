import React, {Component} from 'react';

import ScrollableHeader from '../../components/scrollable_header';
import CareerWebsiteItem from './components/CareerWebsiteItem';
import CustomFlatListComponent from '../../components/shared/CustomFlatListComponent'

import keyword from '../../data/analytics/keyword';
import scrollableHeaderUtil from '../../utils/scrollable_header_util';
import {scrollViewPaddingBottom} from '../../constants/component_constant';

export default class CareerWebsiteHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.listRef = React.createRef();
  }

  renderContent = () => {
    let career_centers = [
      {
        name: 'ទីភ្នាក់ងារជាតិមុខរបរ និងការងារ',
        description: 'ការងារ កម្លាំងពលកម្ម និងព័ត៌មានទីផ្សារការងារ',
        url: 'http://nea.gov.kh/index.do',
        logo: require('../../assets/images/career_center/nea_logo.png'),
        screen: 'NeaCareerScreen',
        screen_title: 'ទីភ្នាក់ងារជាតិមុខរបរ និងការងារ',
        firebase_event_name: keyword.NEA_PLATFORM
      },
      {
        name: 'បងស្រី',
        description: 'ទីប្រឹក្សាការងារ',
        url: 'https://bongsrey.com/',
        logo: require('../../assets/images/career_center/bongsrey_logo.png'),
        screen: 'BongSreyCareerScreen',
        screen_title: 'បងស្រី ទីប្រឹក្សាការងារ',
        firebase_event_name: keyword.BONG_SREY
      },
      {
        name: 'បងស្រី',
        description: 'ទីប្រឹក្សាការងារ',
        url: 'https://bongsrey.com/',
        logo: require('../../assets/images/career_center/bongsrey_logo.png'),
        screen: 'BongSreyCareerScreen',
        screen_title: 'បងស្រី ទីប្រឹក្សាការងារ',
        firebase_event_name: keyword.BONG_SREY
      },
      {
        name: 'បងស្រី',
        description: 'ទីប្រឹក្សាការងារ',
        url: 'https://bongsrey.com/',
        logo: require('../../assets/images/career_center/bongsrey_logo.png'),
        screen: 'BongSreyCareerScreen',
        screen_title: 'បងស្រី ទីប្រឹក្សាការងារ',
        firebase_event_name: keyword.BONG_SREY
      },
      {
        name: 'បងស្រី',
        description: 'ទីប្រឹក្សាការងារ',
        url: 'https://bongsrey.com/',
        logo: require('../../assets/images/career_center/bongsrey_logo.png'),
        screen: 'BongSreyCareerScreen',
        screen_title: 'បងស្រី ទីប្រឹក្សាការងារ',
        firebase_event_name: keyword.BONG_SREY
      },
      {
        name: 'បងស្រី',
        description: 'ទីប្រឹក្សាការងារ',
        url: 'https://bongsrey.com/',
        logo: require('../../assets/images/career_center/bongsrey_logo.png'),
        screen: 'BongSreyCareerScreen',
        screen_title: 'បងស្រី ទីប្រឹក្សាការងារ',
        firebase_event_name: keyword.BONG_SREY
      },
    ]

    return (
      <CustomFlatListComponent
        ref={this.listRef}
        data={ career_centers }
        renderItem={ ({item}) => <CareerWebsiteItem career={item} /> }
        keyExtractor={(item, index) => index.toString()}
        // hasInternet={this.state.isInternetReachable}
        hasInternet={false}
        refreshingAction={() => this._onRefresh()}
        customContentContainerStyle={{flexGrow: 1, paddingTop: scrollableHeaderUtil.getContentMarginTop() + 20, paddingBottom: 16}}
        refreshControllOffset={scrollableHeaderUtil.getContentMarginTop()}
      />
    )
  }

  render() {
    return(
      <ScrollableHeader
        renderContent={ this.renderContent }
        title={'មជ្ឈមណ្ឌលការងារ'}
        largeTitle={'មជ្ឈមណ្ឌលការងារ'}
        useCustomScrollContent={true}
      />
    )
  }
}