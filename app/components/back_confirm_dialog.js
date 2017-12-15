import React, {Component} from 'react';
import { ConfirmDialog } from 'react-native-simple-dialogs';

export default class BackConfirmDialog extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ConfirmDialog
        title="ការអះអាង"
        message="តើអ្នកចង់រក្សាទុកតេស្តរបស់អ្នកដែរឬទេ?"
        visible={this.props.visible}
        onTouchOutside={this.props.onTouchOutside}
        positiveButton={{
          title: "បាទ/ចាស",
          onPress: this.props.onPressYes
        }}
        negativeButton={{
          title: "ទេ",
          onPress: this.props.onPressNo
        }}
      />
    );
  }
}
