import React, {useState} from 'react'
import { View, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { Text } from '../../components';
import { Card, Divider } from 'react-native-paper';
import listJobs from './json/list_job';
import Quiz from '../../models/Quiz';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentQuiz } from '../../redux/features/quiz/quizSlice';
import CheckboxGroup from '../MajorSelection/components/CheckboxGroup';
import SearchableHeader from '../../components/shared/searchableHeaders/SearchableHeader'
import FooterBar from "../../components/footer/FooterBar";

const JobSelectMultipleScreen = ({route, navigation}) => {
  // const currentQuiz = useSelector((state) => state.currentQuiz.value);
  const [textSearch, setTextSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(0);
  const [errorMsg, setErrorMsg] = useState('')
  const currentQuiz = route.params.quiz;
  const dispatch = useDispatch();
  let formRef = React.useRef()

  const handleSubmit = () => {
    if (selectedItem == 0 || selectedItem > 3)
      return setErrorMsg(selectedItem == 0 ? "សូមជ្រើសរើសយ៉ាងតិច 1" : "សូមជ្រើសរើសយ៉ាងច្រើន 3")

    Quiz.write(()=> {
      currentQuiz.jobOptions = formRef.current?.getSelectedValues();
      dispatch(setCurrentQuiz(currentQuiz));
    })
    navigation.navigate('JobSelectOneScreen', {quiz: currentQuiz});
  }

  return (
    <React.Fragment>
      <SearchableHeader title="ជម្រើសអាជីពការងារ" placeholder="ស្វែងរកអាជីពការងារ"
        searchedText={textSearch} setSearchedText={(text) => setTextSearch(text)}
      />
      <View style={{padding: 16, flexGrow: 1}}>
        <Card>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={{padding: 16}}>
              <Text>ចូរជ្រើសរើសអាជីពការងារដែលអ្នកពេញចិត្តក្នុងការបន្តការសិក្សានាពេលអនាគត យ៉ាងច្រើនបំផុត៣មុខជំនាញ៖</Text>
              <Text>{selectedItem}/3</Text>
            </View>
          </TouchableWithoutFeedback>
          <Divider />
          <CheckboxGroup
            ref={formRef}
            name={"jobs"}
            options={listJobs.filter(job => job.name.includes(textSearch))}
            textSearch={textSearch}
            errorMessage={errorMsg}
            updateSelectedItem={(items) => setSelectedItem(items)}
          />
        </Card>
      </View>
      <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={handleSubmit} />
    </React.Fragment>
  )
}

export default JobSelectMultipleScreen