import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  Linking,
  ActivityIndicator,
  FlatList,
  Platform,
  TouchableOpacity,
  StatusBar
} from 'react-native';

import NetInfo from "@react-native-community/netinfo";
import Toast, { DURATION } from 'react-native-easy-toast';

import { ThemeContext, getTheme, Toolbar } from 'react-native-material-ui';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import headerStyles from '../../assets/style_sheets/header';
import uiThemeAndroid from '../../assets/style_sheets/uiThemeAndroid.js';
import uiThemeIOS from '../../assets/style_sheets/uiThemeIOS.js';

import MyStatusBar from '../../components/shared/status_bar';
import BackButton from '../../components/shared/back_button';
import VideoListView from '../../components/video/video_list';
import LoadingIndicator from '../../components/loading_indicator';
import {FontSetting} from '../../assets/style_sheets/font_setting';
import videoList from '../../data/json/videos';

const uiTheme = Platform.select({
  ios: uiThemeIOS,
  android: {
    palette: {
      primaryColor: '#fff',
    },
    toolbar: {
      titleText: {
        color: '#111',
        fontFamily: 'Kantumruy',
        fontWeight: '300',
        fontSize: FontSetting.nav_title,
      },
      leftElement: {
        color: '#111'
      },
      rightElement: {
        color: '#111'
      }
    },
  }
});

export default class VideoScreen extends Component {
  _keyExtractor = (item, index) => index.toString();

  constructor(props) {
    super(props)

    this.state = {
      pagination: {},
      videos: videoList
    }
  }

  componentDidMount() {
    this._handleInternetConnection();
  }

  _handleInternetConnection() {
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({
        isConnected: isConnected,
        isOnline: isConnected,
        isLoaded: true,
        showLoading: false
      });
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

  _renderItem(item) {
    if (item.type === 'Loading') {
      return <LoadingIndicator loading={ item.loading } />
    }

    return (
      <VideoListView
        onPress={() => this._onOpenUrl(item.url)}
        item={item} />
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
        keyExtractor={this._keyExtractor}
        ListFooterComponent={<View style={{height: 20}}></View>}
      />
    )
  }

  _onChangeText(val) {
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
      <ThemeContext.Provider value={getTheme(uiTheme)}>
        <View style={{flex: 1}} ref="myRef">
          <MyStatusBar />
          <Toolbar
            leftElement={ 'arrow-back' }
            centerElement={'វីដេអូមុខរបរ'}
            searchable={{
              autoFocus: true,
              placeholder: 'ស្វែងរក',
              onChangeText: this._onChangeText.bind(this),
              onSearchClosed: this._onSearchClosed.bind(this)
            }}
            onLeftElementPress={() => this.props.navigation.goBack()}
          />

          { this.state.isLoaded && this.state.isConnected && this._renderContent() }
          { this.state.isLoaded && !this.state.isConnected && this._renderNoInternetConnection() }
          <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
        </View>
      </ThemeContext.Provider>
    );
  };
}
