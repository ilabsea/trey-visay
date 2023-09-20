import React, {Component} from 'react';
import { Animated } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import ScrollableHeader from '../../components/scrollable_header';
import CareerWebsiteItem from './components/CareerWebsiteItem';
import CustomFlatListComponent from '../../components/shared/CustomFlatListComponent'

import scrollableHeaderUtil from '../../utils/scrollable_header_util';
import CareerWebsite from '../../models/CareerWebsite';
import careerWebsiteService from '../../services/career_website_service';

export default class CareerWebsiteHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      careerWebsites: CareerWebsite.getAll(),
      hasInternet: false,
      scrollY: new Animated.Value(0),
    }

    this.listRef = React.createRef();
    this.netInfoUnsubscribe = null;
  }

  componentDidMount() {
    this.netInfoUnsubscribe = NetInfo.addEventListener(state => {
      this.setState({hasInternet: state.isConnected && state.isInternetReachable})
    });
  }

  componentWillUnmount() {
    !!this.netInfoUnsubscribe && this.netInfoUnsubscribe();
  }

  onRefresh() {
    careerWebsiteService.syncAllData(() => this.listRef.current?.stopRefreshLoading())
  }

  renderContent = () => {
    return (
      <CustomFlatListComponent
        ref={this.listRef}
        data={ this.state.careerWebsites }
        renderItem={ ({item}) => <CareerWebsiteItem career={item} /> }
        keyExtractor={(item, index) => index.toString()}
        hasInternet={this.state.hasInternet}
        refreshingAction={() => this.onRefresh()}
        customContentContainerStyle={{flexGrow: 1, paddingTop: scrollableHeaderUtil.getContentMarginTop() + 20, paddingBottom: 16}}
        refreshControllOffset={scrollableHeaderUtil.getContentMarginTop()}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], { useNativeDriver: true })}
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
        scrollY={this.state.scrollY}
      />
    )
  }
}