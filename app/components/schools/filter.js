import React from 'react';
import { TouchableOpacity , Image} from 'react-native';
import API from '../../api/schools';

class Filter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let icon = require('../../assets/images/icons/filter.png');
    let navigationState = this.props.screenProps.navigation.state;
    let index = navigationState.index;
    let params = navigationState.routes[index].params
    if(params && params.hasFilter){
      icon = require('../../assets/images/icons/filter-blue.png');
    }
    return <TouchableOpacity
            style={{marginRight: 16}}
            onPress={() => {
              this.props.screenProps.navigation.navigate(
                'FilterScreen' ,
                { refresh: params.refresh.bind(this),
                  category: params.category
                }
              )
            }
            }>
              <Image
                style={{width: 22, height: 22}}
                source={icon}/>
            </TouchableOpacity>;
  }
}

export default Filter;
