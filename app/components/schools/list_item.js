import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Linking
} from 'react-native';
import { Divider } from 'react-native-paper';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import mainStyles from '../../assets/style_sheets/main/main';
import { Colors } from '../../assets/style_sheets/main/colors';

class ListItem extends Component {
  constructor(props){
    super(props);
  }

  onPressLink() {
    let prefix = this.props.contact.isEmail ? 'mailto:' : 'http://';

    Linking.openURL(prefix + this.props.contact.data);
  }

  render(){
    let contactParams = this.props.contact;
    let iconSize = contactParams.iconSize || 28;
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
                  <AwesomeIcon name={contactParams.icon} color={Colors.blue} size={iconSize} />
                }
                { contactParams.icon == 'markunread-mailbox' &&
                  <MaterialIcon name={contactParams.icon} color={Colors.blue} size={iconSize} />
                }
              </View>
              { !!contactParams.isLink && data!='មិនមាន' &&
                <Text
                  onPress={ () => this.onPressLink() }
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
            <Divider style={{marginLeft: 50}} />
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    marginRight: 30
  },
  iconWrapper: {
    width: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16
  }
});

export default ListItem;
