import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  FlatList,
  Platform,
} from 'react-native';

import NetInfo from "@react-native-community/netinfo";
import Toast, { DURATION } from 'react-native-easy-toast';

import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import VideoListView from '../../components/video/video_list';
import LoadingIndicator from '../../components/loading_indicator';
import SearchableHeader from '../../components/shared/searchableHeaders/SearchableHeader'

import videoList from '../../data/json/videos';
import Text from '../../components/Text';
import { Button } from 'react-native-paper';
import { Colors } from '../../assets/style_sheets/main/colors';
import color from '../../themes/color'

export default class VideoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pagination: {},
      videos: videoList,
      textSearch: ''
    }
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

    return (
      <VideoListView
        item={item}
        isInternetReachable={this.state.isInternetReachable} />
    )
  }

  _onRefresh() {
    this.setState({videos: videoList})
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
      <FlatList
        data={ this.state.videos }
        renderItem={ ({item}) => this._renderItem(item) }
        refreshing={false}
        onRefresh={ () => this._onRefresh() }
        keyExtractor={(item, index) => index.toString() }
      />
    )
  }

  _onChangeText(val) {
    this.setState({textSearch: val});

    if (!val) {
      this._onRefresh();
    }

    if (val.length > 1) {
      list = videoList.filter((video) => {
        return video.title.toLowerCase().indexOf(val.toLowerCase()) > -1
      })
      this.setState({videos: list})
    }
  }

  _onSearchClosed() {
    this.setState({textSearch: ''});
    this._onRefresh();
  }

  _renderNoInternetConnection() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20, marginTop: 20}}>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcon name='info-outline' color='#111' size={24} style={{marginRight: 8, marginTop: 4}} />
          <View>
            <Text>មិនមានការតភ្ជាប់បណ្តាញទេឥឡូវនេះ។</Text>
            <Text>សូមព្យាយាមម្តងទៀត</Text>
          </View>
        </View>

        { this.state.showLoading && <ActivityIndicator size="small" /> }

        <View style={{marginTop: 20}}>
          <Button buttonColor={Colors.blue} mode="contained" onPress={() => this._retryConnection()}>
            ព្យាយាមម្តងទៀត
          </Button>
        </View>
      </View>
    )
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

    return (this._renderNoInternetConnection());
  }

  render() {
    return (
      <View style={{flex: 1}} ref="myRef">
        <SearchableHeader title="វីដេអូមុខរបរ" placeholder="ស្វែងរកវីដេអូ" containerStyle={{borderBottomWidth: 1, borderColor: color.paleGray}}
          searchedText={this.state.textSearch}
          setSearchedText={(text) => this._onChangeText(text)}
        />
        {this._renderMainContent()}
        <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </View>
    )
  };
}