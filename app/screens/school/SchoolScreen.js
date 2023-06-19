import React, { Component } from 'react';
import { FlatList, ActivityIndicator, View } from 'react-native';

import SchoolNavigationHeader from '../../components/schools/SchoolNavigationHeader';
import School from '../../components/schools/school';
import FilterButton from '../../components/schools/filter_button';

import SchoolUtil from '../../utils/School/School';
import {Colors} from '../../assets/style_sheets/main/colors';

export default class SchoolScreen extends Component {
  segments = { 1 : 'សាលារដ្ឋ', 2:'សាលាឯកជន', 3:'អង្គការ'}
  _keyExtractor = (item, index) => index.toString();

  constructor(props) {
    super(props)

    this.state = {
      activePage: 1,
      schools: [],
      majors: [],
      currentProvince: '',
      currentMajor: '',
      loading: true,
      searchText: '',
    }
  }

  componentWillMount() {
    this.refreshState();
  }

  refreshState() {
    this.resetData();

    SchoolUtil.getSelectedProvince((province) => {
      SchoolUtil.getSelectedMajor((major) => {
        province = province == 'គ្រប់ទីកន្លែង' ? '': province;
        major = major == 'គ្រប់ជំនាញ' ? '': major;
        this.setState({ currentProvince: province, currentMajor: major });
        this.setSchools(this.state.activePage);
      });
    });
  }

  setSchools(active, searchText = '') {
    let options = {
      category: this.segments[active],
      province: this.state.currentProvince,
      major: this.state.currentMajor,
      page: this.page,
      searchText: searchText
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

  renderContent() {
    if (this.state.loading) {
      return (
        <View style={{marginTop: '55%'}}>
          <ActivityIndicator size="large" color={Colors.blue} />
        </View>
      )
    }

    return (
      <FlatList
        data={ this.state.schools.filter(school => school.universityName.includes(this.state.searchText)) }
        renderItem={ ({item}) => this._renderRow(item) }
        refreshing={false}
        keyExtractor={ this._keyExtractor }
        onEndReached={ () => this.getMore() }
        onEndReachedThreshold={0.7}
        contentContainerStyle={{paddingBottom: 78}}
      />
    )
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
            category={this.segments[this.state.activePage]}
            refreshValue={ this.refreshState.bind(this)}
            number={!!this.state.currentProvince + !!this.state.currentMajor}
          />
        </View>
      </View>
    )
  }
}
