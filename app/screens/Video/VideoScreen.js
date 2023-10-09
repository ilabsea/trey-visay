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
import { itemsPerPage } from '../../constants/sync_data_constant';

export default class VideoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {},
      videos: Video.getAll().slice(0, 20),
      searchText: '',
      isInternetReachable: false
    }
    this.listRef = React.createRef()
    this.isSyncingData = false;
    this.currentPage = 1;
    this.listIndex = 20;
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
    this.currentPage = 1;
    this.listIndex = 20;
    this._syncVideo(1);
  }
  
  _syncVideo(page) {
    videoSyncService.syncDataByPage(page, (videos, isError) => {
      if (isError)
        this.currentPage = Math.ceil(videos.length / itemsPerPage);

      this.setState({videos: videos.slice(0, this.listIndex)})
      this.listRef.current?.stopRefreshLoading()
      this.listRef.current?.stopPaginateLoading()
    });
  }

  _loadMore() {
    if (this.isSyncingData)
      return this.listRef.current?.stopPaginateLoading();

    this.isRequestingData = true;
    this.listIndex += 20
    this.currentPage++;
    this._syncVideo(this.currentPage);
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
        endReachedAction={() => this._loadMore()}
        customContentContainerStyle={{flexGrow: 1, paddingBottom: scrollViewPaddingBottom}}
        initialNumToRender={20}
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