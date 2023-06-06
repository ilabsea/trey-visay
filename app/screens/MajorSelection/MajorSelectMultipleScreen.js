import React, { useState } from 'react'
import { View } from 'react-native'
import { Text } from '../../components';
import { Divider } from 'react-native-paper';
import Quiz from '../../models/Quiz';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentQuiz } from '../../redux/features/quiz/quizSlice';
import CheckboxGroup from './components/CheckboxGroup';
import SearchableHeader from '../../components/shared/searchableHeaders/SearchableHeader'
import FooterBar from "../../components/footer/FooterBar";
import useMajor from '../../hooks/useMajor';

const MajorSelectMultipleScreen = ({route, navigation}) => {
  const [textSearch, setTextSearch] = useState('');
  const [selectedItem, setSelectedItem] = useState(0);
  const [errorMsg, setErrorMsg] = useState('')
  const currentQuiz = route.params.quiz;
  const dispatch = useDispatch();
  const { data, loading } = useMajor(currentQuiz);

  let formRef = React.useRef()

  const handleSubmit = () => {
    if (selectedItem == 0 || selectedItem > 3)
      return setErrorMsg(selectedItem == 0 ? "សូមជ្រើសរើសយ៉ាងតិច 1" : "សូមជ្រើសរើសយ៉ាងច្រើន 3")

    Quiz.write(()=> {
      currentQuiz.majorOptions = formRef.current?.getSelectedValues();
      dispatch(setCurrentQuiz(currentQuiz));
    })
    navigation.navigate('MajorSelectOneScreen', {quiz: currentQuiz});
  }

  return (
    <React.Fragment>
      <SearchableHeader title="ជម្រើសជំនាញកម្រិតឧត្តមសិក្សា" placeholder="ស្វែងរកជំនាញកម្រិតឧត្តមសិក្សា"
        searchedText={textSearch} setSearchedText={(text) => setTextSearch(text)}
      />
      <View style={{margin: 16, flex: 1, backgroundColor: '#fff', borderRadius: 4, overflow: 'hidden'}}>
        <View style={{padding: 16}}>
          <Text>ចូរជ្រើសរើសមុខជំនាញដែលអ្នកពេញចិត្តក្នុងការបន្តការសិក្សានាពេលអនាគតយ៉ាងច្រើនបំផុត ៣មុខជំនាញ៖ </Text>
          <Text>{selectedItem}/3</Text>
        </View>
        <Divider />
        <View style={{flex: 1}}>
          <CheckboxGroup
            ref={formRef}
            name={"majors"}
            options={data.filter(major => major.name.includes(textSearch))}
            errorMessage={errorMsg}
            updateSelectedItem={(items) => setSelectedItem(items)}
          />
        </View>
      </View>
      <FooterBar icon='keyboard-arrow-right' text='បន្តទៀត' onPress={handleSubmit} />
    </React.Fragment>
  )
}

export default MajorSelectMultipleScreen