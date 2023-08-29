import React from 'react';
import { View } from 'react-native';
import { Card, Divider } from 'react-native-paper';

import Text from '../Text';

const FormCard = ({question, children}) => {
  const cardStyle = () => {
    if (!question.relevant) return  {marginTop: 16}

    return {borderTopLeftRadius: 0, borderTopRightRadius: 0, marginTop: -5}
  }

  return (
    <Card style={cardStyle()}>
      <Card.Content>
        <View>
          <Text>{question.name}</Text>
          <Divider style={{marginVertical: 8}} />
          {children}
        </View>
      </Card.Content>
    </Card>
  )
}

export default FormCard;