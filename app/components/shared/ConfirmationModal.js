import React from 'react';
import {StyleSheet} from 'react-native';
import {Modal, Portal} from 'react-native-paper';

import ConfirmationModalButtons from './ConfirmationModals/ConfirmationModalButtons';
import {cardBorderRadius} from '../../constants/component_constant';

const ConfirmationModal = (props) => {
  return (
    <Portal>
      <Modal
        visible={props.visible}
        onDismiss={props.onDismiss}
        contentContainerStyle={styles.container}
      >
        {props.message()}
        <ConfirmationModalButtons
          onLeftPress={() => props.onLeftPress()}
          onRightPress={() => props.onRightPress()}
          leftButtonLabel={props.leftButtonLabel}
          rightButtonLabel={props.rightButtonLabel}
        />
      </Modal>
    </Portal>
  )
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: cardBorderRadius,
    justifyContent: 'flex-start',
    padding: 24,
    paddingBottom: 4,
    width: '90%',
  }
});

export default ConfirmationModal