import React, {useState, useRef} from 'react';
import {Animated, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';

import color from '../../themes/color';
import {screenHorizontalPadding} from '../../constants/component_constant';

const {useImperativeHandle} = React

const CustomFlatListComponent = React.forwardRef((props, ref) => {
  const [refreshing, setRefreshing] = useState(false);
  const [paginateLoading, setPaginateLoading] = useState(false);
  const onEndReachedCalledDuringMomentum = useRef(false)

  const stopPaginateLoading = () => {
    setPaginateLoading(false)
  }

  const stopRefreshLoading = () => {
    setRefreshing(false)
  }

  // To enable the parent component to call below functions from Ref
  useImperativeHandle(ref, () => ({
    stopPaginateLoading,
    stopRefreshLoading
  }))

  const onEndReached = () => {
    if (!props.hasInternet || onEndReachedCalledDuringMomentum.current || paginateLoading) return

    setPaginateLoading(true)
    onEndReachedCalledDuringMomentum.current = true
    !!props.endReachedAction && props.endReachedAction()
  }

  const onRefresh = () => {
    if (!props.hasInternet) return

    setRefreshing(true)
    !!props.refreshingAction && props.refreshingAction()
  }

  const renderListFooter = () => {
    if (!paginateLoading) return <View/>

    return <ActivityIndicator size={props.isSmallLoading ? 'small' : 'large'} color={color.primaryColor} style={{marginTop: 10}} />
  }

  return <View ref={ref}>
            <Animated.FlatList
              {...props}
              ref={ref => !!props.setFlatListRef && props.setFlatListRef(ref)}
              onEndReachedThreshold={0.3}
              onEndReached={() => !!props.endReachedAction && onEndReached()}
              contentContainerStyle={!!props.customContentContainerStyle ? props.customContentContainerStyle : {paddingHorizontal: screenHorizontalPadding, paddingBottom: 78}}
              ListFooterComponent={!!props.endReachedAction && renderListFooter()}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[color.primaryColor]} style={{marginTop: 60}} progressViewOffset={props.refreshControllOffset || 0} />}
              onMomentumScrollBegin = {() => {onEndReachedCalledDuringMomentum.current = false}}
            />
        </View>
})

export default CustomFlatListComponent