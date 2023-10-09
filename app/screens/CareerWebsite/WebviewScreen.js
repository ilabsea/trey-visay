import React, {Component} from 'react';
import { View, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import DeviceInfo from 'react-native-device-info';
import NetInfo from '@react-native-community/netinfo';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import LoadingIndicator from '../../components/loading_indicator';
import CustomNavigationHeader from '../../components/shared/CustomNavigationHeader'
import Text from '../../components/Text';
import color from '../../themes/color';
import {FontSetting} from '../../assets/style_sheets/font_setting';

export default class WebviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      hasInternet: false,
    }
  }

  componentDidMount() {
    this.netInfoUnsubscribe = NetInfo.addEventListener(state => {
      this.setState({hasInternet: state.isConnected && state.isInternetReachable})
    });
  }

  componentWillUnmount() {
    !!this.netInfoUnsubscribe && this.netInfoUnsubscribe();
  }

  renderWebview() {
    return <WebView
              ref="webviewRef"
              style={{flex: 1}}
              source={{ uri: this.props.route.params.url || 'http://nea.gov.kh/index.do' }}
              javaScriptEnabled={true}
              domStorageEnabled={true}
              onLoadEnd={ () => this.setState({loading: false}) }
            />
  }

  renderNoConnectionMessage() {
    return <View style={{flex: 1, backgroundColor: 'white', zIndex: 2, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="wifi-off" size={60} color={color.gray} />
              <Text style={{color: color.gray, fontSize: FontSetting.title}}>មិនមានប្រព័ន្ធអ៊ីនធឺណិត</Text>
           </View>
  }

  render() {
    return(
      <View style={{flex: 1, paddingBottom: (Platform.OS == 'ios' && DeviceInfo.hasNotch()) ? 22 : 0, backgroundColor: 'white'}}>
        <CustomNavigationHeader title={this.props.route.params.title} headerStyle={{zIndex: 2}} />
        { this.state.hasInternet ? this.renderWebview() : this.renderNoConnectionMessage() }

        {
          this.state.loading &&
          <View style={{position: 'absolute', zIndex: 1, left: 0, right: 0, bottom: 0, top: 0}}>
            <LoadingIndicator loading={true}/>
          </View>
        }
      </View>
    )
  }
}
