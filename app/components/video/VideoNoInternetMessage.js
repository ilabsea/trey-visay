import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import Text from '../Text';
import { Button } from 'react-native-paper';
import { Colors } from '../../assets/style_sheets/main/colors';

const VideoNoInternetMessage = (props) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', padding: 20, marginTop: 20}}>
      <View style={{flexDirection: 'row'}}>
        <MaterialIcon name='info-outline' color='#111' size={24} style={{marginRight: 8, marginTop: 4}} />
        <View>
          <Text>មិនមានការតភ្ជាប់បណ្តាញទេឥឡូវនេះ។</Text>
          <Text>សូមព្យាយាមម្តងទៀត</Text>
        </View>
      </View>

      { props.showLoading && <ActivityIndicator size="small" /> }

      <View style={{marginTop: 20}}>
        <Button buttonColor={Colors.blue} mode="contained" onPress={() => props.retryConnection()}>
          ព្យាយាមម្តងទៀត
        </Button>
      </View>
    </View>
  )
}

export default VideoNoInternetMessage