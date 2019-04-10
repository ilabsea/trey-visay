import React from 'react';
import {
  Text,
  View,
} from 'react-native';

import {
  Dialog,
  DialogDefaultActions,
} from 'react-native-material-ui';

export default class ResultDialog extends React.Component{

    render(){
      return(
        <View>
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
        </View>
      );
    }
}
