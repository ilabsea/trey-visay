import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  TouchableOpacity,
  WebView
} from 'react-native';

import StatusBar from '../../components/shared/status_bar';
import LoadingIndicator from '../../components/loading_indicator';

export default class NeaCareerScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      careers: this.props.navigation.state.params.careers,
      loading: true
    }
  }

  render() {
    return(
      <View style={{flex: 1}}>
        <WebView
          ref="webviewRef"
          style={{flex: 1}}
          source={{ uri: 'http://nea.gov.kh/kh/' }}
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
