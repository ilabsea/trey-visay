import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withNavigation } from 'react-navigation';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

class OpenDrawer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <TouchableOpacity onPress={()=> {this.props.navigation.openDrawer()} } style={{marginHorizontal: 16}}>
              <MaterialIcon name='menu' color='#fff' size={24} />
            </TouchableOpacity>;
  }
}

export default withNavigation(OpenDrawer);
