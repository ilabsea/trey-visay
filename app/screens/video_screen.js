import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Dimensions,
  NetInfo,
  ToastAndroid,
  Linking,
  ActivityIndicator,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
} from 'react-native-material-ui';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Thumbnail from 'react-native-thumbnail-video';
import videoList from '../data/json/videos';
import headerStyles from '../assets/style_sheets/header';
import StatusBar from '../components/status_bar';

export default class VideoScreen extends Component {
  static navigationOptions = {
    drawerLabel: 'វីដេអូមុខរបរ',
    drawerIcon: ({ tintColor }) => (
      <AwesomeIcon name='play-circle-o' size={20} color={tintColor} />
    ),
  };

  componentWillMount() {
    let self = this;

    this.state = {
      videos: this._formatData(videoList)
    }

    this._handleInternetConnection();
  }

  _handleInternetConnection() {
    let self = this;

    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({isConnected: isConnected, isOnline: isConnected, isLoaded: true, showLoading: false});
    });

    function handleFirstConnectivityChange(isConnected) {
      // https://stackoverflow.com/questions/34544314/setstate-can-only-update-a-mounted-or-mounting-component-this-usually-mea

      if (self.refs.myRef) {
        self.setState({isOnline: isConnected});
      }
    }

    NetInfo.isConnected.addEventListener(
      'connectionChange',
      handleFirstConnectivityChange
    );
  }

  _checkConnection() {
    this.setState({showLoading: true})
    NetInfo.isConnected.fetch().then(isConnected => {
      this.setState({isConnected: isConnected, isOnline: isConnected, isLoaded: true, showLoading: false});
    });
  }

  _formatData(list) {
    let data = [];
    let myList = list.slice(0);

    while (myList.length > 0) {
      data.push(myList.splice(0, 2));
    }

    return data;
  }

  _onChangeText(val) {
    let list = videoList;

    if (!!val) {
      list = videoList.filter((video) => {
        return video.title.toLowerCase().indexOf(val.toLowerCase()) > -1
      })
    }

    this.setState({videos: this._formatData(list)})
  }

  _onSearchClosed() {
    this.setState({videos: this._formatData(videoList)});
  }

  _onOpenUrl(url) {
    if (this.state.isOnline) {
      Linking.canOpenURL(url).then((supported) => {
        if (!supported) {
          return;
        }

        return Linking.openURL(url);
      }).catch(onPressError);

      return;
    }

    ToastAndroid.show('Not available while offline!', ToastAndroid.SHORT);
  }

  _renderNoInternetConnection() {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
        <View style={{flexDirection: 'row'}}>
          <MaterialIcon name='info-outline' color='#111' size={24} style={{marginRight: 8}} />
          <Text>There's no network connection right now. Try again later</Text>
        </View>

        { this.state.showLoading && <ActivityIndicator size="small" /> }

        <View style={{marginTop: 20}}>
          <Button title='Retry' onPress={() => this._checkConnection()}/>
        </View>
      </View>
    )
  }

  _renderhaveInternetConnection() {
    let { width } = Dimensions.get('window');
    // let videos = this._formatData(videoList);
    let imageWidth = width/2-24;

    return (
      <ScrollView style={{flex: 1}}>
        { this.state.videos.map((row, i) => {
          return (
            <View style={styles.row} key={i}>
              { row.map((obj, j) => {
                return(
                  <View style={styles.column} key={j}>
                    <Thumbnail
                      url={obj.url}
                      imageWidth={imageWidth}
                      onPress={ () => this._onOpenUrl(obj.url) }
                    />
                    <Text numberOfLines={1} style={styles.title}>{obj.title}</Text>
                  </View>
                )
              })}
            </View>
          )
        })}
      </ScrollView>
    )
  }

  render() {
    return(
      <ThemeProvider uiTheme={{}}>
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

          { this.state.isLoaded && this.state.isConnected && this._renderhaveInternetConnection() }
          { this.state.isLoaded && !this.state.isConnected && this._renderNoInternetConnection() }
        </View>
      </ThemeProvider>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
    padding: 8,
    backgroundColor: '#fff'
  }
});
