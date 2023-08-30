import React, {useState} from 'react'
import { View } from 'react-native'
import Quiz from '../../models/Quiz';
import { useDispatch } from 'react-redux';
import { setCurrentQuiz } from '../../redux/features/quiz/quizSlice';
import CheckboxGroup from '../MajorSelection/components/CheckboxGroup';
import SearchableHeader from '../../components/shared/searchableHeaders/SearchableHeader'
import FooterBar from "../../components/footer/FooterBar";
import Job from '../../models/Job';

const JobSelectMultipleScreen = ({route, navigation}) => {
  const [textSearch, setTextSearch] = useState('');
  const [errorMsg, setErrorMsg] = useState('')
  const currentQuiz = Quiz.findByUuid(route.params.quizUuid);
  const dispatch = useDispatch();
  let formRef = React.useRef()
  const data = Job.findAllByPersonalityTypes(currentQuiz.topPersonalityTypes).map(x => ({ name: x.name, value: x.code }))

  const handleSubmit = () => {
    if (formRef.current?.getSelectedValues().length == 0 || formRef.current?.getSelectedValues().length > 3)
      return setErrorMsg(formRef.current?.getSelectedValues().length == 0 ? "សូមជ្រើសរើសយ៉ាងតិច 1" : "សូមជ្រើសរើសយ៉ាងច្រើន 3")

    Quiz.write(()=> {
      currentQuiz.jobCodeSelections = formRef.current?.getSelectedValues();
      dispatch(setCurrentQuiz(currentQuiz));
    })
    navigation.navigate('JobSelectOneScreen', {quizUuid: currentQuiz.uuid});
  }

  const onSetTextSearch = (text) => {
    setTextSearch(text);
    !text && formRef.current?.resetListIndices();
  }

  return (
    <React.Fragment>
      <SearchableHeader title="ជម្រើសអាជីពការងារ" placeholder="ស្វែងរកអាជីពការងារ"
        searchedText={textSearch} setSearchedText={(text) => onSetTextSearch(text)}
      />
      <View style={{margin: 16, flex: 1, backgroundColor: '#fff', borderRadius: 4, overflow: 'hidden'}}>
        <CheckboxGroup
          ref={formRef}
          options={data.filter(job => job.name.includes(textSearch))}
          textSearch={textSearch}
          errorMessage={errorMsg}
          type='job'
          headerLabel={`ចូរជ្រើសរើសអាជីពការងារដែលអ្នកពេញចិត្តក្នុងការបន្តការសិក្សានាពេលអនាគត យ៉ាងច្រើនបំផុត 3មុខរបរក្នុងចំណោម ${data.length}មុខរបរ៖ `}
        />
      </View>

      <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={handleSubmit} />
    </React.Fragment>
  )
}

export default JobSelectMultipleScreen
