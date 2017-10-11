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
  Avatar
} from 'react-native-material-ui';

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
  constructor(props, context) {
    super(props, context);

    this.state = {
      active: 'Today',
    };
  }

  static navigationOptions = {
    title: 'Menu',
  };

  navigate() {
    this.props.navigation.navigate('DrawerOpen'); // open drawer
  }

  render() {
    return (
      <ThemeProvider uiTheme={uiTheme}>
        <View style={styles.container}>
          <Toolbar
            leftElement="menu"
            centerElement="Dashboard"
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
