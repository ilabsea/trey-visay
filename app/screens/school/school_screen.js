import React, {Component} from 'react';
import {
  Text,
  View,
  Button,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  Picker,
  Platform,
  ListView,
  RefreshControl,
} from 'react-native';
import IOSPicker from 'react-native-ios-picker';

import API from '../../api/schools';
import LoadingIndicator from '../../components/loading_indicator';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from '../../assets/style_sheets/profile_form';
import StatusBar from '../../components/status_bar';


import schoolList from '../../data/json/schools';
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
      provinces: [],
      majors: [],
      currentProvince: '',
      currentMajor: '',
      ds: new ListView.DataSource({ rowHasChanged: this._rowHasChanged })
    }
  }

  componentWillMount() {
    this._getProvinces();
    this._getSchools(1);
  }

  _getProvinces() {
    API
      .getProvinces(this.myCategory)
      .then(result => this.setState({provinces: result.provinces}))
      .catch(error => {console.log(error)})
  }

  _getSchoolsRequest() {
    const pagination = { ...this.state.pagination, loading: true }
    this._update(pagination, this.state.schools)
  }

  _getSchoolsSuccess(result) {
    const pagination = { ...result.pagination, loading: false }
    const schools = pagination.page === 1 ? result.records : [ ...this.state.schools, ...result.records ]

    this._update(pagination, schools)
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

  _rowHasChanged(r1, r2) {
    return r1 !== r2
  }

  _update(pagination, schools) {
    const loading = {
      type: 'Loading',
      loading: pagination.loading
    }
    this.setState({
      pagination: pagination,
      schools: schools,
      ds: this.state.ds.cloneWithRows([ ...schools, loading ])
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
      <TouchableOpacity
        onPress={() =>
          this.props.screenProps.navigation.navigate('InstitutionDetail', {id: school.id})}>
        <View style={styles.box}>
          <Image source={logo} style={styles.image} />

          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={styles.schoolName}>{school.universityName}</Text>

            { !!school.address &&
              <View style={{flexDirection: 'row'}}>
                <AwesomeIcon name='map-marker' color='#1976d2' size={24} />
                <Text style={styles.schoolAddress}>{school.address}</Text>
              </View>
            }
          </View>
        </View>
      </TouchableOpacity>
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

  _renderContent() {
    return (
      <ListView
        enableEmptySections={ true }
        automaticallyAdjustContentInsets={ false }
        dataSource={ this.state.ds }
        renderRow={ row => this._renderRow(row) }
        refreshControl={
          <RefreshControl
            refreshing={ false }
            onRefresh={ () => this._onRefresh() }
          />
        }
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

  _renderFilters() {
    let PickerSpecific = Platform.OS === 'ios' ?
        IOSPicker :
        Picker;
    return (
      <View style={{flexDirection: 'row', marginHorizontal: 16, marginVertical: 8}}>
        <PickerSpecific
          selectedValue={this.state.currentProvince ? this.state.currentProvince : 'ជ្រើសរើសទីតាំង'}
          onValueChange={(itemValue, itemIndex) => this._onChangeProvince(itemValue)}
          mode={Platform.OS === 'ios' ? 'modal' : 'dialog'}
          prompt='ជ្រើសរើសទីតាំង'
          style={{width: 165, marginRight: 10 , backgroundColor: 'transparent', alignItems: 'center'}}
          itemStyle={{fontSize: 16}}
        >
          <Picker.Item label="គ្រប់ទីកន្លែង" value="" />
          { this.state.provinces.map((province, i) => {
            return (<Picker.Item key={i} label={province} value={province} />)
          })}

        </PickerSpecific>

        <PickerSpecific
          selectedValue={this.state.currentMajor ? this.state.currentMajor : 'ជ្រើសរើសជំនាញ'}
          onValueChange={(itemValue, itemIndex) => this._onChangeMajor(itemValue)}
          mode={Platform.OS === 'ios' ? 'modal' : 'dialog'}
          prompt='ជ្រើសរើសជំនាញ'
          style={{width: 165 , backgroundColor: 'transparent', alignItems: 'center'}}
        >
          <Picker.Item label="គ្រប់ជំនាញ" value="" />

          { this.state.majors.map((major, i) => {
            return (<Picker.Item key={i} label={major} value={major} />)
          })}
        </PickerSpecific>
      </View>
    )
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar />

        <View style={{flex: 1}}>
          { this._renderFilters() }
          { this._renderContent() }
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#eee',
    padding: 16,
    backgroundColor: '#fff',
    flexDirection: 'row',
    ...Platform.select({
      android: {
        marginHorizontal: 16
      },
      ios: {
        marginHorizontal: 8
      }
    })
  },
  image: {
    width: 100,
    height: 100
  },
  schoolName: {
    ...Platform.select({
      android:{
        fontSize: 20
      },
      ios: {
        fontSize: 14
      }
    })
  },
  schoolAddress: {
    marginLeft: 8,
    ...Platform.select({
      ios: {
        fontSize: 12,
        color: "#3A3A3A"
      }
    })
  }
})
