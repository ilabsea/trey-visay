import React, {Component} from 'react';
import { Platform, StyleSheet } from 'react-native';
import { ConfirmDialog } from 'react-native-simple-dialogs';

export default class BackConfirmDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ConfirmDialog
        title="រក្សាទុកតេស្ត"
        message="តើអ្នកចង់រក្សាទុកតេស្តរបស់អ្នកដែរឬទេ?"
        visible={this.props.visible}
        onTouchOutside={this.props.onTouchOutside}
        positiveButton={{
          title: "បាទ/ចាស",
          onPress: this.props.onPressYes,
          titleStyle: styles.dialogButtonText
        }}
        negativeButton={{
          title: "ទេ",
          onPress: this.props.onPressNo,
          titleStyle: styles.negativeButtonText
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  dialogButtonText: {
    ...Platform.select({
      android: {
        lineHeight: 18
      }
    })
  },
  negativeButtonText: {
    ...Platform.select({
      android: {
        lineHeight: 18,
        color: 'rgb(208, 2, 27)'
      },
      ios: {
        color: 'rgb(208, 2, 27)'
      }
    })
  }
});
