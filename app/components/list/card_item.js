import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import careersImages from '../../assets/images_js/careers_images';
import DownloadedImage from '../../models/DownloadedImage';

const CardItem = (props) => {
  let width = props.width ? props.width : '38%';
  let height = props.height ? props.height : '18%';
  const imagePath = DownloadedImage.getImagePath(props.image)
  const imageUrl = !!imagePath ? {uri: imagePath} : careersImages['default'];
  let imageRadius = props.borderRadiusOnlyOnTop ? { borderTopLeftRadius: 8, borderTopRightRadius: 8 }: { borderRadius: 8 };

  return(
    <TouchableOpacity
      style={[styles.btnBox, {width: wp(width), paddingBottom: 8, overflow: 'hidden'}]}
      onPress={props.onPress} key={props.key}>
      <Image
        resizeMode="cover"
        style={[styles.btnImage, {width: '100%', height: hp(height) }, imageRadius]}
        source={imageUrl}
      />

      <View style={styles.textContainer}>
        <Text numberOfLines={1}>{ props.text }</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  btnBox: {
    borderRadius:12,
    backgroundColor: 'white'
  },
  btnImage: {
    alignSelf: 'center'
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    paddingTop: 12
  }
});

export default CardItem;
