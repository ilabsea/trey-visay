import React, {Component} from 'react';
import {
  NetInfo
} from 'react-native';

import characteristicList from '../data/json/characteristic_jobs';
import realm from '../schema';
import { environment } from '../config/environment';
import api from './../utils/api';

export default class UploadServices  {
  static count;

  static syncToServer(){
    NetInfo.isConnected.fetch().then(isConnected => {
      api.get('/me').then((res) => {
        if(res.data && res.data.success){
          this.count = 0;
          this.uploadData()
        }
      })
    });
  }

  static uploadData() {
    let data = realm.objects('Sidekiq');
    let sidekiqData = data.map((sidekiq) => ({
      paramUuid: sidekiq.paramUuid,
      tableName: sidekiq.tableName,
      attempt: sidekiq.attempt,
      version: sidekiq.version
    }));
    if ( this.count < sidekiqData.length ) {
      let sidekiq = sidekiqData[this.count];
      this.upload(sidekiq);
      return;
    }
  }

  static upload(sidekiq) {
    if(sidekiq.attempt < environment.syncAttempt){
      let data = realm.objects(sidekiq.tableName)
        .filtered('uuid="' + sidekiq.paramUuid + '"')[0];
      let postUrl = sidekiq.tableName == 'User' ? '/users' : "/games";
      data.version = sidekiq.version;
      api.post(postUrl, this['build' + sidekiq.tableName](data))
      .then((res) => {
        this.handleResponse(res, sidekiq);
      })
    } else{
      this.deleteSidekiq(sidekiq);
      this.count++;
      this.uploadData();
    }
  }

  static buildUser(user) {
    let attributes = this.renameAttributeKeys(user);

    this.ignoreAttributes(attributes, true);

    let data = new FormData();
    data.append('data', JSON.stringify(attributes));

    if (user.photo) {
      let uri = Platform.OS == 'ios' ? 'file://' + user.photo : user.photo;
      data.append('photo', {
        uri: uri,
        type: 'image/jpeg',
        name: 'userPhoto'
      });
    }

    return data;
  }

  static buildGame(game) {
    let attributes = this.renameAttributeKeys(game);
    attributes.subject_attributes = this.renameAttributeKeys(game.gameSubject);

    attributes.user_uuid = game.users[0].uuid
    attributes.characteristic_entries = game.characteristicEntries.map(obj => obj.value);
    attributes.personal_understandings_attributes = [];

    this.ignoreAttributes(attributes, false);

    let careerIds = game.personalityCareers.map((obj) => obj.value);
    attributes.career_games_attributes = careerIds.map((id) => {
      return {
        career_id: id,
        is_goal: (id == game.mostFavorableJobId)
      };
    })

    game.personalUnderstandings.map((pu) => {
      let obj = this.renameAttributeKeys(pu);
      delete obj.games;

      let myArr = [];
      let myObj = { 1: 'ឳពុកម្តាយ', 2: 'បងប្អូន', 3: 'ក្រុមប្រឹក្សាកុមារ', 4: 'នាយកសាលា', 5: 'គ្រូ', 6: 'មិត្តភក្តិ' };

      if (!!obj['ever_talked_with_anyone_about_career']) {
        obj['ever_talked_with_anyone_about_career'].map((o) => myArr.push(myObj[o.value]))
      }
      obj['ever_talked_with_anyone_about_career'] = myArr


      attributes.personal_understandings_attributes.push(obj);
    })

    // Form data
    let data = new FormData();

    data.append('data', JSON.stringify(attributes));

    if (game.voiceRecord) {
      data.append('audio', {
        uri: 'file://'+ game.voiceRecord,
        type: 'audio/aac',
        name: 'voiceRecord.aac'
      });
    }

    return data;
  }

  static handleResponse(res, sidekiq) {
    if (res.data.success) {
      this.deleteSidekiq(sidekiq);
    } else{
      this.count++;
      try {
        realm.write(() => {
          realm.create('Sidekiq', {
            paramUuid: sidekiq.paramUuid,
            attempt: sidekiq.attempt + 1
          }, true)
        });
      } catch (e) {
        console.log('there is an error update attempt sidekiq');
      }
    }
    this.uploadData();
  }

  static renameAttributeKeys(obj) {
    let attributes = {};

    for (var key in obj) {
      let newKey = key.split(/(?=[A-Z])/).map(k => k.toLowerCase()).join('_');
      attributes[newKey] = obj[key];
    }

    return attributes;
  }

  static ignoreAttributes(attributes, isUser){
    if(isUser){
      delete attributes.cover;
      delete attributes.role;
      delete attributes.games;
      delete attributes.is_visited;
      delete attributes.token;
    }else{
      delete attributes.personality_careers;
      delete attributes.step;
      delete attributes.is_done;
      delete attributes.goal_career;
      delete attributes.users;
      delete attributes.subject_attributes.games;
      delete attributes.personal_understandings;
    }
  }

  static deleteSidekiq = (sidekiq) => {
    let sk = realm.objects('Sidekiq').filtered('paramUuid="' + sidekiq.paramUuid + '"')[0];
    realm.write(() => {
      realm.delete(sk);
    });
  }

}
