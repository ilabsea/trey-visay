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

export default class SelectProfilePhoto extends Component {
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
        realm.create('User', {uuid: this.state.userId, photo: this.state.photos[index].node.image.uri}, true);
        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack();
      });
    } catch (e) {
      alert(e);
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.scrollView}>
        <TouchableHighlight
          style={[{ width: width/3-1, height: width/3-1 }, styles.thumb]}>
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
                    width: width/3-1,
                    height: width/3-1
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
