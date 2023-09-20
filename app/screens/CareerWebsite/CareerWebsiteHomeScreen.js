import React, {Component} from 'react';

import ScrollableHeader from '../../components/scrollable_header';
import CareerWebsiteItem from './components/CareerWebsiteItem';
import CustomFlatListComponent from '../../components/shared/CustomFlatListComponent'

import scrollableHeaderUtil from '../../utils/scrollable_header_util';
// import {scrollViewPaddingBottom} from '../../constants/component_constant';
import CareerWebsite from '../../models/CareerWebsite';

export default class CareerWebsiteHomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      careerWebsites: [...CareerWebsite.getAll()]
    }

    this.listRef = React.createRef();
  }

  renderContent = () => {
    return (
      <CustomFlatListComponent
        ref={this.listRef}
        data={ this.state.careerWebsites }
        renderItem={ ({item}) => <CareerWebsiteItem career={item} /> }
        keyExtractor={(item, index) => index.toString()}
        // hasInternet={this.state.isInternetReachable}
        hasInternet={false}
        refreshingAction={() => this._onRefresh()}
        customContentContainerStyle={{flexGrow: 1, paddingTop: scrollableHeaderUtil.getContentMarginTop() + 20, paddingBottom: 16}}
        refreshControllOffset={scrollableHeaderUtil.getContentMarginTop()}
      />
    )
  }

  render() {
    return(
      <ScrollableHeader
        renderContent={ this.renderContent }
        title={'មជ្ឈមណ្ឌលការងារ'}
        largeTitle={'មជ្ឈមណ្ឌលការងារ'}
        useCustomScrollContent={true}
      />
    )
  }
}