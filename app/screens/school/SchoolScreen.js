import React, { useEffect, useReducer } from 'react';
import { ActivityIndicator, View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useSelector } from 'react-redux';

import SchoolNavigationHeader from '../../components/schools/SchoolNavigationHeader';
import FilterButton from '../../components/schools/filter_button';
import CustomFlatListComponent from '../../components/shared/CustomFlatListComponent'
import SchoolListItemComponent from '../../components/shared/SchoolListItemComponent';;

import SchoolUtil from '../../utils/school_util';
import {Colors} from '../../assets/style_sheets/main/colors';
import schoolSyncService from '../../services/school_sync_service';
import majorService from '../../services/major_service';

const kinds = {
  1: "higher_education",
  2: "tvet_institute"
}

const SchoolScreen = (props) => {
  const [state, setState] = useReducer((prev, next) => {
    return {...prev, ...next}
  }, {
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
  });
  let currentPage = 1;
  let isEndPage = true;
  let isRequestingData = false;
  const listRef = React.createRef();
  let netInfoUnsubscribe = null;
  const schoolFilterOptions = useSelector(state => state.schoolFilterOptions.value);

  useEffect(() => {
    netInfoUnsubscribe = NetInfo.addEventListener(state => {
      setState({hasInternet: state.isConnected && state.isInternetReachable})
    });
  }, []);

  useEffect(() => {
    const { province, category, major, department } = schoolFilterOptions;
    resetData();
    setState({ currentProvince: province, currentMajor: major, currentCategory: category, currentDepartment: department });
    setSchools(state.activePage);
  }, [schoolFilterOptions])

  const setSchools = (active) => {
    const { province, category, major, department } = schoolFilterOptions;
    let options = {
      kind: kinds[active],
      province: province,
      major: major,
      category: category,
      department: department,
      page: currentPage,
      searchText: state.searchText
    }

    let schools = SchoolUtil.getSchools(options);
    isEndPage = !schools.length;
    isRequestingData = false;

    setState({
      schools: schools,
      loading: false,
    });
  }

  const resetData = () => {
    currentPage = 1;
    schools = [];
  }

  const _renderRow = (school) => {
    return <SchoolListItemComponent school={school} showCategory={false} searchText={state.searchText} />
  }

  const setContent = (active) => {
    resetData();
    setState({activePage: active});
    setSchools(active);
  }

  const getMore = () => {
    if (isRequestingData || isEndPage)
      return listRef.current?.stopPaginateLoading();

    isRequestingData = true;
    currentPage++;
    setSchools(state.activePage);
    listRef.current?.stopPaginateLoading()
  }

  const onRefresh = () => {
    majorService.syncAllData(() => listRef.current?.stopRefreshLoading())   // wait until finish syncing the major to hide the loading
    schoolSyncService.syncAllData(kinds[state.activePage], (schools) => {
      let options = {
        kind: kinds[state.activePage],
        province: state.currentProvince,
        major: state.currentMajor,
        category: state.currentCategory,
        department: state.currentDepartment,
        page: page,
        searchText: ''
      }
      setState({schools: SchoolUtil.getSchools(options)})
    }, () => {
      listRef.current?.stopRefreshLoading()
    })
  }

  const renderContent = () => {
    if (state.loading) {
      return (
        <View style={{marginTop: '55%'}}>
          <ActivityIndicator size="large" color={Colors.blue} />
        </View>
      )
    }

    return <CustomFlatListComponent
              ref={listRef}
              data={ state.schools.filter(school => school.name.includes(state.searchText)) }
              renderItem={ ({item}) => _renderRow(item) }
              hasInternet={state.hasInternet}
              keyExtractor={ (item, index) => index.toString() }
              offlineEndReached={true}
              refreshingAction={() => onRefresh()}
              endReachedAction={() => getMore()}
           />
  }

  const onSearchChange = (text) => {
    if (text == '') {
      resetData();
      setSchools(state.activePage, text);
    }
    setState({searchText: text})
  }

  return (
    <View style={{flex: 1}}>
      <SchoolNavigationHeader activePage={state.activePage} setContent={(active) => setContent(active)}
        searchedText={state.searchText}
        setSearchedText={(text) => onSearchChange(text)}
      />

      <View style={{flex: 1}}>
        { renderContent() }
        <FilterButton
          navigation={props.navigation}
          kind={kinds[state.activePage]}
          number={!!state.currentProvince + !!state.currentMajor + !!state.currentCategory + !!state.currentDepartment}
        />
      </View>
    </View>
  )
}

export default SchoolScreen;