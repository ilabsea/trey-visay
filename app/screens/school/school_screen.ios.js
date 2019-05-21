import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  StyleSheet,
  Image,
  TouchableOpacity,
  Picker,
  Platform,
  FlatList,
  RefreshControl,
} from 'react-native';
import IOSPicker from 'react-native-ios-picker';
import { Divider } from 'react-native-elements';

import API from '../../api/schools';
import LoadingIndicator from '../../components/loading_indicator';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import headerStyles from '../../assets/style_sheets/header';
import { FontSetting } from "../../assets/style_sheets/font_setting";
import mainStyles from '../../assets/style_sheets/main/main';
import shareStyles from '../../assets/style_sheets/profile_form';
import StatusBar from '../../components/shared/status_bar';
import Filter from '../../components/schools/filter';

import schoolList from '../../data/json/universities';
import Images from '../../assets/images';

export default class SchoolScreen extends Component {

  myProvince = '';
  myMajor = '';
  myCategory = this.props.screenProps.category;

  constructor(props) {
    super(props)

    this.state = {
      pagination: {},
      schools: [],
      majors: [],
      currentProvince: '',
      currentMajor: '',
    }

    props.screenProps.navigation.addListener('willFocus', (route) => {
      this.refreshState();
    });

    props.screenProps.navigation.setParams({
      refresh: this.refreshState.bind(this),
      category: this.myCategory,
    });
  }

  refreshState() {
    API.getSelectedProvince((province) => {
      API.getSelectedMajor((major) => {
        province = province == 'គ្រប់ទីកន្លែង' ? '': province;
        major = major == 'គ្រប់ជំនាញ' ? '': major;
        if(province || major){
          this.props.screenProps.navigation.setParams({
            hasFilter: true
          });
        }
        this.setState({ currentProvince: province,currentMajor: major });
        this._onChangeProvince(province);
        this._onChangeMajor(major);
      });
    });
  }

  _getSchoolsRequest() {
    const pagination = { ...this.state.pagination, loading: true }
    this._update(pagination, this.state.schools)
  }

  _getSchoolsSuccess(result) {
    const pagination = { ...result.pagination, loading: false }

    let schools = result.records

    if (pagination.page != 1) {
      let arr = [ ...this.state.schools, ...result.records ];
      let uniqCodes = [...new Set(arr.map(x => x.code))];
      schools = uniqCodes.map(code => arr.find(school => school.code == code));
    }

    this._update(pagination, schools);
  }

  _getSchoolsFailure(error) {
    const pagination = { ...this.state.pagination, loading: false }
    this._update(pagination, this.state.schools)
    console.error(error)
  }

  _getSchools(page, options={}) {
    this._getSchoolsRequest()
    options.category = this.myCategory;
    options.province = this.myProvince;
    options.major = this.myMajor;

    API
      .getSchools(page, options)
      .then(result => {
        !!options.callback && options.callback(result);
        this._getSchoolsSuccess(result)}
      )
      .catch(error => this._getSchoolsFailure(error))
  }

  _update(pagination, schools) {
    const loading = {
      type: 'Loading',
      loading: pagination.loading
    }
    this.setState({
      pagination: pagination,
      schools: schools,
    })
  }

  _renderRow(school) {
    if (school.type === 'Loading') {
      return <LoadingIndicator loading={ school.loading } />
    }

    let logo = require('../../assets/images/schools/default.png');
    if (!!school.logoName) {
      logo = Images[school.logoName];
    }

    return (
      <View style={{backgroundColor: 'white'}}>
        <TouchableOpacity
          style={mainStyles.btnList}
          onPress={() => { this.props.screenProps.navigation.navigate('InstitutionDetail', {school: school})} }>

          <View>
            <Image source={logo} style={styles.image} />
          </View>

          <View style={{flex: 1, marginLeft: 16, marginRight: 16}}>
            <Text numberOfLines={1} style={mainStyles.title}>
              {school.universityName}
            </Text>

            <View style={{flexDirection: 'row'}}>
              <AwesomeIcon name='map-marker' color='#1976d2' size={18} />
              <Text numberOfLines={1} style={[mainStyles.subTitle, {marginLeft: 8}]}>{school.address}</Text>
            </View>
          </View>

          <View style={{justifyContent: 'center'}}>
            <AwesomeIcon name='angle-right' size={24} color='#bbb' />
          </View>
        </TouchableOpacity>
        <Divider style={{marginLeft: 80}}/>
      </View>
    )
  }

  _onRefresh() {
    this._getSchools(1)
  }

  _onEndReached() {
    const { pagination } = this.state
    const { page, perPage, pageCount, totalCount } = pagination
    const lastPage = totalCount <= (page - 1) * perPage + pageCount

    if (!pagination.loading && !lastPage) {
      this._getSchools(page + 1)
    }
  }

  _keyExtractor = (item, index) => index.toString();

  _renderContent() {
    return (
      <FlatList
        data={ this.state.schools }
        renderItem={ ({item}) => this._renderRow(item) }
        refreshing={!!this.state.loading}
        onRefresh={ () => this._onRefresh() }
        keyExtractor={this._keyExtractor}
        onEndReached={ () => this._onEndReached() }
      />
    )
  }

  _onChangeProvince(province) {
    this.myProvince = province;
    this.myMajor = '';

    let obj = { currentProvince: province, currentMajor: '' };
    let params = { callback: this._getMajors };

    if (!province) {
      params = {};
      obj.majors = [];
    }
    this.setState(obj);
    this._getSchools(1, params);
  }

  _getMajors = (result) => {
    let departments = result.records.map(school => school.departments);
    departments = [].concat.apply([], departments);

    let majors = departments.map(department => department.majors);
    majors = [].concat.apply([], majors);
    majors = [...new Set(majors)]

    this.setState({majors: majors});
  }

  _onChangeMajor(major) {
    this.myMajor = major;
    this.setState({currentMajor: major});
    this._getSchools(1);
  }

  render() {
    return (
      <View>
        <StatusBar />

        <View >
          { this._renderContent() }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50
  }
})
