import React from 'react';
import { StyleSheet } from 'react-native';
import { Button, Text } from 'native-base';

class FilterButton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button
        style={styles.btn}
        rounded
        dark block
        onPress={ () => this.props.navigation.navigate('FilterScreen') }>
        <Text>Filter</Text>
      </Button>
    )
  }
}

const styles = StyleSheet.create({
  btn: {
    flex: 1,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 10,
    padding: 16
  }
})

export default FilterButton;
