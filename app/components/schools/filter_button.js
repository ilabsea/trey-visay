import React from 'react';
import {
  StyleSheet,
  Image,
  View,
  Text
} from 'react-native';
import { Button } from 'native-base';
import { Colors } from '../../assets/style_sheets/main/colors';
import { FontSetting } from '../../assets/style_sheets/font_setting';
import scrollHeaderStyles from '../../assets/style_sheets/scroll_header';

class FilterButton extends React.Component {

  render() {
    return (
      <Button
        style={styles.btn}
        rounded
        primary block
        onPress={ () =>
          this.props.navigation.navigate('FilterScreen', {
            category: this.props.category,
            refreshValue: this.props.refreshValue
          })
        }>

        <Image
          source={require('../../assets/icons/school/filter.png')}
          style={{width: 18, height: 18}} />

        <Text style={styles.findText}>ស្វែងរក</Text>

        {!!this.props.number &&
          <View style={[scrollHeaderStyles.numberWrapper, {marginRight: 12, marginLeft: 20}]}>
            <View style={scrollHeaderStyles.numberIcon}>
              <Text style={[scrollHeaderStyles.iconText, {fontSize: 16}]}>{this.props.number}</Text>
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
    backgroundColor: Colors.blue
  },
  findText: {
    fontSize: FontSetting.text,
    marginLeft: 10,
    color: '#fff',
  }
})

export default FilterButton;
