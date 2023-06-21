import React, { Component } from 'react';
import { Animated, View, Text, FlatList } from 'react-native';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';

// Utils
import mainStyles from '../../assets/style_sheets/main/main';
import StatusBar from '../../components/shared/status_bar';
import ButtonList from '../../components/list/button_list';
import CardItem from '../../components/list/card_item';
import CarouselItem from '../../components/shared/carousel_item';
import CustomFlatListComponent from '../../components/shared/CustomFlatListComponent';
import ScrollableHeader from '../../components/scrollable_header';
import CareersClusterObj from '../../utils/Vocational/CareerCluster';
import scrollableHeaderUtil from '../../utils/scrollable_header_util';

export default class CareerClusterScreen extends Component {
  careersClusters = [];
  _keyExtractor = (item, index) => index.toString();

  constructor(props){
    super(props);
    CareersClusterObj.setCareersClusters();
    this.careersClusters = CareersClusterObj.getCareersClusters();

    // console.log('Career cluster = ', this.careersClusters)

    this.state = {
      loading: false,
      size: 3,
      scrollY: new Animated.Value(0),
      hasInternet: false,
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

  renderItem(item, index){
    return(
      <CardItem item={item} text={item.name} index={index} width={'40%'} height={'18%'}
        onPress={() => this.props.navigation.navigate('CareerDetailScreen', {
          career: item
        })} />
    )
  }

  renderCareerCluster(cluster, i) {
    return (
      <View key={i} style={mainStyles.carouselBox}>
        <ButtonList hasLine={false} title={cluster.name_kh} boldFont={{fontWeight: 'bold'}}
          onPress={() => {
            this.props.navigation.navigate('CareerIndexScreen', {
              code: cluster.code,
              title: cluster.name_kh,
              careers: cluster.careers
            })
          }} />
        <CarouselItem
          data={cluster.careers}
          renderItem={({item, index}) => this.renderItem(item, index)}/>
      </View>
    )
  }

  handleLoadMore = () => {
    size = this.state.size + 3;
    this.setState({size: size})
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
            data={ this.careersClusters.slice(0, this.state.size) }
            renderItem={ ({item, i}) => this.renderCareerCluster(item, i) }
            hasInternet={this.state.hasInternet}
            keyExtractor={ this._keyExtractor }
            refreshingAction={() => this.onRefresh()}
            endReachedAction={this.handleLoadMore.bind(this)}
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
