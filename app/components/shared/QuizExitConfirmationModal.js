import React from 'react'
import { useDispatch, useSelector } from 'react-redux';

import Text from '../Text';
import ConfirmationModal from './ConfirmationModal';
import {reset} from '../../hooks/RootNavigation'
import { resetAnswer as resetHollandAnswer } from '../../redux/features/quiz/hollandSlice';
import { resetAnswer as resetIntelligentAnswer } from '../../redux/features/quiz/intelligentSlice';
import {setCurrentQuiz} from '../../redux/features/quiz/intelligentQuizSlice';
import IntelligentQuiz from '../../models/IntelligentQuiz';

const QuizExitConfirmationModal = (props) => {
  const dispatch = useDispatch();
  const currentIntelligentQuiz = useSelector((state) => state.currentIntelligentQuiz.value);

  const message = (
    <React.Fragment>
      <Text>រាល់ចម្លើយដែលអ្នកបានជ្រើសរើសនឹងត្រូវបាត់បង់នៅពេលចាក់ចេញ។</Text>
      <Text style={{marginTop: 12}}>តើអ្នកពិតជាចង់ចាកចេញពីការតេស្តនេះមែន ឬទេ?</Text>
    </React.Fragment>
  )

  const resetIntelligentQuiz = () => {
    if (!!currentIntelligentQuiz) {
      IntelligentQuiz.write(() => {
        IntelligentQuiz.delete(currentIntelligentQuiz.uuid);
      })
    }
    dispatch(resetIntelligentAnswer());
    dispatch(setCurrentQuiz(null))
  }

  const returnHome = () => {
    props.closeModal();
    if (props.type == 'hollandTest')
      dispatch(resetHollandAnswer());
    else
      resetIntelligentQuiz()

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