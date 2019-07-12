import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';

import ScrollableHeader from '../../components/scrollable_header';
import BackButton from '../../components/shared/back_button';

import { FontSetting } from '../../assets/style_sheets/font_setting';

export default class TermsCondition extends Component {
  constructor(props) {
    super(props);
  }

  _renderContent = () => {
    return (
      <View style={{margin: 20}}>
        <Text style={styles.header}>Privacy Policy</Text>
        <Text style={styles.paragraph}>Your privacy is important to us. It is TreyVisay's policy to respect your privacy regarding any information we may collect from you across our website, <Text style={styles.paragraph}>http://treyvisay.moeys.gov.kh</Text>, and other sites we own and operate.</Text>
        <Text style={styles.paragraph}>We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.</Text>
        <Text style={styles.paragraph}>We only retain collected information for as long as necessary to provide you with your requested service. What data we store, we’ll protect within commercially acceptable means to prevent loss and theft, as well as unauthorised access, disclosure, copying, use or modification.</Text>
        <Text style={styles.paragraph}>We don’t share any personally identifying information publicly or with third-parties, except when required to by law.</Text>
        <Text style={styles.paragraph}>Our website may link to external sites that are not operated by us. Please be aware that we have no control over the content and practices of these sites, and cannot accept responsibility or liability for their respective privacy policies.</Text>
        <Text style={styles.paragraph}>You are free to refuse our request for your personal information, with the understanding that we may be unable to provide you with some of your desired services.</Text>
        <Text>Your continued use of our website will be regarded as acceptance of our practices around privacy and personal information. If you have any questions about how we handle user data and personal information, feel free to contact us.</Text>
      </View>
    )
  }

  render() {
    let title = 'Terms & Condition';
    return (
      <ScrollableHeader
        style={{backgroundColor: '#fff'}}
        renderContent={ this._renderContent }
        renderNavigation={ () => <BackButton navigation={this.props.navigation}/> }
        title={title}
        largeTitle={title}
      />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    fontWeight: 'bold',
    fontSize: FontSetting.title,
    marginBottom: 16
  },
  paragraph: {
    marginBottom: 16
  }
});
