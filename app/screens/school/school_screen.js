import React, { Component } from 'react';

import { Container, Content } from 'native-base';
import { FlatList } from 'react-native';

import SegmentView from '../../components/schools/segment_view';
import School from '../../components/schools/school';
import FilterButton from '../../components/schools/filter_button';
import StatusBar from '../../components/shared/status_bar';

import SchoolUtil from '../../utils/School/School';

export default class SchoolScreen extends Component {
  segments = { 1 : 'សាលារដ្ឋ', 2:'សាលាឯកជន', 3:'អង្គការ'}
  _keyExtractor = (item, index) => index.toString();

  constructor(props) {
    super(props)

    this.state = {
      limit: 10,
      activePage: 1,
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
    SchoolUtil.getSelectedProvince((province) => {
      SchoolUtil.getSelectedMajor((major) => {
        province = province == 'គ្រប់ទីកន្លែង' ? '': province;
        major = major == 'គ្រប់ជំនាញ' ? '': major;
        this.setState({ currentProvince: province, currentMajor: major });
        this.setSchools(this.state.activePage);
      });
    });
  }

  setSchools(active){
    let options = {
      category: this.segments[active],
      province: this.state.currentProvince,
      major: this.state.currentMajor,
    }
    let schools = SchoolUtil.getSchools(options);
    this.setState({schools: schools});
  }

  _renderRow(school) {
    return(
      <School school={school} showCategory={false} navigation={this.props.navigation}/>
    )
  }

  setContent(active){
    this.setState({activePage: active});
    this.setSchools(active);
  }

  renderContent() {
    return (
      <FlatList
        data={ this.state.schools }
        renderItem={ ({item}) => this._renderRow(item) }
        refreshing={false}
        keyExtractor={ this._keyExtractor }
      />
    )
  }

  render() {
    return (
      <Container>
        <StatusBar translucent={false}/>

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
