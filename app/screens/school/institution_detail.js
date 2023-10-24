import React, {Component} from 'react';
import { StyleSheet, View } from 'react-native';

import { Colors } from '../../assets/style_sheets/main/colors';
import ListItem from '../../components/schools/list_item';
import ScrollableHeader from '../../components/scrollable_header';
import InstitutionDetailProfile from '../../components/institutionDetails/InstitutionDetailProfile';
import InstitutionDetailLogo from '../../components/institutionDetails/InstitutionDetailLogo';
import InstitutionDetailDepartment from '../../components/institutionDetails/InstitutionDetailDepartment';
import visitService from '../../services/visit_service';
import School from '../../models/School';

const PROFILE_SIZE = 120;

export default class InstitutionDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      school: School.findById(props.route.params.school_id)
    }
  }

  componentDidMount() {
    visitService.recordVisitDetailScreen('school', this.state.school.id)
  }

  renderContact() {
    let school = this.state.school;
    if(!school.id){
      school = {
        address: 'មិនមាន',
        phoneNumbers: 'មិនមាន',
        faxes: 'មិនមាន',
        emails: 'មិនមាន',
        websiteOrFacebook: []
      }
    }

    return (
      <View style={{ paddingLeft: 8 }}>
        <ListItem contact={{data: school.address, icon: 'map-marker', iconSize: 28}} />
        <ListItem contact={{data: school.phoneNumbers, icon: 'phone'}} />
        <ListItem contact={{data: school.faxes, icon: 'fax', iconSize: 24}}/>
        <ListItem contact={{data: school.emails, icon: 'envelope', isLink: true, isEmail: true, iconSize: 24}} />
        <ListItem contact={{data: school.websiteOrFacebook, icon: 'globe', isLink: true}} />
      </View>
    )
  }

  _renderProfile() {
    return <InstitutionDetailProfile
              profileSize={PROFILE_SIZE}
              name={this.state.school.name}
              category={this.state.school.category}
              schoolLogo={this.state.school.logo}
           />
  }

  _renderLogo() {
    return <View style={styles.topLogo}>
              <InstitutionDetailLogo profileSize={PROFILE_SIZE} schoolLogo={this.state.school.logo}/>
           </View>
  }

  renderContent = () => {
    return(
      <View style={[{backgroundColor: 'white', marginBottom: 12}]}>
        { this._renderProfile() }
        { this.renderContact() }
        <InstitutionDetailDepartment school={this.state.school} />
      </View>
    )
  }

  render() {
    return (
      <ScrollableHeader
        backgroundColor={Colors.blue}
        textColor={'#fff'}
        statusBarColor={Colors.blue}
        barStyle={'light-content'}
        headerStyle={{borderBottomWidth: 0}}
        renderContent={ this.renderContent }
        buttonColor={'#fff'}
        title={this.state.school.name}
        renderLogo={ () => this._renderLogo() }
      />
    )
  }
}

const styles = StyleSheet.create({
  topLogo: {
    height: PROFILE_SIZE/2,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});
