import React, { Component } from 'react';
import { Animated, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

// Utils
import mainStyles from '../../assets/style_sheets/main/main';
import ButtonList from '../../components/list/button_list';
import CardItem from '../../components/list/card_item';
import CarouselItem from '../../components/shared/carousel_item';
import CustomFlatListComponent from '../../components/shared/CustomFlatListComponent';
import ScrollableHeader from '../../components/scrollable_header';
import scrollableHeaderUtil from '../../utils/scrollable_header_util';
import {getStyleOfOS} from '../../utils/responsive_util';
import JobCluster from '../../models/JobCluster'
import Job from '../../models/Job'
import jobSyncService from '../../services/job_sync_service'
import jobClusterService from '../../services/job_cluster_service'
import {scrollViewPaddingBottom} from '../../constants/component_constant';

export default class CareerClusterScreen extends Component {
  careersClusters = [];
  _keyExtractor = (item, index) => index.toString();

  constructor(props){
    super(props);
    this.state = {
      scrollY: new Animated.Value(0),
      hasInternet: false,
      jobCluster: JobCluster.getAll()
    }
    this.listRef = React.createRef()
    this.netInfoUnsubscribe = null
  }

  componentDidMount() {
    this.netInfoUnsubscribe = NetInfo.addEventListener(state => {
      this.setState({hasInternet: state.isConnected && state.isInternetReachable})
    });
  }

  componentWillUnmount() {
    !!this.netInfoUnsubscribe && this.netInfoUnsubscribe();
  }

  renderItem(career, index){
    return(
      <CardItem item={career} text={career.name} image={career.logoSource} index={index} width={'40%'} height={'18%'}
        onPress={() => this.props.navigation.navigate('CareerDetailScreen', {career_id: career.id})}
      />
    )
  }

  renderCareerCluster(cluster, i) {
    return (
      <View key={cluster.uuid} style={mainStyles.carouselBox}>
        <ButtonList hasLine={false} title={`${cluster.display_order}. ${cluster.name}`}
          onPress={() => {
            this.props.navigation.navigate('CareerIndexScreen', {
              cluster_code: cluster.code,
              code: cluster.code,
              title: cluster.name,
            })
          }}
        />
        <CarouselItem data={Job.findAllByJobCluster(cluster.code)} renderItem={({item, index}) => this.renderItem(item, index)}/>
      </View>
    )
  }

  onRefresh() {
    jobClusterService.syncData(() => {
      jobSyncService.syncData(() => this.listRef.current?.stopRefreshLoading());
    });
  }

  renderContent = () => {
    return <CustomFlatListComponent
            ref={this.listRef}
            data={ JobCluster.getAll() }
            renderItem={ ({item, i}) => this.renderCareerCluster(item, i) }
            hasInternet={this.state.hasInternet}
            keyExtractor={ this._keyExtractor }
            refreshingAction={() => this.onRefresh()}
            customContentContainerStyle={{flexGrow: 1, paddingTop: scrollableHeaderUtil.getContentMarginTop() + 20, paddingBottom: getStyleOfOS(scrollViewPaddingBottom, 0)}}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], { useNativeDriver: true })}
            refreshControllOffset={scrollableHeaderUtil.getContentMarginTop()}
          />
  }

  render() {
    let title = 'ប្រភេទការងារ';
    return (
      <ScrollableHeader
        renderContent={ this.renderContent }
        title={title}
        largeTitle={title}
        buttonColor='black'
        useCustomScrollContent={true}
        scrollY={this.state.scrollY}
      />
    );
  }
}
