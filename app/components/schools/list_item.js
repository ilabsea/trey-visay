import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import { Divider } from 'react-native-elements';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import mainStyles from '../../assets/style_sheets/main/main';

class ListItem extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let contactParams = this.props.contact;
    let iconSize = contactParams.iconSize || 18;
    let data = contactParams.data;

    if (Array.isArray(data)) {
      data = data.join('; ');
    }
    return (
      <View>
        { !!data && !!data.length &&
          <View>
            <View style={styles.container}>
              <View style={styles.iconWrapper}>
                { contactParams.icon != 'markunread-mailbox' &&
                  <AwesomeIcon name={contactParams.icon} color='#8E8E93' size={iconSize} />
                }
                { contactParams.icon == 'markunread-mailbox' &&
                  <MaterialIcon name={contactParams.icon} color='#8E8E93' size={iconSize} />
                }
              </View>
              { !!contactParams.isLink && data!='មិនមាន' &&
                <Text
                  onPress={()=> Linking.openURL('mailto:' + data)}
                  style={mainStyles.link}>
                  {data}
                </Text>
              }
              { (!contactParams.isLink || data=='មិនមាន') &&
                <Text
                  style={mainStyles.text}>
                  {data}
                </Text>
              }
            </View>
            <Divider style={{marginLeft: 30}} />
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 6,
    marginRight: 30
  },
  iconWrapper: {
    width: 24,
    marginTop: 2,
    marginRight: 3
  }
});

export default ListItem;
