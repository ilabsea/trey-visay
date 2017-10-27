import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import {
  ThemeProvider,
  Dialog,
  DialogDefaultActions,
} from 'react-native-material-ui';

import PopupDialog from 'react-native-popup-dialog';

export default class ResultDialog extends React.Component{

    render(){
      return(
        <View>
          <ThemeProvider uiTheme={{}}>
          <Dialog>
            <Dialog.Title><Text>Hello world</Text></Dialog.Title>
            <Dialog.Content>
              <Text>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Text>
            </Dialog.Content>
            <Dialog.Actions>
              <DialogDefaultActions
                 actions={['Dismiss', 'Keep']}
                 onActionPress={() => {}}
              />
            </Dialog.Actions>
          </Dialog>
          </ThemeProvider>
        </View>
      );
    }
}
