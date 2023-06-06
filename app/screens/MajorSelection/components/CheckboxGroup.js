import React, {useEffect, useState, useRef} from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';

import { ErrorMessage } from '../../../components/forms';
import Color from '../../../themes/color';
import Checkbox from './Checkbox';

const {useImperativeHandle} = React

const CheckboxGroup = ({options, errorMessage, updateSelectedItem}, ref) => {
  const selectedValues = useRef([])
  const [paginateLoading, setPaginateLoading] = useState(false);
  const [renderOptions, setRenderOptions] = useState([])
  const listIndices = useRef({start: 0, end: 15})

  useEffect(() => {
    if (options.length > 0 && renderOptions.length == 0)
      setRenderOptions([...options.slice(0, 15)])
  }, [options])

  const getSelectedValues = () => {
    return selectedValues.current
  }

  useImperativeHandle(ref, () => ({
    getSelectedValues
  }))

  const onPress = (isChecked, value) => {
    if (isChecked)
      selectedValues.current.push(value)
    else {
      let index = selectedValues.current.indexOf(value);
      selectedValues.current.splice(index, 1)
    }
    !!updateSelectedItem && updateSelectedItem(selectedValues.current.length)
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

  return (
    <View style={{flexGrow: 1}}>
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
              checked={ selectedValues.current && selectedValues.current.indexOf(item.value) !== -1 }
              onEndReached={() => onEndReached()}
            />
          </View>
        )}
        ListFooterComponent={renderListFooter()}
      />
    </View>
  )
};

export default React.forwardRef(CheckboxGroup);
