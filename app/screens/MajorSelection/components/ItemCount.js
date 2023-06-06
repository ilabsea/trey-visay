import React, { useEffect } from 'react';
import { View } from 'react-native';
import { Text } from "../../../components";
import { useFormikContext } from "formik";

const ItemCount = ({name}) => {
  const { values } = useFormikContext();

  return (
    <Text>{values[name].length}/3</Text>
  )
};

export default ItemCount;
