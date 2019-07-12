import React from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
import { Field } from 'redux-form';
import CustomRadioGroup from '../CustomRadioGroup';
import Question from '../../data/json/personal_understanding.json';
import { Divider } from 'react-native-elements';

class FormRadio extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={[styles.formGroup, this.props.style]} pointerEvent={this.props.pointerEvents}>
        <Text style={[styles.labelGroup, this.props.textStyle]}>{ Question[this.props.questionKey] }</Text>
        <Divider />
        <Field
          name={this.props.questionKey}
          component={CustomRadioGroup}
          labelStyle={this.props.labelStyle}
          buttonColor={this.props.buttonColor}
          radio_props={
                        [
                          {label: 'បាទ/ចាស', value: 'Yes' },
                          {label: 'ទេ', value: 'No'},
                          {label: 'មិនដឹង', value: 'Don_Know'}
                        ]
                      }
        />

        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  formGroup: {
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 10
  },
  labelGroup: {
    marginBottom: 10,
  }
})

export default FormRadio;
