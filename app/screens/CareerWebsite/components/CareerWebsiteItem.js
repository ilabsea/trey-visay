import React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Divider } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

// import firebase from 'react-native-firebase';
import CustomImageComponent from '../../../components/shared/CustomImageComponent';
import { FontSetting } from "../../../assets/style_sheets/font_setting";
import mainStyles from "../../../assets/style_sheets/main/main";
import visitService from '../../../services/visit_service';

const CareerWebsiteItem = ({career}) => {
  const navigation = useNavigation();
  const imageWidth = (Dimensions.get('window').width/2) - 120;

  const viewWebsite = () => {
    // firebase.analytics().logEvent(career.firebase_event_name);
    visitService.recordVisitPage('career_website_detail', career.name, 'career_website')
    navigation.navigate('WebViewScreen', {url: career.url, title: career.name});
  }

  return (
    <View>
      <TouchableOpacity style={styles.row} onPress={() => viewWebsite()}>
        <View style={{width: imageWidth}}>
          <CustomImageComponent source={!!career.logo ? {uri: career.logo} : null} style={{width: imageWidth, height: imageWidth}} resizeMode='contain'
            emptyImageStyle={{width: imageWidth, height: imageWidth}}
          />
        </View>

        <View style={styles.textContainer}>
          <Text style={mainStyles.title}>{ career.name }</Text>
          <Text style={styles.description}>{ career.description }</Text>
        </View>

        <View style={{alignSelf: 'center'}}>
          <AwesomeIcon name='angle-right' size={24} color='#bbb'/>
        </View>
      </TouchableOpacity>
      <Divider />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 16
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
    marginRight: 16
  },
  title: {
    fontSize: FontSetting.title,
  },
  description: {
    fontSize: FontSetting.sub_title,
    color: '#3A3A3A',
    lineHeight: 25
  },
});

export default CareerWebsiteItem;