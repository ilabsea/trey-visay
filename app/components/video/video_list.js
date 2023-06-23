import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Platform
} from 'react-native';
import { Thumbnail } from 'react-native-thumbnail-video';
import {Divider} from 'react-native-paper';
import { FontSetting } from "../../assets/style_sheets/font_setting";
import mainStyles from "../../assets/style_sheets/main/main";
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import YoutubePopupPlayer from 'react-native-youtube-popup-player';
import {arrowRightIconSize} from '../../constants/component_constant'
import {getStyleOfDevice} from '../../utils/responsive_util'
import videoUtil from '../../utils/video_util'
import color from '../../themes/color'

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
          imageHeight={getStyleOfDevice(120, 100)}
          iconStyle={{width: '20%', height: '30%', resizeMode: 'contain'}}
          onPress={() => setModalVisible(true)}
        />
        <View style={styles.textContainer}>
          <Text style={[mainStyles.title, styles.title]}>{ props.item.name || props.item.title }</Text>
          <Text style={styles.source}>{ props.item.author }</Text>
        </View>

        { Platform.OS == 'ios' &&
          <View style={{alignSelf: 'center'}}>
            <AwesomeIcon name='angle-right' size={arrowRightIconSize} color='#bbb'/>
          </View>
        }
      </TouchableOpacity>
      <Divider style={{marginVertical: 0.5}}/>

      <YoutubePopupPlayer
        videoUrl={ props.item.url }
        modalVisible={ modalVisible }
        hasInternet={props.isInternetReachable}
        closeModal={() => setModalVisible(false)}
        iframeHeight={videoUtil.getIframeHeight()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center'
  },
  textContainer: {
    flex: 1,
    marginLeft: 8,
    marginRight: 16
  },
  title: {
    color: color.blackColor,
  },
  source: {
    fontSize: FontSetting.sub_title,
    color: color.grayColor,
  },
});
