import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Platform,
} from 'react-native';
import { Button } from 'native-base';
import DeviceInfo from 'react-native-device-info';
import Text from '../Text';
import BoldLabelComponent from '../shared/BoldLabelComponent';
import { Colors } from '../../assets/style_sheets/main/colors';
import { FontSetting } from '../../assets/style_sheets/font_setting';
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';
import {pressableItemSize} from '../../constants/component_constant';
import {getStyleOfDevice, getStyleOfOS} from '../../utils/responsive_util';

class FilterButton extends React.Component {
  render() {
    const imageSize = getStyleOfDevice(getStyleOfOS(22, 18), 18) // ipad 22dp
    return (
      <Button
        style={styles.btn}
        rounded
        primary block
        // onPress={ () =>
        //   this.props.navigation.navigate('FilterScreen', {
        //     kind: this.props.kind,
        //     refreshValue: this.props.refreshValue
        //   })
        // }
        onPress={ () =>
          this.props.navigation.navigate('SchoolFilterScreen', {
            kind: this.props.kind,
            refreshValue: this.props.refreshValue
          })
        }
      >

        <Image
          source={require('../../assets/icons/school/filter.png')}
          style={{width: imageSize, height: imageSize}} />

        <Text style={styles.findText}>ស្វែងរក</Text>

        {!!this.props.number &&
          <View style={[scrollHeaderStyles.numberWrapper, {marginRight: 12, marginLeft: 20}]}>
            <View style={scrollHeaderStyles.numberIcon}>
              <BoldLabelComponent label={this.props.number} style={{fontSize: 16, marginTop: getStyleOfOS(0, 2), color: Colors.blue}} />
            </View>
          </View>
        }

      </Button>
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
    padding: 16,
    backgroundColor: Colors.blue,
    height: pressableItemSize,
    marginBottom: Platform.OS === 'ios' ? getStyleOfDevice(14, DeviceInfo.hasNotch() ? 14 : 0) : 0
  },
  findText: {
    fontSize: FontSetting.text,
    marginLeft: 10,
    color: '#fff',
    // marginTop: getStyleOfOS(getStyleOfDevice(0, 2), -3)
  }
})

export default FilterButton;
