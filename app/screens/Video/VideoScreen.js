import React, { Component } from 'react';
import { View, Platform } from 'react-native';

import NetInfo from "@react-native-community/netinfo";
import Toast from 'react-native-easy-toast';

import VideoListView from '../../components/video/video_list';
import VideoNoInternetMessage from '../../components/video/VideoNoInternetMessage';
import LoadingIndicator from '../../components/loading_indicator';
import SearchableHeader from '../../components/shared/searchableHeaders/SearchableHeader'
import CustomFlatListComponent from '../../components/shared/CustomFlatListComponent'

import color from '../../themes/color'
import Video from '../../models/Video';
import videoSyncService from '../../services/video_sync_service';
import {scrollViewPaddingBottom} from '../../constants/component_constant';

export default class VideoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {},
      videos: Video.getAll(),
      searchText: '',
      isInternetReachable: false
    }
    this.listRef = React.createRef()
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({
        isInternetReachable: state.isInternetReachable,
        isLoaded: true,
        showLoading: false
      });
    });
  }

  componentWillUnMount() {
    this.unsubscribe();
  }

  _renderItem(item) {
    if (item.type === 'Loading') {
      return <LoadingIndicator loading={ item.loading } />
    }

    return <VideoListView item={item} isInternetReachable={this.state.isInternetReachable} searchText={this.state.searchText} />
  }

  _onRefresh() {
    videoSyncService.syncData((videos) => {
      this.setState({videos: Video.findAllByName(this.state.searchText)})
      this.listRef.current?.stopRefreshLoading()
    });
  }

  _renderContent() {
    return (
      <CustomFlatListComponent
        ref={this.listRef}
        data={ this.state.videos }
        renderItem={ ({item}) => this._renderItem(item) }
        keyExtractor={(item, index) => item.uuid}
        hasInternet={this.state.isInternetReachable}
        refreshingAction={() => this._onRefresh()}
        customContentContainerStyle={{flexGrow: 1, paddingBottom: scrollViewPaddingBottom}}
      />
    )
  }

  _onChangeText(val) {
    this.setState({searchText: val});
    this.setState({videos: val.length > 1 ? Video.findAllByName(val) : Video.getAll()})
  }

  _onSearchClosed() {
    this.setState({searchText: ''});
    this._onRefresh();
  }

  _retryConnection() {
    this.setState({showLoading: true})
    NetInfo.fetch().then(state => {
      this.setState({isInternetReachable: state.isInternetReachable, isLoaded: true, showLoading: false});
    });
  }

  _renderMainContent = () => {
    if (!this.state.isLoaded) {
      return (null)
    }

    if (this.state.isInternetReachable) {
      return (this._renderContent());
    }

    return <VideoNoInternetMessage showLoading={this.state.showLoading} retryConnection={() => this._retryConnection()} />
  }

  render() {
    return (
      <View style={{flex: 1}} ref="myRef">
        <SearchableHeader title="វីដេអូមុខរបរ" placeholder="ស្វែងរកវីដេអូ" containerStyle={{borderBottomWidth: 1.5, borderColor: color.paleGray}}
          searchedText={this.state.searchText}
          setSearchedText={(text) => this._onChangeText(text)}
        />
        {this._renderMainContent()}
        <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </View>
    )
  };
}
