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
  Icon,
  Avatar,
} from 'react-native-material-ui';

import { Dialog } from 'react-native-simple-dialogs';
import ImagePicker from 'react-native-image-crop-picker';
import StatusBar from '../../components/status_bar';

// Utils
import realm from '../../schema';
import User from '../../utils/user';
import styles from '../../assets/style_sheets/profile_form';

export default class EditProfilePhoto extends Component {
  state = {user: '', type: ''};

  componentWillMount() {
    this.props.navigation.setParams({
      handleSubmit: this.handleSubmit.bind(this),
      _handleBack: this._handleBack.bind(this)
    });
    this.refreshState();
  }

  _handleBack(){
    this.props.navigation.goBack();
  }

  handleSubmit() {
    try {
      realm.write(() => {
        realm.create('User', this._buildData(), true);
        realm.create('Sidekiq', { paramUuid: this.state.user.uuid, tableName: 'User' }, true)
        this.props.navigation.state.params.refresh();
        this.props.navigation.goBack();
      });
    } catch (e) {
      alert(e);
    }
  }

  _buildData() {
    return {
      uuid: this.state.user.uuid,
      photo: this.state.user.photo,
      cover: this.state.user.cover
    }
  }

  openDialog(show) {
    this.setState({ showDialog: show });
  }

  refreshState() {
    let user = User.getCurrent();
    this.setState({user: user});
  }

  takePhoto() {
    ImagePicker.openCamera({
      width: 200,
      height: 200,
      cropping: true,
    }).then(image => {
      this.handleSelectedPhoto(image);
    }).catch((e) => {})
  }

  selectPhoto() {
    ImagePicker.openPicker({
      width: 200,
      height: 200,
      cropping: true,
    }).then(image => {
      this.handleSelectedPhoto(image);
    }).catch((e) => {});
  }

  handleSelectedPhoto(image) {
    let source = { uri: image.path };
    this.openDialog(false);

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

  _renderDialog() {
    return (
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
    )
  }

  _renderCover() {
    let cover = require('../../assets/images/header_bg.jpg');
    if (!!this.state.user.cover) {
      cover = {uri: this.state.user.cover};
    }

    return (
      <TouchableOpacity
        onPress={() => this.handleOpenDialog('cover')}
        style={{position: 'relative', backgroundColor:'pink'}}>
        <Image
          source={cover}
          style={{width: null, height: 300}}/>

        <Avatar icon='camera-alt' size={54} style={{container: {backgroundColor: 'rgba(0, 0, 0, 0.26)', position: 'absolute', top: -60, right: 10, zIndex: 10}}} />
      </TouchableOpacity>
    )
  }

  _renderProfile() {
    let photo = require('../../assets/images/default_profile.png');
    if (!!this.state.user.photo) {
      photo = {uri: this.state.user.photo};
    }

    return (
      <TouchableOpacity
        onPress={() => this.handleOpenDialog('photo')}
        style={{position: 'absolute', top: 220, left: 24}}>
        <Image
          source={photo}
          style={{borderRadius: 60, width: 120, height: 120 }}/>

        <Avatar icon='camera-alt' size={54} style={{container: {backgroundColor: 'rgba(0, 0, 0, 0.26)', position: 'absolute', top: -87, right: 30, zIndex: 10}}} />
      </TouchableOpacity>
    )
  }

  render() {
    return (
        <View style={{position: 'relative', flex: 1}}>
          <StatusBar />
          { this._renderCover() }
          { this._renderProfile() }
          { this._renderDialog() }
        </View>
    )
  }
}
