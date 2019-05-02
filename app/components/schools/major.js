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

class Major extends Component {
  constructor(props){
    super(props);
  }

  render(){
    let departments = this.props.departments;
    return(
      <View>
        <Text style={mainStyles.sectionText}>ជំនាញ</Text>
        { departments.map((department, i) => {
          return (
            <View key={i} style={{flex:1, margin: 16, marginBottom: 6}}>
              <Text style={mainStyles.text}>{department.name}</Text>
              { department.majors.map((major, j) => {
                return (
                  <View style={styles.majorWrapper} key={j}>
                    <View style={styles.iconWrapper}>
                      <AwesomeIcon name='graduation-cap' color='#8E8E93' size={16} />
                    </View>
                    <Text style={[mainStyles.text, {marginLeft: 5}]}>{major}</Text>
                  </View>
                )
              })}
            </View>
          )
        }) }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  iconWrapper: {
    width: 24,
    marginTop: 2,
    marginRight: 3
  },
  majorWrapper: {
    flexDirection: 'row',
    paddingLeft: 16,
  }
});


export default Major;
