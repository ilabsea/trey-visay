import React from 'react';
import {Portal, Dialog} from 'react-native-paper';

import ConfirmationModalButtons from './ConfirmationModals/ConfirmationModalButtons';
import {cardBorderRadius} from '../../constants/component_constant';

const ConfirmationModal = (props) => {
  return (
    <Portal>
      <Dialog visible={props.visible} style={{borderRadius: cardBorderRadius}}>
        <Dialog.Content>{props.message()}</Dialog.Content>
        <Dialog.Actions style={{paddingHorizontal: 24, paddingBottom: 16}}>
          <ConfirmationModalButtons
            onLeftPress={() => props.onLeftPress()}
            onRightPress={() => props.onRightPress()}
            leftButtonLabel={props.leftButtonLabel}
            rightButtonLabel={props.rightButtonLabel}
          />
        </Dialog.Actions>
      </Dialog>
    </Portal>
  )
}

export default ConfirmationModal