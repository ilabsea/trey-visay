import React, { useEffect, useReducer, useRef } from 'react';
import { View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { useSelector } from 'react-redux';

import SchoolNavigationHeader from '../../components/schools/SchoolNavigationHeader';
import FilterButton from '../../components/schools/filter_button';
import CustomFlatListComponent from '../../components/shared/CustomFlatListComponent'
import SchoolListItemComponent from '../../components/shared/SchoolListItemComponent';;

import School from '../../models/School';
import Major from '../../models/Major';
import SchoolUtil from '../../utils/school_util';
import schoolSyncService from '../../services/school_sync_service';
import majorService from '../../services/major_service';
import asyncStorageService from '../../services/async_storage_service';
import { itemsPerPage } from '../../constants/sync_data_constant';

const kinds = {
  1: "higher_education",
  2: "tvet_institute"
}
const listRef = React.createRef();

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
    searchText: '',
    hasInternet: false,
  });
  const schoolFilterOptions = useSelector(state => state.schoolFilterOptions.value);
  const currentPage = useRef(1);
  const listIndex = useRef(20);

  useEffect(() => {
    initUpdatedAt();
    const netInfoUnsubscribe = NetInfo.addEventListener(state => {
      setState({hasInternet: state.isConnected && state.isInternetReachable})
    });

    return () => !!netInfoUnsubscribe && netInfoUnsubscribe();
  }, []);

  const initUpdatedAt = async () => {
    if (!await asyncStorageService.getItem('SCHOOL_UPDATED_AT') || !await asyncStorageService.getItem('MAJOR_UPDATED_AT')) {
      asyncStorageService.setItem('SCHOOL_UPDATED_AT', School.getLastUpdatedAt());
      asyncStorageService.setItem('MAJOR_UPDATED_AT', Major.getLastUpdatedAt());
    }
  }

  useEffect(() => {
    const { province, category, major, department } = schoolFilterOptions;
    resetListIndex();
    setState({ currentProvince: province, currentMajor: major, currentCategory: category, currentDepartment: department });
    setSchools(state.activePage, state.searchText);
  }, [schoolFilterOptions])

  const setSchools = (active, searchText = '') => {
    const { province, category, major, department } = schoolFilterOptions;
    let options = {
      kind: kinds[active],
      province: province,
      major: major,
      category: category,
      department: department,
      page: currentPage.current,
      searchText: searchText
    }

    const schools = [...SchoolUtil.getSchools(options)];
    setState({schools: schools.slice(0, listIndex.current)});
  }

  const resetListIndex = () => {
    currentPage.current = 1;
    listIndex.current = itemsPerPage;
  }

  const _renderRow = (school) => {
    return <SchoolListItemComponent school={school} showCategory={false} searchText={state.searchText} />
  }

  const setContent = (active) => {
    resetListIndex();
    setState({activePage: active});
    setSchools(active);
  }

  const getMore = () => {
    if (listRef.current?.isLoading())
      return listRef.current?.stopPaginateLoading();

    listIndex.current += 20;
    currentPage.current++;
    // prevent sync data on end of the list when there is no internet or when searching the school
    if (!state.hasInternet || !!state.searchText) {
      setSchools(state.activePage, state.searchText);
      listRef.current?.stopPaginateLoading();
      return;
    }
    syncSchool(() => { listRef.current?.stopPaginateLoading() });
  }

  const onRefresh = () => {
    resetListIndex();
    majorService.syncData()
    syncSchool(() => listRef.current?.stopRefreshLoading());
  }

  const syncSchool = (callback) => {
    schoolSyncService.syncData(kinds[state.activePage], (schools) => {
      if (schools.length == state.schools.length)
        listIndex.current = Math.ceil(schools.length / itemsPerPage) * itemsPerPage;

      setSchools(state.activePage, state.searchText)
      !!callback && callback();
    });
  }

  const renderContent = () => {
    return <CustomFlatListComponent
              ref={listRef}
              data={ state.schools }
              renderItem={ ({item}) => _renderRow(item) }
              hasInternet={state.hasInternet}
              keyExtractor={ (item, index) => index.toString() }
              offlineEndReached={true}
              refreshingAction={() => onRefresh()}
              endReachedAction={() => getMore()}
           />
  }

  const onSearchChange = (text) => {
    if (text == '')
      resetListIndex();

    setSchools(state.activePage, text);
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