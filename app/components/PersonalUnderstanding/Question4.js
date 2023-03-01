import React from 'react';
import { View } from 'react-native';
import CheckboxGroup from '../CheckboxGroup';
import Text from '../Text';
import { Divider, Card } from 'react-native-paper';
import Question from '../../data/json/personal_understanding.json';

import { useSelector, useDispatch } from 'react-redux'
import { setQuizOneAnswer, resetQuizOne } from '../../redux/features/careerAssessment/quizOneSlice';

export default function Question4(props) {
  const { input, meta, ...checkboxProps } = props;
  const dispatch = useDispatch();
  const quizOneAnswer = useSelector((state) => state.quizOneAnswer.value);
  const questKey = 'everTalkedWithAnyoneAboutCareer';

  const onChange = (selected) => {
    let params = {};
    params['characteristicEntries'] = selected;

    dispatch(setQuizOneAnswer(params));
  }

  return (
    <Card style={{marginBottom: 16}}>
      <Card.Content>
        <Text>{Question[questKey]}</Text>

        <Divider style={{marginVertical: 8}} />

        <CheckboxGroup
          selected={ quizOneAnswer['characteristicEntries'] || [] }
          onSelect={ onChange }
          options={
            [
              { value: 1, label: 'ឳពុកម្តាយ' },
              { value: 2, label: 'បងប្អូន' },
              { value: 3, label: 'ក្រុមប្រឹក្សាកុមារ' },
              { value: 4, label: 'នាយកសាលា' },
              { value: 5, label: 'គ្រូ' },
              { value: 6, label: 'មិត្តភក្តិ'}
            ]
          }
        />
      </Card.Content>
    </Card>
  )
}
