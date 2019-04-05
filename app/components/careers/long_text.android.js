import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import ReadMore from 'react-native-read-more-text';

class LongText extends Component {
  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text style={{color: 'blue'}} onPress={handlePress}>
        អានបន្ថែម
      </Text>
    );
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text style={{color: 'blue'}} onPress={handlePress}>
        បង្ហាញខ្លី
      </Text>
    );
  }

  render(){
    return (
      <View style={styles.container}>
        <ReadMore
          numberOfLines={2}
          renderTruncatedFooter={this._renderTruncatedFooter}
          renderRevealedFooter={this._renderRevealedFooter}>
          <Text>
            {this.props.text}
          </Text>
        </ReadMore>
      </View>
    )
  }

}

const styles = {
  container: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    backgroundColor: '#fff'
  }
}

export default LongText;
