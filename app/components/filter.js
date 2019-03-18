import React from 'react';
import { TouchableOpacity , Image} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import headerStyles from '../assets/style_sheets/header';

class Filter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let navigationState = this.props.screenProps.navigation.state;
    let index = navigationState.index;
    return <TouchableOpacity
            style={{marginRight: 16}}
            onPress={() => {
              this.props.screenProps.navigation.navigate(
                'FilterScreen' ,
                { refresh: navigationState.routes[index].params.refresh.bind(this),
                  category: navigationState.routes[index].params.category
                }
              )
            }
            }>
              <Image
                style={{width: 22, height: 22}}
                source={require('../assets/images/icons/filter.png')}/>
            </TouchableOpacity>;
  }
}

export default Filter;
