import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import SchoolNavigationHeader from '../../components/schools/SchoolNavigationHeader';
import School from '../../components/schools/school';
import FilterButton from '../../components/schools/filter_button';
import CustomFlatListComponent from '../../components/shared/CustomFlatListComponent';

import SchoolUtil from '../../utils/school_util';
import {Colors} from '../../assets/style_sheets/main/colors';
import schoolSyncService from '../../services/school_sync_service';
import collegeMajorSyncService from '../../services/college_major_sync_service';

const kinds = {
  1: "higher_education",
  2: "tvet_institute"
}

export default class SchoolScreen extends Component {
  _keyExtractor = (item, index) => index.toString();

  constructor(props) {
    super(props)

    this.state = {
      activePage: 1,
      schools: [],
      majors: [],
      currentProvince: '',
      currentMajor: '',
      currentCategory: '',
      currentDepartment: '',
      loading: true,
      searchText: '',
      hasInternet: false,
    }
    this.listRef = React.createRef()
    this.netInfoUnsubscribe = null;
  }

  componentDidMount() {
    this.refreshState();
    this.netInfoUnsubscribe = NetInfo.addEventListener(state => {
      this.setState({hasInternet: state.isConnected && state.isInternetReachable})
    });
  }

  componentWillUnmount() {
    !!this.netInfoUnsubscribe && this.netInfoUnsubscribe();
  }

  refreshState() {
    console.log('refreh state =========')

    this.resetData();

    SchoolUtil.getSelectedProvince((province) => {
      SchoolUtil.getSelectedMajor((major) => {
        SchoolUtil.getSelectedCategory((category) => {
          SchoolUtil.getSelectedDepartment(department => {
            province = province == 'គ្រប់ទីកន្លែង' ? '': province;
            major = major == 'គ្រប់ជំនាញ' ? '': major;
            this.setState({ currentProvince: province, currentMajor: major, currentCategory: category, currentDepartment: department });
            this.setSchools(this.state.activePage);
          })
        })
      });
    });
  }

  setSchools(active, searchText = '') {
    let options = {
      kind: kinds[active],
      province: this.state.currentProvince,
      major: this.state.currentMajor,
      category: this.state.currentCategory,
      department: this.state.currentDepartment,
      page: this.page,
      searchText: this.state.searchText
    }

    let schools = SchoolUtil.getSchools(options);
    this.isEndPage = !schools.length;
    this.schools = [...this.schools, ...schools];
    this.isRequestingData = false;

    this.setState({
      schools: this.schools,
      loading: false,
    });
  }

  resetData() {
    this.page = 1;
    this.schools = [];
  }

  _renderRow(school) {
    return <School school={school} showCategory={false} navigation={this.props.navigation}/>
  }

  setContent(active){
    this.resetData();
    this.setState({activePage: active});
    this.setSchools(active, this.state.searchText);
  }

  getMore() {
    if (this.isRequestingData || this.isEndPage) {
      return;
    }

    this.isRequestingData = true;
    this.page++;
    this.setSchools(this.state.activePage);
  }

  onRefresh() {
    collegeMajorSyncService.syncAllData()
    schoolSyncService.syncAllData(kinds[this.state.activePage], (schools) => {
      let options = {
        kind: kinds[this.state.activePage],
        province: this.state.currentProvince,
        major: this.state.currentMajor,
        category: this.state.currentCategory,
        department: this.state.currentDepartment,
        page: this.page,
        searchText: ''
      }
      this.setState({schools: SchoolUtil.getSchools(options)})
      this.listRef.current?.stopRefreshLoading()
    }, () => {
      this.listRef.current?.stopRefreshLoading()
    })
  }

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{marginTop: '55%'}}>
          <ActivityIndicator size="large" color={Colors.blue} />
        </View>
      )
    }

    return <CustomFlatListComponent
              ref={this.listRef}
              data={ this.state.schools.filter(school => school.name.includes(this.state.searchText)) }
              renderItem={ ({item}) => this._renderRow(item) }
              hasInternet={this.state.hasInternet}
              keyExtractor={ this._keyExtractor }
              refreshingAction={() => this.onRefresh()}
           />
  }

  onSearchChange(text) {
    if (text == '') {
      this.resetData();
      this.setSchools(this.state.activePage, text);
    }
    this.setState({searchText: text})
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <SchoolNavigationHeader activePage={this.state.activePage} setContent={(active) => this.setContent(active)}
          searchedText={this.state.searchText}
          setSearchedText={(text) => this.onSearchChange(text)}
        />

        <View style={{flex: 1}}>
          { this.renderContent() }
          <FilterButton
            navigation={this.props.navigation}
            kind={kinds[this.state.activePage]}
            refreshValue={ this.refreshState.bind(this)}
            number={!!this.state.currentProvince + !!this.state.currentMajor + !!this.state.currentCategory + !!this.state.currentDepartment}
          />
        </View>
      </View>
    )
  }
}
