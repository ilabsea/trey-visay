import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import {backgroundColors} from '../../themes/color';
import {screenHorizontalPadding, gradientScrollViewBigPaddingBottom} from '../../constants/component_constant';

const GradientScrollViewComponent = (props) => {
  return (
    <View
      style={{flexGrow: 1, width: '100%', backgroundColor: '#DADADA'}}
    >
      {props.header}

      { props.isNotScrollView ?
          props.body
        :
        <ScrollView contentContainerStyle={[styles.scrollView, props.scrollViewStyle]}
          nestedScrollEnabled={true}
          scrollEnabled={props.scrollable ?? true}
          scrollEventThrottle={16}
          onScroll={(event) => !!props.onScroll && props.onScroll(event)}
        >
          {props.body}
        </ScrollView>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: screenHorizontalPadding,
    // paddingBottom: gradientScrollViewBigPaddingBottom
  }
});

export default GradientScrollViewComponent;
