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
  ListView,
  RefreshControl,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
} from 'react-native-material-ui';

import API from '../../api/schools';
import LoadingIndicator from '../../components/loading_indicator';
import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import headerStyles from '../../assets/style_sheets/header';
import shareStyles from '../../assets/style_sheets/profile_form';
import AppStyles from '../../assets/style_sheets/app_styles';
import StatusBar from '../../components/status_bar';

import schoolList from '../../data/json/schools';
import Images from '../../assets/images';

const uiTheme = {
  palette: {
    primaryColor: '#1976d2',
  }
};

export default class GovernmentSchoolScreen extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      header:
        <ThemeProvider uiTheme={{}}>
          <Toolbar
            leftElement="menu"
            centerElement={<Text style={[headerStyles.headerTitleStyle, {marginLeft: 0}]}>គ្រឹះស្ថានសិក្សា</Text>}
            onLeftElementPress={() => screenProps.drawerNavigation.navigate('DrawerOpen') }
          />
        </ThemeProvider>,
      tabBarLabel: 'សាលារដ្ឋ',
    }
  };

  myProvince = '';
  myMajor = '';
  myCategory = 'សាលារដ្ឋ';

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
      <TouchableOpacity onPress={() => this.props.navigation.navigate('InstitutionDetail', {id: school.id})}>
        <View style={[shareStyles.box, {flexDirection: 'row', marginHorizontal: 16}]}>
          <Image source={logo} style={{width: 100, height: 100}} />

          <View style={{flex: 1, marginLeft: 16}}>
            <Text style={shareStyles.subTitle}>{school.universityName}</Text>

            { !!school.address &&
              <View style={{flexDirection: 'row'}}>
                <AwesomeIcon name='map-marker' color='#1976d2' size={24} />
                <Text style={{marginLeft: 8}}>{school.address}</Text>
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
        style={{flex: 1, paddingBottom: 16}}
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
    return (
      <View style={{flexDirection: 'row', marginHorizontal: 16, marginVertical: 8}}>
        <View style={{width: 200}}>
          <Picker
            selectedValue={this.state.currentProvince}
            onValueChange={(itemValue, itemIndex) => this._onChangeProvince(itemValue)}
            mode='dialog'
            prompt='ជ្រើសរើសទីតាំង'
            itemStyle={{fontFamily: AppStyles.fonts.main, fontSize: 16}}
          >
            <Picker.Item label="គ្រប់ទីកន្លែង" value="" />
            { this.state.provinces.map((province, i) => {
              return (<Picker.Item key={i} label={province} value={province} />)
            })}

          </Picker>
        </View>

        <View style={{width: 200}}>
          <Picker
            selectedValue={this.state.currentMajor}
            onValueChange={(itemValue, itemIndex) => this._onChangeMajor(itemValue)}
            mode='dialog'
            prompt='ជ្រើសរើសជំនាញ'
          >
            <Picker.Item label="គ្រប់ជំនាញ" value="" />

            { this.state.majors.map((major, i) => {
              return (<Picker.Item key={i} label={major} value={major} />)
            })}
          </Picker>
        </View>
      </View>
    )
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={{flex: 1}}>
          <StatusBar />

          <View style={{flex: 1}}>
            { this._renderFilters() }
            { this._renderContent() }
          </View>
        </View>
      </ThemeProvider>
    )
  }
}
