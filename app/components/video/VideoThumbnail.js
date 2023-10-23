import React from 'react';
import { ImageBackground } from 'react-native';
import youtubeUtil from '../../utils/youtube_util';

const VideoThumbnail = (props) => {
  const imageURL = `https://img.youtube.com/vi/${youtubeUtil.getVideoId(props.url)}/hqdefault.jpg`;
  return <ImageBackground
          source={{ uri: imageURL }}
          style={{ width: props.width, height: props.height }}
        />
}

export default VideoThumbnail;