import React, {Component} from 'react';
import {
  NetInfo
} from 'react-native';

import characteristicList from '../data/json/characteristic_jobs';
import realm from '../schema';
import Sidekiq from '../utils/models/sidekiq';
import { environment } from '../config/environment';
import api from './../utils/api';

export default class UploadServices  {
  static cursor;

  static syncToServer(){
    NetInfo.isConnected.fetch().then(isConnected => {
      api.get('/me').then((res) => {
        if(res.data && res.data.success){
          this.cursor = 0;
          this.uploadSidekiqs()
        }
      })
    });
  }

  static uploadSidekiqs() {
    let sidekiqs = realm.objects('Sidekiq');
    let sidekiqsArr = sidekiqs.map((sidekiq) => (sidekiq));
    if ( this.cursor < sidekiqsArr.length ) {
      let sidekiq = sidekiqsArr[this.cursor];
      this.upload(sidekiq);
      return;
    }
  }

  static upload(sidekiq) {
    if(sidekiq.attempt < environment.maxFailedAttempt){
      let sidekidTable = realm.objects(sidekiq.tableName)
        .filtered('uuid="' + sidekiq.paramUuid + '"')[0];
      let postUrl = sidekiq.tableName == 'User' ? '/users' : "/games";
      sidekidTable.version = sidekiq.version;
      api.post(postUrl, this['build' + sidekiq.tableName](sidekidTable))
      .then((res) => {
        this.handleResponse(res, sidekiq);
      })
    } else{
      Sidekiq.delete(sidekiq);
      this.uploadSidekiqs();
    }
  }

  static buildUser(user) {
    let attributes = this.renameAttributeKeys(user);

    this.ignoreAttributes(attributes, true);

    let userData = new FormData();
    userData.append('data', JSON.stringify(attributes));

    if (user.photo) {
      let uri = Platform.OS == 'ios' ? 'file://' + user.photo : user.photo;
      userData.append('photo', {
        uri: uri,
        type: 'image/jpeg',
        name: 'userPhoto'
      });
    }

    return userData;
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
      let newPu = this.renameAttributeKeys(pu);
      delete newPu.games;

      let myArr = [];
      let myObj = { 1: 'ឳពុកម្តាយ', 2: 'បងប្អូន', 3: 'ក្រុមប្រឹក្សាកុមារ', 4: 'នាយកសាលា', 5: 'គ្រូ', 6: 'មិត្តភក្តិ' };

      if (!!newPu['ever_talked_with_anyone_about_career']) {
        newPu['ever_talked_with_anyone_about_career'].map((o) => myArr.push(myObj[o.value]))
      }
      newPu['ever_talked_with_anyone_about_career'] = myArr.join(';');

      attributes.personal_understandings_attributes.push(newPu);
    })

    // Form data
    let gameData = new FormData();

    gameData.append('data', JSON.stringify(attributes));

    if (game.voiceRecord) {
      gameData.append('audio', {
        uri: 'file://'+ game.voiceRecord,
        type: 'audio/aac',
        name: 'voiceRecord.aac'
      });
    }

    return gameData;
  }

  static handleResponse(res, sidekiq) {
    if (res.data.success) {
      Sidekiq.delete(sidekiq);
    } else{
      this.cursor++;
      Sidekiq.increaseAttempt(sidekiq);
    }
    this.uploadSidekiqs();
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
      delete attributes.game_subject.games;
      delete attributes.game_subject;
      delete attributes.subject_attributes.games;
      delete attributes.personal_understandings;
    }
  }
}
