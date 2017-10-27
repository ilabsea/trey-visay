'use strict';

import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';

import {
  ThemeProvider,
  Icon,
  Avatar,
} from 'react-native-material-ui';

import { Dialog } from 'react-native-simple-dialogs';
import ImagePicker from 'react-native-image-crop-picker';

// Utils
import realm from '../schema';
import User from '../utils/user';
import styles from '../assets/style_sheets/profile_form';
import headerStyles from '../assets/style_sheets/header';

export default class EditProfilePhoto extends Component {
  static navigationOptions = ({ navigation }) => {
    const { goBack } = navigation;

    return {
      title: 'កែសម្រួល',
      headerTitle: <Text style={headerStyles.headerTitleStyle}>កែសម្រួល</Text>,
      headerStyle: headerStyles.headerStyle,
      headerLeft: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity onPress={() => goBack()} style={{marginLeft: 16}}>
                      <Icon name='close' color='#fff' size={24} />
                    </TouchableOpacity>
                  </ThemeProvider>,
      headerRight: <ThemeProvider uiTheme={{}}>
                    <TouchableOpacity style={headerStyles.actionWrapper} onPress={() => navigation.state.params.handleSubmit()}>
                      <Icon name="done" color='#fff' size={24} />
                      <Text style={headerStyles.saveText}>រក្សាទុក</Text>
                    </TouchableOpacity>
                   </ThemeProvider>,
    }
  };

  state = {user: '', type: ''};

  componentWillMount() {
    this.props.navigation.setParams({handleSubmit: this.handleSubmit.bind(this)});
    this.refreshState();
  }

  handleSubmit() {
    try {
      realm.write(() => {
        realm.create('User', this.state.user, true);
        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack();
      });
    } catch (e) {
      alert(e);
    }
  }

  openDialog(show) {
    this.setState({ showDialog: show });
  }

  refreshState() {
    let user = realm.objects('User').filtered('uuid="' + User.getID() + '"')[0];
    this.setState({user: user});
  }

  takePhoto() {
    this.openDialog(false);

    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true
    }).then(image => {
      this.handleSelectedPhoto(image);
    }).catch((e) => {})
  }

  selectPhoto() {
    this.openDialog(false);

    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true
    }).then(image => {
      this.handleSelectedPhoto(image);
    }).catch((e) => {});
  }

  handleSelectedPhoto(image) {
    let source = { uri: image.path };

    if (this.state.type == 'photo') {
      this.setState({ photo: source });
      this._setUserState('photo', image.path);
    } else {
      this.setState({ cover: source });
      this._setUserState('cover', image.path);
    }
  }

  _setUserState(field, value) {
    let user = {...this.state.user};
    user[field] = value;
    this.setState({...this.state, user: user});
  }

  deletePhoto() {
    if (this.state.type == 'photo') {
      this._setUserState('photo', '');
    } else {
      this._setUserState('cover', '');
    }

    this.openDialog(false);
  }

  handleOpenDialog(type) {
    this.setState({type: type});
    this.openDialog(true);
  }

  render() {
    let photo = require('../assets/images/default_profile.png');
    let cover = require('../assets/images/header_bg.jpg');

    if (!!this.state.user.photo) {
      photo = {uri: this.state.user.photo};
    }
    if (!!this.state.user.cover) {
      cover = {uri: this.state.user.cover};
    }

    return (
      <ThemeProvider uiTheme={{}}>
        <View style={{position: 'relative', flex: 1}}>
          <TouchableOpacity
            onPress={() => this.handleOpenDialog('cover')}
            style={{position: 'relative', backgroundColor:'pink'}}>
            <Image
              source={cover}
              style={{width: null, height: 300}}/>

            <Avatar icon='camera-alt' size={54} style={{container: {opacity: 0.7, position: 'absolute', top: -60, right: 10, zIndex: 10}}} />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.handleOpenDialog('photo')}
            style={{position: 'absolute', top: 220, left: 24}}>
            <Image
              source={photo}
              style={{borderRadius: 60, width: 120, height: 120 }}/>

            <Avatar icon='camera-alt' size={54} style={{container: {opacity: 0.7, position: 'absolute', top: -87, right: 30, zIndex: 10}}} />
          </TouchableOpacity>

          <Dialog
            visible={this.state.showDialog}
            onTouchOutside={() => this.openDialog(false)}
            contentStyle={{ alignItems: 'flex-start' }} >

            <TouchableOpacity
              onPress={this.takePhoto.bind(this)}
              style={{padding: 10, flexDirection: 'row'}}>
              <Text style={styles.listItem}>Take Picture</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.selectPhoto.bind(this)}
              style={{padding: 10, flexDirection: 'row'}}>
              <Text style={styles.listItem}>Select Picture</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={this.deletePhoto.bind(this)}
              style={{padding: 10, flexDirection: 'row'}}>

              <Text style={styles.listItem}>Delete</Text>
            </TouchableOpacity>
          </Dialog>
        </View>
      </ThemeProvider>
    )
  }
}
