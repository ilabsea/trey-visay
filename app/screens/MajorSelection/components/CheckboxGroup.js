import React, {useEffect, useState, useRef} from 'react';
import { View, FlatList, ActivityIndicator, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { Divider } from 'react-native-paper';

import { Text } from '../../../components';
import { ErrorMessage } from '../../../components/forms';
import Color from '../../../themes/color';
import Checkbox from './Checkbox';

const {useImperativeHandle} = React

const CheckboxGroup = ({options, textSearch, errorMessage, type, headerLabel}, ref) => {
  const [selectedValues, setSelectedValues] = useState([]);
  const [paginateLoading, setPaginateLoading] = useState(false);
  const [renderOptions, setRenderOptions] = useState([])
  const listIndices = useRef({start: 0, end: 15})

  useEffect(() => {
    if (!!textSearch)
      setRenderOptions(options)
    else if (options.length > 0 && renderOptions.length == 0 || !textSearch)
      setRenderOptions([...options.slice(0, 15)])
  }, [options])

  const getSelectedValues = () => {
    return selectedValues;
  }

  const resetListIndices = () => {
    listIndices.current = {start: 0, end: 15}
  }

  useImperativeHandle(ref, () => ({
    getSelectedValues,
    resetListIndices,
  }))

  const onPress = (isChecked, value) => {
    if (isChecked)
      setSelectedValues([...selectedValues, value]);
    else {
      const index = selectedValues.indexOf(value);
      let newValues = selectedValues;
      newValues.splice(index, 1);
      setSelectedValues([...newValues]);
    }
  };

  const onEndReached = () => {
    if (listIndices.current.end >= options.length) return

    setPaginateLoading(true)
    const start = listIndices.current.end;
    const end = parseInt(listIndices.current.end) + 15
    listIndices.current = {start: start, end: end}
    setTimeout(() => {
      setRenderOptions(renderOptions.concat([...options.slice(start, end)]))
      setPaginateLoading(false)
    }, 200)
  }

  const renderListFooter = () => {
    if (!paginateLoading) return <View/>

    return <ActivityIndicator size={'large'} color={Color.primaryColor} style={{marginTop: 10}} />
  }

  const renderHeader = () => {
    return <React.Fragment>
              <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Text style={{padding: 16}}>{headerLabel} {selectedValues.length}/3</Text>
              </TouchableWithoutFeedback>
              <Divider />
           </React.Fragment>
  }

  return (
    <View style={{flexGrow: 1}}>
      {renderHeader()}
      <View style={{paddingHorizontal: 16}}>
        <ErrorMessage error={errorMessage} visible={errorMessage} />
      </View>

      <FlatList
        style={{marginBottom: 1, paddingHorizontal: 16, flexGrow: 1}}
        data={renderOptions}
        keyExtractor={(option) => option.value.toString()}
        onEndReached={() => onEndReached()}
        renderItem={({ item, index }) => (
          <View style={{minHeight: 56, borderBottomWidth: 0.5, justifyContent: 'center', borderColor: Color.gray}}>
            <Checkbox
              index={index}
              value={ item.value }
              label={ item.name }
              onPress={ onPress }
              checked={ selectedValues.length > 0 && selectedValues.indexOf(item.value) !== -1 }
              onEndReached={() => onEndReached()}
              type={type}
              disabled={selectedValues.length == 3}
            />
          </View>
        )}
        ListFooterComponent={renderListFooter()}
      />
    </View>
  )
};

export default React.forwardRef(CheckboxGroup);
