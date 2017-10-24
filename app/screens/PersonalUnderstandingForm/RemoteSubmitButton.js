import React from 'react'
import { connect } from 'react-redux'
import { submit } from 'redux-form'
import {
  Button,
} from 'react-native';

const style = {
  padding: '10px 20px',
  width: 140,
  display: 'block',
  margin: '20px auto',
  fontSize: '16px'
}

const RemoteSubmitButton = ({ dispatch }) =>
  <Button title="RemoteSubmitButton" onPress={() => dispatch(submit('personalUnderstandingForm'))}></Button>


export default connect()(RemoteSubmitButton)
