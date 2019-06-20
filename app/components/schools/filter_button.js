import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { Button, Text } from 'native-base';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../assets/style_sheets/main/colors';
import { FontSetting } from '../../assets/style_sheets/font_setting';

class FilterButton extends React.Component {
  constructor(props) {
    super(props);
  }

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
      </Button>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 16,
    padding: 16,
    backgroundColor: Colors.blue
  },
  findText: {
    fontSize: FontSetting.text
  }
})

export default FilterButton;
