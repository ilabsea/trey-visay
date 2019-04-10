import React, {Component} from 'react';
import {
  NetInfo
} from 'react-native';

import characteristicList from '../data/json/characteristic_jobs';
import realm from '../schema';
// Utils
import api from './../utils/api';

export default class UploadServices  {
  static count;

  static syncToServer(){
    NetInfo.isConnected.fetch().then(isConnected => {
      console.log('isConnected : ', isConnected)
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
    let sidekidData = data.map((sidekiq) => ({
      paramUuid: sidekiq.paramUuid,
      tableName: sidekiq.tableName
    }));
    if ( this.count < sidekidData.length ) {
      let sidekiq = sidekidData[this.count];
      this.upload(sidekiq);
      return;
    }
  }

  static upload(sidekiq) {
    let data = realm.objects(sidekiq.tableName)
      .filtered('uuid="' + sidekiq.paramUuid + '"')[0];
    let postUrl = sidekiq.tableName == 'User' ? '/users' : "/games";
    api.post(postUrl, this['build' + sidekiq.tableName](data))
    .then((res) => {
      this.handleResponse(res, sidekiq);
    })
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

    attributes.user_uuid = game.users[0].uuid
    attributes.characteristic_entries = game.characteristicEntries.map(obj => obj.value);
    attributes.game_subject = this.renameAttributeKeys(game.gameSubject);
    attributes.personal_understandings = [];

    this.ignoreAttributes(attributes, false);

    let currentGroup = characteristicList.find((obj) => obj.id == game.characteristicId);
    let careerIds = game.personalityCareers.map((obj) => obj.value);

    game.personalityCareers.map((obj) => {
      attributes.careers = currentGroup.careers.filter((item, pos) => {
        return careerIds.includes(item.id)
      });
    });

    attributes.careers = attributes.careers.map((obj) => {
      obj.is_goal = (obj.id == game.mostFavorableJobId);
      obj.name = obj.name.trim();
      obj.description = obj.description.trim();
      return obj;
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


      attributes.personal_understandings.push(obj);
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
      delete attributes.game_subject.games;
    }
  }

  static deleteSidekiq = (sidekiq) => {
    let sk = realm.objects('Sidekiq').filtered('paramUuid="' + sidekiq.paramUuid + '"')[0];
    realm.write(() => {
      realm.delete(sk);
    });
  }

}
