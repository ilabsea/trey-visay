import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import {Appbar} from 'react-native-paper'
import { Input, Icon, Item } from 'native-base';

import {BackButton} from '../..'
import {goBack} from '../../../hooks/RootNavigation'
import { FontSetting } from '../../../assets/style_sheets/font_setting'
import {getStyleOfOS, getStyleOfDevice} from '../../../utils/responsive_util'
import {navHeaderPaddingTop} from '../../../constants/component_constant'
import {FontFamily} from '../../../themes/font';
import color from '../../../themes/color'

const SearchableHeader = (props) => {
  const [searchVisible, setSearchVisible] = React.useState(false)
  const searchBox = () => {
    return (
      <Item style={{flex: 1, borderRadius: 12, borderBottomWidth: 0, marginLeft: 6, marginRight: 16, backgroundColor: color.paleGray, height: 40}}>
        <Input autoCorrect={false} autoFocus={true} placeholder={props.placeholder}
          value={props.searchedText}
          onChangeText={(text) => props.setSearchedText(text)}
          placeholderTextColor={color.grayColor}
          style={{fontSize: FontSetting.nav_title, fontFamily: FontFamily.regular, paddingLeft: 12, marginTop: getStyleOfOS(-3, 2)}}
        />
        { !!props.searchedText &&
          <TouchableOpacity style={styles.iconContainer} onPress={() => props.setSearchedText('')}>
            <Icon active name='close' style={{color: color.lightBlackColor}} />
          </TouchableOpacity>
        }
      </Item>
    )
  }

  const renderTitle = () => {
    return <React.Fragment>
              <Appbar.Content title={props.title} titleStyle={{fontSize: FontSetting.nav_title, fontFamily: FontFamily.regular, color: 'black'}} />
              <Appbar.Action icon="magnify" onPress={() => setSearchVisible(true)} color="black" size={getStyleOfOS(getStyleOfDevice(28, 24), 24)} />
           </React.Fragment>
  }

  const handlePressBack = () => {
    if (searchVisible) {
      props.setSearchedText('')
      setSearchVisible(false)
      return
    }

    !!props.onPressBack ? props.onPressBack() : goBack()
  }

  return (
    <Appbar.Header style={[{backgroundColor: 'white', elevation: 1}, props.containerStyle]}>
      <BackButton onPress={() => handlePressBack()} />
      {searchVisible ? searchBox() : renderTitle()}
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    elevation: 1,
    flexDirection: 'column',
    height: 'auto',
    paddingBottom: 16,
    paddingTop: navHeaderPaddingTop
  },
  title: {
    color: 'black',
    fontSize: FontSetting.nav_title,
    marginTop: getStyleOfOS(0, -4),
    paddingHorizontal: 16,
  }
})

export default SearchableHeader