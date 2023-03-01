import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Platform,
  TouchableOpacity,
} from 'react-native';

import NetInfo from "@react-native-community/netinfo";
import Toast, { DURATION } from 'react-native-easy-toast';

import { ThemeContext, getTheme, Toolbar } from 'react-native-material-ui';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import BackButton from '../../components/shared/back_button';
import ScrollableHeader from '../../components/scrollable_header';
import VideoListView from '../../components/video/video_list';
import LoadingIndicator from '../../components/loading_indicator';

import videoList from '../../data/json/videos';
import scrollHeaderStyle from '../../assets/style_sheets/scroll_header';
import { Item, Input, Icon, Header } from 'native-base';
import Text from '../../components/Text';
import { Button } from 'react-native-paper';
import { Colors } from '../../assets/style_sheets/main/colors';

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

  _renderForeground = () => {
    return (
      <View>
        <Text style={[scrollHeaderStyle.largeTitle, {marginBottom: -8}]}>វីដេអូមុខរបរ</Text>
        <View style={[styles.searchBarHeader, {flexDirection: 'row'}]}>
          <Icon name="ios-search" />
          <Input
            onChangeText={(text) => this._onChangeText(text)}
            autoCorrect={false}
            value={this.state.textSearch}
            placeholder='ស្វែងរក'/>
          { !!this.state.textSearch &&
            <TouchableOpacity style={{height: '100%'}} onPress={() => this._onSearchClosed()}>
              <Icon active name='close-circle' style={{paddingTop: 2, color: 'rgba(0,0,0,0.7)'}} />
            </TouchableOpacity>
          }
        </View>
      </View>
    )
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
        <ScrollableHeader
          renderContent={ this._renderMainContent }
          renderNavigation={ () => <BackButton navigation={this.props.navigation}/> }
          title={'វីដេអូមុខរបរ'}
          renderForeground={ this._renderForeground }
          headerMaxHeight={160}
        />

        <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
      </View>
    )
  };
}

const styles = StyleSheet.create({
  searchBarHeader: {
    paddingRight: 0,
    paddingLeft: 0,
    paddingTop: 0,
    marginTop: 0,
    height: 30,
    backgroundColor: 'transparent',
    borderBottomWidth: 0
  }
})
