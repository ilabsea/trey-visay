import React from "react";
import { StyleSheet } from "react-native";

import Text from "../Text";
import {FontSetting} from '../../assets/style_sheets/font_setting';

function ErrorMessage({ error, visible, style }) {
  if (!visible || !error) return null;

  return <Text style={[styles.error, style]}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: 'rgb(221,44,0)',
    fontSize: FontSetting.small_text
  },
});

export default ErrorMessage;
