import React, {Component} from 'react';
import {
  View,
  WebView
} from 'react-native';

import LoadingIndicator from '../../components/loading_indicator';

export default class WebviewScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: true }
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <WebView
          ref="webviewRef"
          style={{flex: 1}}
          source={{ uri: this.props.navigation.getParam('url', 'http://nea.gov.kh/kh/') }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onLoadEnd={ () => this.setState({loading: false}) }
        />

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
