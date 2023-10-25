import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {Card} from 'react-native-paper';

import Color from '../../themes/color';
import StartQuizButton from './StartQuizButton';
import ButtonList from '../../components/list/button_list';
import Text from '../Text';


const QuizHomeButtonsComponent = (props) => {
  const renderAboutItem = () => {
    return (
      <View style={{marginVertical: 12, backgroundColor: 'white'}}>
        <ButtonList
          hasLine={true}
          iconColor={Color.blue}
          icon={<Icon name='information-variant' size={25} color={Color.blue} />}
          onPress={() => props.onPressAbout()}
          title={props.aboutButtonLabel} />
      </View>
    )
  }

  return (
    <React.Fragment>
      { renderAboutItem() }

      <Card style={{elevation: 0, borderRadius: 0}}>
        <Card.Content style={{paddingTop: 8}}>
          <Text>{props.welcomeLabel}</Text>
          <Text>{props.introLabel}</Text>

          <View style={{width: '100%'}}>
            <StartQuizButton type={props.type} />
            {props.resumeQuizButton}
          </View>
        </Card.Content>
      </Card>
    </React.Fragment>
  )
}

export default QuizHomeButtonsComponent;