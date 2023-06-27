import React, {useState} from 'react'
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Text } from '../../components';
import { Divider } from 'react-native-paper';
import Quiz from '../../models/Quiz';
import { useDispatch } from 'react-redux';
import { setCurrentQuiz } from '../../redux/features/quiz/quizSlice';
import CheckboxGroup from '../MajorSelection/components/CheckboxGroup';
import SearchableHeader from '../../components/shared/searchableHeaders/SearchableHeader'
import FooterBar from "../../components/footer/FooterBar";
import Job from '../../models/Job';

const JobSelectMultipleScreen = ({route, navigation}) => {
  const [textSearch, setTextSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(0);
  const [errorMsg, setErrorMsg] = useState('')
  const currentQuiz = Quiz.findByUuid(route.params.quizUuid);
  const dispatch = useDispatch();
  let formRef = React.useRef()
  const data = Job.findAllByPersonalityTypes(currentQuiz.topPersonalityTypes).map(x => ({ name: x.name, value: x.code }))

  const handleSubmit = () => {
    if (selectedItem == 0 || selectedItem > 3)
      return setErrorMsg(selectedItem == 0 ? "សូមជ្រើសរើសយ៉ាងតិច 1" : "សូមជ្រើសរើសយ៉ាងច្រើន 3")

    Quiz.write(()=> {
      currentQuiz.jobCodeSelections = formRef.current?.getSelectedValues();
      dispatch(setCurrentQuiz(currentQuiz));
    })
    navigation.navigate('JobSelectOneScreen', {quizUuid: currentQuiz.uuid});
  }

  return (
    <React.Fragment>
      <SearchableHeader title="ជម្រើសអាជីពការងារ" placeholder="ស្វែងរកអាជីពការងារ"
        searchedText={textSearch} setSearchedText={(text) => setTextSearch(text)}
      />
      <View style={{margin: 16, flex: 1, backgroundColor: '#fff', borderRadius: 4, overflow: 'hidden'}}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={{padding: 16}}>
            <Text>ចូរជ្រើសរើសអាជីពការងារដែលអ្នកពេញចិត្តក្នុងការបន្តការសិក្សានាពេលអនាគត យ៉ាងច្រើនបំផុត៣មុខជំនាញ៖</Text>
            <Text>{selectedItem}/3</Text>
          </View>
        </TouchableWithoutFeedback>

        <Divider />

        <View style={{flex: 1}}>
          <CheckboxGroup
            ref={formRef}
            name={"jobs"}
            options={data.filter(job => job.name.includes(textSearch))}
            textSearch={textSearch}
            errorMessage={errorMsg}
            updateSelectedItem={(items) => setSelectedItem(items)}
            type='job'
          />
        </View>
      </View>

      <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={handleSubmit} />
    </React.Fragment>
  )
}

export default JobSelectMultipleScreen
