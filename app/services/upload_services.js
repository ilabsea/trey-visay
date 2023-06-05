import React, {Component} from 'react';
import {
  Platform
} from 'react-native';

import NetInfo from "@react-native-community/netinfo";
import characteristicList from '../data/json/characteristic_jobs';
import realm from '../db/schema';
// import Sidekiq from '../utils/models/sidekiq';
import { environment } from '../config/environment';
import api from './../utils/api';

export default class UploadServices  {
  static cursor;
  static data = [];

  static syncToServer(){
    NetInfo.fetch().then(state => {
      console.log("state=================", state)
      if (state.isInternetReachable) {
        api.get('/me').then((res) => {
          if(res.data && res.data.success){
            this.cursor = 0;
            this.data = realm.objects('Sidekiq').slice();
            this.uploadSidekiq();
          }
        })
      }
    });
  }

  static uploadSidekiq() {
    if ( this.cursor < this.data.length ) {

      let sidekiq = this.data[this.cursor];
      this.upload(sidekiq);
    }
  }

  static upload(sidekiq) {
    if(sidekiq.attempt < environment.maxFailedAttempt){
      let record = realm.objects(sidekiq.tableName).filtered('uuid="' + sidekiq.paramUuid + '"')[0];
      let postUrl = this.getPostUrl(sidekiq);
      record.version = sidekiq.version;

      api.post(postUrl, this['build' + sidekiq.tableName](record))
      .then((res) => {
        this.handleResponse(res, sidekiq);
      })
    } else{
      Sidekiq.delete(sidekiq);
      this.cursor++;
      this.uploadSidekiq();
    }
  }

  static getPostUrl(sidekiq) {
    let url = '';

    switch(sidekiq.tableName) {
      case 'User':
        url = '/users';
        break;
      case 'Game':
        url = '/games';
        break;
      default:
        url = '/personality_tests';
    }

    return url;
  }

  static buildPersonalityAssessment(assessment) {
    let categories = [
      'realistic',
      'investigative',
      'artistic',
      'social',
      'enterprising',
      'conventional'
    ];

    let personalityCodes = categories.map(category => assessment[category].map(obj => obj.value));
    personalityCodes = [].concat.apply([], personalityCodes);
    personalityCodes = personalityCodes.map(code => {
      return { personality_code: code }
    })

    let obj = {
      data: {
        user_uuid: assessment.userUuid,
        personality_selections_attributes: personalityCodes,
        version: assessment.version
      }
    };

    return obj;
  }

  static buildUser(user) {
    let attributes = this.renameAttributeKeys(user);

    this.ignoreAttributes(attributes, true);

    let userData = new FormData();
    userData.append('data', JSON.stringify(attributes));

    if (!!user.photo) {
      let uri = Platform.OS == 'ios' ? 'file://' + user.photo : user.photo;

      userData.append('photo', {
        uri: uri,
        type: 'image/jpeg',
        name: 'userPhoto'
      });
    } else {
      userData.append('photo', '');
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

    let careerCodes = game.personalityCareers.map((obj) => obj.value);
    attributes.career_games_attributes = careerCodes.map((code) => {
      return {
        career_code: code,
        is_goal: (code == game.mostFavorableJobCode)
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
    if (res.ok) {
      Sidekiq.delete(sidekiq);
    } else{
      Sidekiq.increaseAttempt(sidekiq);
    }

    this.cursor++;
    this.uploadSidekiq();
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
