import React, {useState, useEffect} from 'react';
import { DatePickerModal, registerTranslation } from 'react-native-paper-dates'
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { useFormikContext } from "formik";
import Moment from 'moment';

import dateTimeHelper from '../../../utils/DateTime/date_time_helper';
import { Text } from '../../../components';
import FormErrorMessage from './FormErrorMessage';
import Color from '../../../themes/color';
import {inputBoxBorderRadius, inputBoxHeight} from '../../../constants/component_constant';
import {pickerLabels} from '../../../constants/datepicker_constant';
import {FontSetting} from '../../../assets/style_sheets/font_setting';

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
    <View style={{marginTop: 14, marginBottom: 8}}>
      <View>
        <View style={styles.labelContainer}>
          <Text style={{fontSize: FontSetting.sub_title, color: Color.lightBlackColor}}>{label}<Text style={{color: Color.requiredColor, fontSize: FontSetting.sub_title}}> *</Text></Text>
        </View>
        <TouchableOpacity style={styles.datePickerContainer} onPress={() => setOpen(true)}>
          <Text style={{flex: 1}}>{!!date && dateTimeHelper.getTranslatedDate(date)}</Text>
          <MaterialIcon name='date-range' size={32} style={{color: Color.grayColor, width: 30}} />
        </TouchableOpacity>

        <DatePickerModal
          locale="km"
          mode="single"
          visible={open}
          date={date}
          onDismiss={() => setOpen(false)}
          onConfirm={onConfirm}
          typeInDate={null}
          validRange={{endDate: new Date()}}
          startYear={1980}
          endYear={new Date().getFullYear()}
        />
      </View>
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

const styles = StyleSheet.create({
  labelContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    height: 32,
    paddingHorizontal: 5,
    position: 'absolute',
    left: 12,
    top: -16,
    zIndex: 1,
  },
  datePickerContainer: {
    alignItems: 'center',
    borderColor: Color.borderColor,
    borderWidth: 0.5,
    borderRadius: inputBoxBorderRadius,
    flex: 1,
    flexDirection: 'row',
    height: inputBoxHeight,
    paddingHorizontal: 12,
  }
})