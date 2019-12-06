'use strict';

import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import { Avatar } from 'react-native-material-ui';
import { Dialog } from 'react-native-simple-dialogs';
import ImagePicker from 'react-native-image-crop-picker';
import StatusBar from '../../components/shared/status_bar';

// Utils
import realm from '../../db/schema';
import User from '../../utils/user';
import Sidekiq from '../../utils/models/sidekiq';
import styles from '../../assets/style_sheets/profile_form';
import { Container, Content, Icon, Item, Form, Input } from 'native-base';
import FooterBar from '../../components/footer/FooterBar';

export default class EditProfilePhoto extends Component {

  constructor(props) {
    super(props);

    this.state = {
      user: User.getCurrent()
    }
  }

  componentDidMount() {
    this.user = this._buildData();
  }

  handleSubmit() {
    try {
      realm.write(() => {
        realm.create('User', this._buildData(), true);
        Sidekiq.create(this.state.user.uuid, 'User');
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
      fullName: this.state.user.fullName
    }
  }

  openDialog(show) {
    this.setState({ showDialog: show });
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

    this.setState({ photo: source });
    this._setUserState('photo', image.path);
  }

  _setUserState(field, value) {
    this.user[field] = value;
    this.setState({...this.state, user: this.user});
  }

  deletePhoto() {
    this._setUserState('photo', '');
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

  _renderProfile() {
    let photo = require('../../assets/images/default_profile.png');
    if (!!this.state.user.photo) {
      photo = {uri: this.state.user.photo};
    }

    return (
      <View style={{ alignItems: 'center', marginTop: 35, marginBottom: 35}}>
        <TouchableOpacity onPress={() => this.handleOpenDialog('photo')}>
          <View style={{width: 140, height: 140, position: 'relative', borderRadius: 70, overflow: 'hidden'}}>
            <Image
              source={photo}
              borderRadius={60}
              resizeMode="cover"
              style={{width: '100%', height: '100%' }}/>

            <View style={{position: 'absolute', bottom: 0, left: 0, width: '100%', height: 32, backgroundColor: 'rgba(24, 118, 211, 0.67)'}}/>
            <Avatar icon='camera-alt' size={54} style={{container: {backgroundColor: 'transparent', position: 'absolute', top: -44, left: '50%', marginLeft: -27, zIndex: 10}}} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  renderUserName() {
    return (
      <Form>
        <Item regular disabled>
          <Icon active name='md-person' />
          <Input
            disabled
            onChangeText={(text) => this._setUserState('fullName', text)}
            returnKeyType='next'
            autoCorrect={false}
            value={this.state.user.fullName}
            placeholderTextColor='rgba(0,0,0,0.7)'
            placeholder='ឈ្មោះពេញ'/>
        </Item>
      </Form>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar/>

        <Container>
          <Content padder>
            { this._renderProfile() }
            { this.renderUserName() }
            { this._renderDialog() }
          </Content>

          <FooterBar icon='keyboard-arrow-right' text='រក្សាទុក' onPress={() => this.handleSubmit()} />
        </Container>
      </View>
    )
  }
}
