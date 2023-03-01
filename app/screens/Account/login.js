import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentUser } from '../../redux/features/user/userSlice';
import { reset } from '../StackNav/RootNavigation.js';
import SigninForm from './SigninForm';
import { StatusBar } from 'react-native';
import { Colors } from '../../assets/style_sheets/main/colors';

export default function Login({route, navigation}) {
  const currentUser = useSelector((state) => state.currentUser.value);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     if (Platform.OS == 'android') {
  //       StatusBar.setBackgroundColor(Colors.blueStatusBar);
  //       StatusBar.setBarStyle('light-content');
  //     }
  //   });

  //   return unsubscribe;
  // }, [navigation]);

  const _isUserInfoCompleted = (user) => {
    return !!user && !!user.dateOfBirth;
  }

  const handleSignedIn = (user) => {
    dispatch(setCurrentUser(user));

    if (!_isUserInfoCompleted(user)) {
      return reset({ routeName: 'ProfileForm', params: {from: route.params.from} })
    }

    reset({ routeName: route.params.from });
  }

  return (
    <SigninForm
      route={route}
      handleSignedIn={handleSignedIn}
    />
  )
}
