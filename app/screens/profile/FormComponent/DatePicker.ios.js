import React, {Component, useState, useEffect} from 'react';
// import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {Text, Button, View, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import dateTimeHelper from '../../../utils/DateTime/date_time_helper';
import DateTimePicker from '@react-native-community/datetimepicker'

export default function DatePicker(props) {
  const [date, setDate] = useState(new Date);
  const [displayDate, setDisplayDate] = useState(null);
  const [mode, setMode] = useState('date');

  useEffect(() => {
    if (!!props.value) {
      setDisplayDate(props.value);
      setDate(new Date(props.value));
    }
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);

    setDisplayDate(currentDate);

    !!props.onChange && props.onChange(currentDate);
  };

  return (
    <View style={{flexDirection: 'row'}}>

      <View style={{ flex: 1, borderWidth: 1, borderColor: '#ccc', alignItems: 'flex-start'}}>
        <DateTimePicker

          testID="dateTimePicker"
          value={date}
          mode={'date'}
          is24Hour={true}
          onChange={onChange}
        />
      </View>

      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <MaterialIcon name='date-range'  size={36} />
      </View>
    </View>
  );
};
