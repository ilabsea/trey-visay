import React, {Component} from 'react';
import {
  Text,
  View,
  Platform
} from 'react-native';
import Toast, { DURATION } from 'react-native-easy-toast';

// Utils
import realm from '../../db/schema';
import User from '../../utils/user';
import Sidekiq from '../../utils/models/sidekiq';
import StatusBar from '../../components/shared/status_bar';

import { Container, Content, Icon, Item, Form, Input } from 'native-base';
import FooterBar from '../../components/footer/FooterBar';
import FormScreen from './Form';

let formError = {};

export default class EditPersonalInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: User.getCurrent(),
      errors: {}
    };
  }

  componentDidMount() {
    this.user = this._buildData();
  }

  checkRequire(field) {
    let value = this.state.user[field];
    if ( value == null || !value.length) {
      formError[field] = ["មិនអាចទទេបានទេ"];
    } else {
      delete formError[field];
    }
    this.setState({errors: formError})
  }

  isValidForm() {
    fields = [ 'fullName', 'dateOfBirth', 'provinceCode', 'districtCode', 'highSchoolCode'];
    for (var i = 0; i < fields.length; i++) {
      this.checkRequire(fields[i]);
    }

    return Object.keys(formError).length == 0;
  }

  handleSubmit() {
    if (!this.isValidForm()) {
      return this.refs.toast.show('សូមបំពេញព័ត៌មានខាងក្រោមជាមុនសិន...!', DURATION.SHORT);
    }

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
    let fields = ['uuid', 'fullName', 'sex', 'dateOfBirth', 'phoneNumber', 'highSchoolCode', 'provinceCode', 'districtCode', 'communeCode', 'grade'];
    let obj = {};

    for(i=0; i<fields.length; i++) {
      obj[fields[i]] = this.state.user[fields[i]];
    }

    obj.grade = obj.grade || '9'

    return obj;
  }

  _setUserState = (field, value) => {
    this.user[field] = value;
    this.setState({...this.state, user: this.user});
  }

  _renderContent = () => {
    return (
      <FormScreen
        errors={this.state.errors}
        user={this.state.user}
        _setUserState={this._setUserState}
      />
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />
        <Container>
          <Content style={{padding: 16}}>
            { this._renderContent() }
          </Content>

          <Toast ref='toast' positionValue={ Platform.OS == 'ios' ? 120 : 140 }/>
          <FooterBar icon='keyboard-arrow-right' text='រក្សាទុក' onPress={() => this.handleSubmit()} />
        </Container>
      </View>
    );
  }
}
