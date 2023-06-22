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

import JobCluster from '../../models/JobCluster'
import Job from '../../models/Job'

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
      <CardItem item={career} text={career.name} image={career.logo} index={index} width={'40%'} height={'18%'}
        onPress={() => this.props.navigation.navigate('CareerDetailScreen', {career_id: career.id})}
      />
    )
  }

  renderCareerCluster(cluster, i) {
    return (
      <View key={cluster.uuid} style={mainStyles.carouselBox}>
        <ButtonList hasLine={false} title={cluster.name}
          onPress={() => {
            this.props.navigation.navigate('CareerIndexScreen', {
              cluster_id: cluster.id,
              code: cluster.code,
              title: cluster.name,
            })
          }}
        />
        <CarouselItem data={Job.findAllByJobCluster(cluster.id)} renderItem={({item, index}) => this.renderItem(item, index)}/>
      </View>
    )
  }

  onRefresh() {
    // collegeMajorSyncService.syncAllData()
    // schoolSyncService.syncAllData(kinds[this.state.activePage], (schools) => {
    //   this.setState({schools: schools})
    //   this.listRef.current?.stopRefreshLoading()
    // }, () => {
    //   this.listRef.current?.stopRefreshLoading()
    // })

    console.log('on Refresh ==============')

    this.listRef.current?.stopRefreshLoading()
  }

  renderContent = () => {
    return <CustomFlatListComponent
            ref={this.listRef}
            data={ JobCluster.getAll() }
            renderItem={ ({item, i}) => this.renderCareerCluster(item, i) }
            hasInternet={this.state.hasInternet}
            keyExtractor={ this._keyExtractor }
            refreshingAction={() => this.onRefresh()}
            customContentContainerStyle={{flex: 1, paddingTop: scrollableHeaderUtil.getContentMarginTop() + 20}}
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
