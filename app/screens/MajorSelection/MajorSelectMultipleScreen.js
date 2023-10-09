import React, { useState } from 'react'
import { View } from 'react-native'
import Quiz from '../../models/Quiz';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentQuiz } from '../../redux/features/quiz/quizSlice';
import CheckboxGroup from './components/CheckboxGroup';
import SearchableHeader from '../../components/shared/searchableHeaders/SearchableHeader'
import FooterBar from "../../components/footer/FooterBar";
import Major from '../../models/Major';
import useAuth from "../../auth/useAuth";

const MajorSelectMultipleScreen = ({route, navigation}) => {
  const [textSearch, setTextSearch] = useState('');
  const [errorMsg, setErrorMsg] = useState('')
  const currentQuiz = Quiz.findByUuid(route.params.quizUuid);
  const dispatch = useDispatch();
  const {user} = useAuth();
  const data = Major.findAllParentByGradeAndPersonalityTypes(user.grade, user.otherGrade, currentQuiz.topPersonalityTypes).map(x => ({ name: x.name, value: x.code }))

  let formRef = React.useRef()

  const handleSubmit = () => {
    if (formRef.current?.getSelectedValues().length == 0 || formRef.current?.getSelectedValues().length > 3)
      return setErrorMsg(formRef.current?.getSelectedValues().length == 0 ? "សូមជ្រើសរើសយ៉ាងតិច 1" : "សូមជ្រើសរើសយ៉ាងច្រើន 3")

    Quiz.write(()=> {
      currentQuiz.majorCodeSelections = formRef.current?.getSelectedValues();
      dispatch(setCurrentQuiz(currentQuiz));
    })
    navigation.navigate('MajorSelectOneScreen', {quizUuid: currentQuiz.uuid});
  }

  const onSetTextSearch = (text) => {
    setTextSearch(text);
    !text && formRef.current?.resetListIndices();
  }

  return (
    <React.Fragment>
      <SearchableHeader title="ជម្រើសជំនាញកម្រិតឧត្តមសិក្សា" placeholder="ស្វែងរកជំនាញកម្រិតឧត្តមសិក្សា"
        searchedText={textSearch} setSearchedText={(text) => onSetTextSearch(text)}
      />
      <View style={{margin: 16, flex: 1, backgroundColor: '#fff', borderRadius: 4, overflow: 'hidden'}}>
        <CheckboxGroup
          ref={formRef}
          options={data.filter(major => major.name.includes(textSearch))}
          textSearch={textSearch}
          errorMessage={errorMsg}
          type='major'
          headerLabel={`ចូរជ្រើសរើសមុខជំនាញដែលអ្នកពេញចិត្តក្នុងការបន្តការសិក្សានាពេលអនាគតយ៉ាងច្រើនបំផុត 3មុខជំនាញក្នុងចំណោម ${data.length}មុខជំនាញ៖ `}
        />
      </View>

      <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={handleSubmit} />
    </React.Fragment>
  )
}

export default MajorSelectMultipleScreen
