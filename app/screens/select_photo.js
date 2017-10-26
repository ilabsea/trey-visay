import React, {Component} from 'react';
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  CameraRoll,
  StyleSheet,
  Dimensions,
  TouchableHighlight,
  Image,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
} from 'react-native-material-ui';

// Utils
import realm from '../schema';
import User from '../utils/user';

const { width } = Dimensions.get('window')
const widthItemPerRow = width/3-1;

export default class SelectPhoto extends Component {
  static navigationOptions = ({ navigation }) => {
    const {goBack} = navigation;
    return {
      title: 'Select Photo',
      headerRight:
        <TouchableOpacity onPress={() => goBack()}>
          <Text>Cancel</Text>
        </TouchableOpacity>
    }
  };

  state = {
    photos: [],
    index: null,
    userId: '',
  }

  componentWillMount() {
    this.setState({userId: User.getID()});
    this.getPhotos();
  }

  getPhotos = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'All'
    })
    .then(r => {
      this.setState({ photos: r.edges });
    })
  }

  setSelected = (index) => {
    if (index == this.state.index) {
      index = null
    }

    this.setState({ index })
    this._handleSubmit(index);
  }

  _handleSubmit(index) {
    try {
      realm.write(() => {
        realm.create('User', this._buildData(index), true);
        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack();
      });
    } catch (e) {
      alert(e);
    }
  }

  // The type can be 'photo' or 'cover'
  _buildData(index) {
    let obj = { uuid: this.state.userId };
    obj[this.props.navigation.state.params.type] = this.state.photos[index].node.image.uri;

    return obj;
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableHighlight
          style={[{ width: widthItemPerRow, height: widthItemPerRow }, styles.thumb]}>
          <Text>Camera</Text>
        </TouchableHighlight>

        {
          this.state.photos.map((p, i) => {
            return (
              <TouchableHighlight
                style={[{opacity: i === this.state.index ? 0.5 : 1}, styles.thumb]}
                key={i}
                underlayColor='transparent'
                onPress={() => this.setSelected(i)}>
                <Image
                  style={{
                    width: widthItemPerRow,
                    height: widthItemPerRow
                  }}
                  source={{uri: p.node.image.uri}}
                />
              </TouchableHighlight>
            )
          })
        }
      </ScrollView>
    )
  }
}

styles = StyleSheet.create({
  scrollView: {
    flexWrap: 'wrap',
    flexDirection: 'row',
  },
  thumb: {
    marginBottom: 1,
    marginRight: 1
  }
});
