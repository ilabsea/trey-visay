import React, {Component, useState, useEffect} from 'react';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {Button, View, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import dateTimeHelper from '../../../utils/DateTime/date_time_helper';
import { Text, ErrorMessage } from '../../../components';
import { mediumFontSize } from '../../../utils/font_size_util';
import { useFormikContext } from "formik";
import Moment from 'moment';
import Color from '../../../themes/color';

export default function DatePicker({name, label}) {
  const { errors, touched, setFieldValue, values } = useFormikContext();
  const [date, setDate] = useState(new Date());
  const [displayDate, setDisplayDate] = useState(null);

  useEffect(() => {
    if (!!values[name]) {
      setDisplayDate(values[name]);
      setDate(new Date(values[name]));
    }
  }, []);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
    setDisplayDate(currentDate);

    setFieldValue(name, Moment(currentDate).format('YYYY-MM-DD'));
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
    <View>
      <View>
        <Text>{label}</Text>

        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={showDatepicker}>
          <View style={{borderColor: Color.borderColor, borderWidth: 0.5, height: 50, flex: 1, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 12}}>
            <Text style={{color: '#000'}}>{!!displayDate && dateTimeHelper.getTranslatedDate(displayDate)}</Text>
          </View>

          <MaterialIcon name='date-range'  size={36} />
        </TouchableOpacity>
      </View>

      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};
