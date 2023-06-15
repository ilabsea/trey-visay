import React from 'react'
import {TouchableOpacity, View, TextInput, TouchableWithoutFeedback, Keyboard} from 'react-native'
import {Appbar} from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons';

import {BackButton} from '../..'
import {goBack} from '../../../hooks/RootNavigation'
import { FontSetting } from '../../../assets/style_sheets/font_setting'
import {getStyleOfOS, getStyleOfDevice} from '../../../utils/responsive_util'
import {FontFamily} from '../../../themes/font';
import color from '../../../themes/color'

const SearchableHeader = (props) => {
  const [searchVisible, setSearchVisible] = React.useState(false)
  const searchBox = () => {
    return <View style={{flex: 1, flexDirection: 'row', borderRadius: 12, marginLeft: 6, marginRight: 16, backgroundColor: color.paleGray, height: 40, marginVertical: getStyleOfOS(6, 4)}}>
              <TextInput
                autoCorrect={false} autoFocus={true} placeholder={props.placeholder}
                value={props.searchedText}
                onChangeText={(text) => props.setSearchedText(text)}
                placeholderTextColor={color.grayColor}
                style={{flex: 1, fontFamily: FontFamily.regular, fontSize: FontSetting.text, height: 40, paddingTop: 0, paddingBottom: 0, paddingLeft: 16}}
              />
              { !!props.searchedText &&
                <TouchableOpacity onPress={() => props.setSearchedText('')} style={{width: 48, height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                  <Icon name='close' size={24} style={{color: color.lightBlackColor, width: 24, paddingRight: 0}} />
                </TouchableOpacity>
              }
           </View>
  }

  const renderTitle = () => {
    return <React.Fragment>
              <Appbar.Content title={props.title} titleStyle={{fontSize: FontSetting.nav_title, fontFamily: FontFamily.regular, color: 'black'}} />
              <Appbar.Action icon="magnify" onPress={() => setSearchVisible(true)} color="black" size={getStyleOfOS(getStyleOfDevice(28, 26), 24)} />
           </React.Fragment>
  }

  const handlePressBack = () => {
    if (searchVisible) {
      !!props.setSearchedText && props.setSearchedText('')
      setSearchVisible(false)
      return
    }

    !!props.onPressBack ? props.onPressBack() : goBack()
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Appbar.Header style={[{backgroundColor: 'white', elevation: 1}, props.containerStyle]}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <BackButton onPress={() => handlePressBack()} />
          {searchVisible ? searchBox() : renderTitle()}
        </View>
        {props.children}
      </Appbar.Header>
    </TouchableWithoutFeedback>
  )
}

export default SearchableHeader