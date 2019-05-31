import React, {Component} from 'react';
import { Container, Header, Left, Title, Body, Right, Button, Icon, Segment,
  Content, Text } from 'native-base';
import { FlatList } from 'react-native';

import API from '../../api/schools';
import LoadingIndicator from '../../components/loading_indicator';
import SegmentView from '../../components/schools/segment_view';
import School from '../../components/schools/school';
import FilterButton from '../../components/schools/filter_button';

import schoolList from '../../data/json/universities';

export default class SchoolScreen extends Component {
  myProvince = '';
  myMajor = '';
  segments = { 1 : 'សាលារដ្ឋ', 2:'សាលាឯកជន', 3:'អង្គការ'}

  constructor(props) {
    super(props)

    this.state = {
      activePage: 1,
      pagination: {},
      schools: [],
      majors: [],
      currentProvince: '',
      currentMajor: ''
    }
  }

  componentWillMount() {
    this.refreshState();
  }

  refreshState() {
    API.getSelectedProvince((province) => {
      API.getSelectedMajor((major) => {
        province = province == 'គ្រប់ទីកន្លែង' ? '': province;
        major = major == 'គ្រប់ជំនាញ' ? '': major;
        console.log('province : ', province);
        console.log('major : ', major)
        this.setState({ currentProvince: province,currentMajor: major });
        this._onChangeProvince(province);
        this._onChangeMajor(major);
      });
    });
  }

  _getProvinces() {
    API
      .getProvinces(this.segments[this.state.activePage])
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
    this._update(pagination, this.state.schools);
  }

  _getSchools(page, options={}) {
    this._getSchoolsRequest()
    options.category = this.segments[options.active || this.state.activePage];
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
    return(
      <School school={school} showCategory={false} navigation={this.props.navigation}/>
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

  setContent(active){
    this.setState({activePage: active});
    this._getSchools(1, { active: active });
  }

  _keyExtractor = (item, index) => index.toString();

  renderContent() {
    return (
      <FlatList
        data={ this.state.schools }
        renderItem={ ({item}) => this._renderRow(item) }
        refreshing={false}
        onRefresh={ () => this._onRefresh() }
        keyExtractor={ this._keyExtractor }
        onEndReached={ () => this._onEndReached() }
      />
    )
  }

  render() {
    return (
      <Container>
        <SegmentView
          activePage={this.state.activePage}
          setContent={(active) => this.setContent(active)}>
        </SegmentView>
        <Content>
          { this.renderContent() }
        </Content>
        <FilterButton
          navigation={this.props.navigation}
          category={this.segments[this.state.activePage]}
          refreshValue={ this.refreshState.bind(this)}
          />
      </Container>
    )
  }
}
