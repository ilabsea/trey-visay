import React from 'react'

import SegmentView from './segment_view'
import CustomNavigationHeader from '../shared/CustomNavigationHeader';

const SchoolNavigationHeader = (props) => {
  return <CustomNavigationHeader title='គ្រឹះស្ថានសិក្សា'>
            <SegmentView activePage={props.activePage} setContent={(active) => props.setContent(active)}/>
         </CustomNavigationHeader>
}

export default SchoolNavigationHeader