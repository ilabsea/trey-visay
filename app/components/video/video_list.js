import React, { Component, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Thumbnail } from 'react-native-thumbnail-video';
import { FontSetting } from "../../assets/style_sheets/font_setting";
import mainStyles from "../../assets/style_sheets/main/main";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import { Divider } from 'react-native-paper';
import RF from "react-native-responsive-fontsize";
import YoutubePopupPlayer from 'react-native-youtube-popup-player';

export default function VideoList (props) {
  const { width } = Dimensions.get('window');
  const imageWidth = width/2-58;
  const [modalVisible, setModalVisible] = useState(false);

  return(
    <View>
      <TouchableOpacity style={styles.row} onPress={() => setModalVisible(true) }>
        <Thumbnail
          url={props.item.url}
          imageWidth={imageWidth}
          imageHeight={100}
          iconStyle={{width: '20%', height: '30%'}}
        />
        <View style={styles.textContainer}>
          <Text style={mainStyles.title}>{ props.item.title }</Text>
          <Text style={styles.source}>{ props.item.author }</Text>
        </View>

        { Platform.OS == 'ios' &&
          <View style={{alignSelf: 'center'}}>
            <AwesomeIcon name='angle-right' size={24} color='#bbb'/>
          </View>
        }
      </TouchableOpacity>

      <Divider />

      <YoutubePopupPlayer
        videoUrl={ props.item.url }
        modalVisible={ modalVisible }
        hasInternet={props.isInternetReachable}
        playerPaddingTop='31%'
        closeModal={() => setModalVisible(false)}
      />
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
  source: {
    fontSize: FontSetting.sub_title,
    color: '#3A3A3A',
    lineHeight: 25
  },
});
