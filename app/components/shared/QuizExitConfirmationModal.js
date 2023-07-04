import React from 'react'
import { useDispatch } from 'react-redux';

import Text from '../Text';
import ConfirmationModal from './ConfirmationModal';
import {reset} from '../../hooks/RootNavigation'
import { resetAnswer as resetHollandAnswer } from '../../redux/features/quiz/hollandSlice';
import { resetAnswer as resetIntelligentAnswer } from '../../redux/features/quiz/intelligentSlice';

const QuizExitConfirmationModal = (props) => {
  const dispatch = useDispatch();

  const message = (
    <React.Fragment>
      <Text>រាល់ចម្លើយដែលអ្នកបានជ្រើសរើសនឹងត្រូវបាត់បង់នៅពេលចាក់ចេញ។</Text>
      <Text style={{marginTop: 12}}>តើអ្នកពិតជាចង់ចាកចេញពីការតេស្តនេះមែន ឬទេ?</Text>
    </React.Fragment>
  )

  const returnHome = () => {
    props.closeModal();
    dispatch(props.type == 'hollandTest' ? resetHollandAnswer() : resetIntelligentAnswer());
    reset({routeName: 'HomeTab', params: {}})
  }

  return <ConfirmationModal
            visible={props.visible}
            leftButtonLabel='ទេ'
            rightButtonLabel='បាទ/ចាស'
            onLeftPress={() => props.closeModal()}
            onRightPress={() => returnHome()}
            message={() => message}
            onDismiss={() => props.closeModal()}
          />
}

export default QuizExitConfirmationModal;