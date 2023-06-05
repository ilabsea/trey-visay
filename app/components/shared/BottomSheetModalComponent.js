import React, { useCallback, useState } from 'react'
import { StyleSheet } from 'react-native'
import {
  BottomSheetModal,
  BottomSheetBackdrop,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet'

import Color from '../../themes/color'
import {defaultBottomSheetSnapPoints} from '../../constants/modal_constant'

const {useImperativeHandle} = React

const BottomSheetModalComponent = (props, ref) => {
  const modalRef = React.useRef()
  const [content, setContent] = useState(null)
  const [snapPoints, setSnapPoints] = useState(props.snapPoints || defaultBottomSheetSnapPoints)

  const present = () => {
    modalRef.current?.present()
  }

  const dismiss = () => {
    modalRef.current?.dismiss()
  }

  useImperativeHandle(ref, () => ({
    setContent,
    setSnapPoints,
    present,
    dismiss,
  }))

  const renderBackdrop = useCallback( props => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={-1}
      appearsOnIndex={0}
    />
  ), []);

  return (
    <BottomSheetModal
      ref={modalRef}
      enablePanDownToClose={true}
      backdropComponent={renderBackdrop}
      backgroundStyle={{backgroundColor: Color.whiteColor}}
      snapPoints={snapPoints}
      onDismiss={() => !!props.onDismiss && props.onDismiss()}
      onChange={(index) => !!props.onChange && props.onChange(index)}
      handleIndicatorStyle={{backgroundColor: Color.paleBlackColor}}
    >
      <BottomSheetScrollView style={styles.contentContainer}>
        { content }
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
};

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    flexGrow: 1,
  },
});

export default  React.forwardRef(BottomSheetModalComponent);