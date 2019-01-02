import React from 'react';
import { Platform } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class KeyboardSpecificScrollView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { children } = this.props;
    if ( Platform.OS == 'ios' ) {
      return(<KeyboardAwareScrollView
              resetScrollToCoords={{ x: 0, y: 0 }}
              contentContainerStyle={{flex: 1}}
              scrollEnabled={false}>
              {children}
            </KeyboardAwareScrollView>)
    }
    return ({children})

  }
}

export default KeyboardSpecificScrollView;
