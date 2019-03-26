import React, { Component } from 'react';

import AwesomeIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../../assets/style_sheets/profile_form';

import { Container, Content, ListItem, Text, Left, Body } from 'native-base';

export default class PersonalityAssessmentHistory extends Component {
  render() {
    return (
      <Container>
        <Content>
          { this.props.navigation.state.params.entries.map((entry, index) => {
            return (
              <ListItem
                key={index}
                icon>
                <Left>
                  <AwesomeIcon name='check-circle' size={24} color='#4caf50' />
                </Left>
                <Body>
                  <Text>{entry.name_km}</Text>
                </Body>
              </ListItem>
            )
          })}
        </Content>
      </Container>
    );
  }
}
