import React, {Component} from 'react';
import {
  Text,
  ScrollView,
  View,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  ThemeProvider,
  Toolbar,
  COLOR,
  Avatar,
  Icon,
} from 'react-native-material-ui';

import User from '../utils/user';

const uiTheme = {
    palette: {
        primaryColor: COLOR.green500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

class Dashboard extends Component {
  static navigationOptions = {
    drawerLabel: 'ត្រីវិស័យ',
    drawerIcon: ({ tintColor }) => (
      <ThemeProvider uiTheme={{}}>
        <Icon name="home" />
      </ThemeProvider>
    ),
  };

  constructor(props, context) {
    super(props, context);

    this.state = {
      active: 'Today',
    };
  }

  navigate() {
    this.props.navigation.navigate('DrawerOpen'); // open drawer
  }

  logout() {
    User.logout();
    this.props.screenProps.rootNavigation.dispatch({type: 'Navigation/RESET', routeName: 'Home', index: 0, actions: [{ type: 'Navigation/NAVIGATE', routeName:'Login'}]})
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <Toolbar
            leftElement="menu"
            centerElement="Dashboard"
            searchable={{}}
            isSearchActive={false}
            rightElement={
              <TouchableOpacity style={styles.avatarContainer}>
                <Avatar text="A" size={30} />
              </TouchableOpacity>
            }
            onLeftElementPress={() => this.props.navigation.navigate('DrawerOpen')}
          />

          <ScrollView style={styles.scrollContainer}>
            <Text>hello</Text>
            <Button title='ចាកចេញ' onPress={this.logout.bind(this)}/>
          </ScrollView>
        </View>
      </ThemeProvider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scrollContainer: {
  },
  avatarContainer: {
    marginRight: 20
  }
});

export default Dashboard;
