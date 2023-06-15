import React from 'react'
import {StyleSheet} from 'react-native'

import SegmentView from './segment_view'
import SearchableHeader from '../shared/searchableHeaders/SearchableHeader';
import {getStyleOfOS} from '../../utils/responsive_util';

const SchoolNavigationHeader = (props) => {
  return <SearchableHeader title="គ្រឹះស្ថានសិក្សា" placeholder="ស្វែងរកគ្រឹះស្ថានសិក្សា" containerStyle={[styles.header, {paddingTop: getStyleOfOS(2, 4)}]}
            searchedText={props.searchedText}
            setSearchedText={props.setSearchedText}
         >
            <SegmentView activePage={props.activePage} setContent={(active) => props.setContent(active)}/>
         </SearchableHeader>
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    elevation: 1,
    flexDirection: 'column',
    height: 'auto',
    paddingBottom: 16,
  },
})

export default SchoolNavigationHeader