import React, {useState, useEffect} from 'react';
import { DatePickerModal, registerTranslation } from 'react-native-paper-dates'
import {View, TouchableOpacity} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useFormikContext } from "formik";
import Moment from 'moment';

import dateTimeHelper from '../../../utils/DateTime/date_time_helper';
import { Text, ErrorMessage } from '../../../components';
import Color from '../../../themes/color';
import {inputBoxBorderRadius, inputBoxHeight} from '../../../constants/component_constant';
import {pickerLabels} from '../../../constants/datepicker_constant';

export default function DatePicker({name, label}) {
  const { errors, touched, setFieldValue, values } = useFormikContext();
  const [date, setDate] = useState(null);
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!!values[name])
      setDate(new Date(values[name]));
  }, []);

  const onConfirm = (params) => {
    setOpen(false);
    setDate(params.date)
    setFieldValue(name, Moment(params.date).format('YYYY-MM-DD'));
  };

  registerTranslation('km', pickerLabels)

  return (
    <View>
      <View>
        <Text>{label}</Text>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={() => setOpen(true)}>
          <View style={{borderColor: Color.borderColor, borderWidth: 0.5, flex: 1, alignItems: 'center', flexDirection: 'row', paddingHorizontal: 12, borderRadius: inputBoxBorderRadius, height: inputBoxHeight}}>
            <Text style={{flex: 1}}>{!!date && dateTimeHelper.getTranslatedDate(date)}</Text>
            <MaterialIcon name='date-range' size={32} style={{color: Color.grayColor, width: 30}} />
          </View>
        </TouchableOpacity>
        <DatePickerModal
          locale="km"
          mode="single"
          visible={open}
          date={date}
          onDismiss={() => setOpen(false)}
          onConfirm={onConfirm}
          typeInDate={null}
        />
      </View>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};