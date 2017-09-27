/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
// import { AppRegistry } from 'react-native';
// import { Text, View } from 'react-native';
// // import App from './app/app';
// import { StackNavigator } from 'react-navigation';

// export default class TreyVisay extends Component {
//   static navigationOptions = {
//     title: 'Welcome',
//   };

//   render() {
//     return (
//       <App></App>
//     );
//   }
// }

// Sources:
// https://reactnavigation.org/docs/intro/headers

import React from 'react';
import {
  AppRegistry,
  Text,
  View,
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Login  from './app/roots/login';
import Register  from './app/roots/register';
import Home  from './app/screens/home';
import ProfileForm  from './app/screens/profile_form';

export default  TreyVisay = StackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  Home: { screen: Home },
  ProfileForm: { screen: ProfileForm },
});

AppRegistry.registerComponent('TreyVisay', () => TreyVisay);








// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';

// // import schema from './app/models/dog';
// // import getDogs from './app/models/dog';
// // const {getMyDogs} = getDogs

// // import Queries from './app/data/queries';
// import realm from './app/schema';

// const Realm = require('realm');


// class TreyVisay extends Component {
//   constructor(props) {
//     super(props);
//     // let modelAData = Queries.getAllFromUser()
//     // realm.deleteAll();
//     this.dogs = realm.objects('Dog');
//     if (this.dogs.length < 1) {
//       realm.write(() => {
//         realm.deleteAll();
//         realm.create('Dog', {name: 'Rex'});
//       });
//     }


//     this.state = { realm: null };
//   }

//   componentWillMount() {
//     alert(realm.objects('Dog').length);

//     // this.setState({ realm });

//     // this.setState(previousState => {
//     //   return { showText: !previousState.showText };
//     // });

//     // Realm.open({
//     //   schema: [{name: 'Dog', properties: {name: 'string'}}]
//     // }).then(realm => {
//     //   realm.write(() => {
//     //     realm.create('Dog', {name: 'Rex'});
//     //   });
//     //   this.setState({ realm });
//     // });
//     // getMyDogs().then((dogs) =>{
//     //   alert(dogs);
//     // })
//   }

//   render() {
//     const info = this.state.realm
//       ? 'Number of dogs in this Realm: ' + this.state.realm.objects('Dog').length
//       : 'Loading...';

//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           {info}
//         </Text>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// AppRegistry.registerComponent('TreyVisay', () => TreyVisay);
