import React from 'react';
import { TouchableOpacity } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { DrawerActions } from '@react-navigation/native';

class OpenDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <TouchableOpacity onPress={()=> {DrawerActions.openDrawer()} } style={{marginHorizontal: 16}}>
              <MaterialIcon name='menu' color='#fff' size={24} />
            </TouchableOpacity>;
  }
}

export default OpenDrawer;
