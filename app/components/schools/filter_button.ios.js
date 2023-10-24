import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  TouchableOpacity
} from 'react-native';
import Text from '../Text';
import BoldLabelComponent from '../shared/BoldLabelComponent';
import { Colors } from '../../assets/style_sheets/main/colors';
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';
import {pressableItemSize} from '../../constants/component_constant';
import {getStyleOfDevice} from '../../utils/responsive_util';

class FilterButton extends React.Component {
  render() {
    const imageSize = getStyleOfDevice(22, 18) // ipad 22dp

    return (
      <TouchableOpacity style={styles.btn}
        onPress={ () => this.props.navigation.navigate('SchoolFilterScreen', { kind: this.props.kind }) }
      >
        <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
          <Image
            source={require('../../assets/icons/school/filter.png')}
            style={{width: imageSize, height: imageSize}} />

          <Text style={styles.findText}>ស្វែងរក</Text>

          {!!this.props.number &&
            <View style={[scrollHeaderStyles.numberWrapper, {marginRight: 12, marginLeft: 20}]}>
              <View style={scrollHeaderStyles.numberIcon}>
                <BoldLabelComponent label={this.props.number} style={{fontSize: 16, color: Colors.blue}} />
              </View>
            </View>
          }
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16,
    backgroundColor: Colors.blue,
    height: pressableItemSize,
    paddingHorizontal: 16,
    borderRadius: 26
  },
  findText: {
    marginLeft: 10,
    color: '#fff',
  }
})

export default FilterButton;
