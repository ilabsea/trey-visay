import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image
} from 'react-native';
import { Colors } from '../../assets/style_sheets/main/colors';
import Text from '../Text';

class SexOptions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSex: props.user.sex
    }
  }

  setValue(val){
    this.props.setUserState('sex', val);
    this.setState({currentSex: val});
  }

  isActive(item) {
    let activeStyle = { borderColor: Colors.blue };

    return this.state.currentSex == item ? activeStyle : {};
  }

  render() {
    let arr = [
      {value: 'ប្រុស', image: require('../../assets/images/account/male.png')},
      {value: 'ស្រី', image: require('../../assets/images/account/female.png')}
    ];

    let doms = arr.map((item, i) => {
      return (
        <TouchableOpacity key={i} onPress={() => this.setValue(item.value)} style={[styles.sexImageWrapper, this.isActive(item.value)]}>
          <Image
            source={item.image}
            style={styles.sexImage} />
        </TouchableOpacity>
      )
    })

    return (
      <View>
        <Text>ភេទ</Text>

        <View style={{flexDirection: 'row', width: '100%'}}>
          {doms}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sexImageWrapper: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'rgb(239, 239, 239)',
    backgroundColor: 'rgb(239, 239, 239)',
    marginRight: 20
  },
  sexImage: {
    width: 66,
    height: 73
  }
})

export default SexOptions;
