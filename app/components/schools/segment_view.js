import React, { Component } from 'react';
import {
  Container,
  Header,
  Left,
  Title,
  Body,
  Right,
  Button,
  Icon,
  Segment,
  Content,
  Text
} from 'native-base';

export default class SegmentView extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <Container>
        <Header hasSegment>
          <Left>
            <Button transparent>
              <Icon name="arrow-back" />
            </Button>
          </Left>
          <Body>
            <Title>គ្រឹះស្ថានសិក្សា</Title>
          </Body>
          <Right>
            <Button transparent></Button>
          </Right>
        </Header>
        <Segment>
          <Button first active={this.props.activePage == 1} onPress={()=>this.props.setContent(1)}>
            <Text>សាលារដ្ឋ</Text>
          </Button>
          <Button active={this.props.activePage == 2} onPress={()=>this.props.setContent(2)}>
            <Text>សាលាឯកជន</Text>
          </Button>
          <Button active={this.props.activePage == 3} last onPress={()=>this.props.setContent(3)}>
            <Text>អង្គការ</Text>
          </Button>
        </Segment>
        <Content>
          { this.props.children }
        </Content>
      </Container>
    );
  }
}
