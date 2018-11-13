import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Dimensions,
  NetInfo,
  Linking,
  ActivityIndicator,
  ListView,
  RefreshControl,
} from 'react-native';

import Toast, { DURATION } from 'react-native-easy-toast';

import Toolbar from 'react-native-material-ui';

import API from '../api/videos';
import LoadingIndicator from '../components/loading_indicator';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Thumbnail from 'react-native-thumbnail-video';
import headerStyles from '../assets/style_sheets/header';
import StatusBar from '../components/status_bar';

// https://github.com/CodeLinkIO/ReactNative-Endless-Scrolling
export default class VideoScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'វីដេអូមុខរបរ',
    drawerIcon: ({ tintColor }) => (
      <AwesomeIcon name='play-circle-o' size={20} color={tintColor} />
    ),
  };

  constructor(props) {
    super(props)

    this.state = {
      pagination: {},
      videos: [],
      ds: new ListView.DataSource({ rowHasChanged: this._rowHasChanged })
    }
  }

  componentWillMount() {
    this._handleInternetConnection();
  }

  _handleInternetConnection() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this._getVideos(1);
      this.setState({isConnected: isConnected, isOnline: isConnected, isLoaded: true, showLoading: false});
    });

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      this._handleFirstConnectivityChange
    );
  }

  _handleFirstConnectivityChange = (isConnected) => {
    if (this.refs.myRef) {
      this.setState({isOnline: isConnected});
    }
  }

  _getVideosRequest() {
    const pagination = { ...this.state.pagination, loading: true }
    this._update(pagination, this.state.videos)
  }

  _getVideosSuccess(result) {
    const pagination = { ...result.pagination, loading: false }
    const videos = pagination.page === 1 ? result.records : [ ...this.state.videos, ...result.records ]

    this._update(pagination, videos)
  }

  _getVideosFailure(error) {
    const pagination = { ...this.state.pagination, loading: false }
    this._update(pagination, this.state.videos)
    console.error(error)
  }

  _getVideos(page) {
    this._getVideosRequest()

    API
      .getVideos(page)
      .then(result => this._getVideosSuccess(result))
      .catch(error => this._getVideosFailure(error))
  }

  _rowHasChanged(r1, r2) {
    return r1 !== r2
  }

  _update(pagination, videos) {
    const loading = {
      type: 'Loading',
      loading: pagination.loading
    }
    this.setState({
      pagination: pagination,
      videos: videos,
      ds: this.state.ds.cloneWithRows([ ...videos, loading ])
    })
  }

  _renderRow(row) {
    if (row.type === 'Loading') {
      return <LoadingIndicator loading={ row.loading } />
    }

    let { width } = Dimensions.get('window');
    let imageWidth = width/2-24;

    return (
      <View style={styles.row}>
        <Thumbnail
          url={row.url}
          imageWidth={imageWidth}
          onPress={ () => this._onOpenUrl(row.url) }
        />
        <Text style={ [styles.title, {flex: 1}] }>{ row.title }</Text>
      </View>
    )
  }

  _onOpenUrl(url) {
    if (this.state.isOnline) {
      Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
          return;
        }

        return Linking.openURL(url);
      }).catch(()=>{});

      return;
    }

    this.refs.toast.show('Not available while offline!', DURATION.SHORT);

  }

  _onRefresh() {
    this._getVideos(1)
  }

  _onEndReached() {
    const { pagination } = this.state
    const { page, perPage, pageCount, totalCount } = pagination
    const lastPage = totalCount <= (page - 1) * perPage + pageCount

    if (!pagination.loading && !lastPage) {
      this._getVideos(page + 1)
    }
  }

  _renderContent() {
    return (
      <ListView
        style={ styles.container }
        enableEmptySections={ true }
        automaticallyAdjustContentInsets={ false }
        dataSource={ this.state.ds }
        renderRow={ row => this._renderRow(row) }
        refreshControl={
          <RefreshControl
            refreshing={ false }
            onRefresh={ () => this._onRefresh() }
          />
        }
        onEndReached={ () => this._onEndReached() }
      />

    )
  }

  _onChangeText(val) {
    if (!val) {
      this._onRefresh();
    }

    if (val.length > 1) {
      API
        .getVideosByName(val, 1)
        .then(result => this._getVideosSuccess(result))
        .catch(error => this._getVideosFailure(error))
    }
  }

  _onSearchClosed() {
    this._onRefresh();
  }

  _renderNoInternetConnection() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcon name='info-outline' color='#111' size={24} style={{marginRight: 8}} />
          <Text>មិនមានការតភ្ជាប់បណ្តាញទេឥឡូវនេះ។ សូមព្យាយាម​ម្តង​ទៀត​</Text>
        </View>

        { this.state.showLoading && <ActivityIndicator size="small" /> }

        <View style={{marginTop: 20}}>
          <Button title='ព្យាយាមម្តងទៀត' onPress={() => this._retryConnection()}/>
        </View>
      </View>
    )
  }

  _retryConnection() {
    this.setState({showLoading: true})
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({isConnected: isConnected, isOnline: isConnected, isLoaded: true, showLoading: false});
    });
  }

  render() {
    return(
      <View style={styles.container} ref="myRef">
        <StatusBar />
        <Toolbar
          leftElement="menu"
          centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>វីដេអូមុខរបរ</Text>}
          onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
            onChangeText: this._onChangeText.bind(this),
            onSearchClosed: this._onSearchClosed.bind(this)
          }}
        />

        { this.state.isLoaded && this.state.isConnected && this._renderContent() }
        { this.state.isLoaded && !this.state.isConnected && this._renderNoInternetConnection() }
        <Toast ref="toast"/>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 8,
  },
  scrollContainer: {
    padding: 16
  },
  row: {
    margin: 8,
    marginBottom: 0,
    flex: 1,
    flexDirection: 'row'
  },
  column: {
    margin: 8,
    flex: 1
  },
  title: {
    padding: 10,
    backgroundColor: '#fff'
  }
});
