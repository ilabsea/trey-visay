import React, {Component, useState, useEffect} from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {Text, Button, View, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import dateTimeHelper from '../../../utils/DateTime/date_time_helper';

export default function DatePicker(props) {
  const [date, setDate] = useState(new Date);
  const [displayDate, setDisplayDate] = useState(null);

  useEffect(() => {
    if (!!props.value) {
      setDisplayDate(props.value);
      setDate(new Date(props.value));
    }
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setDisplayDate(currentDate)

    !!props.onChange && props.onChange(currentDate);
  };

  const showMode = (currentMode) => {
    DateTimePickerAndroid.open({
      value: date,
      onChange,
      mode: currentMode,
      is24Hour: true,
    });
  };

  const showDatepicker = () => {
    showMode('date');
  };

  return (
    <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={showDatepicker}>
      <View style={{borderColor: '#ccc', borderWidth: 1, height: 40, flex: 1, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 12}}>
        <Text>{!!displayDate && dateTimeHelper.getTranslatedDate(displayDate)}</Text>
        <Text style={{color: '#ccc'}}>{!displayDate && "select date"}</Text>
      </View>

      <MaterialIcon name='date-range'  size={36} />
    </TouchableOpacity>
  );
};
