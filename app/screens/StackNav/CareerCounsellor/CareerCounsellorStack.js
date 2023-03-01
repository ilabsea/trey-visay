import React, { Component } from 'react';
import { Platform, StatusBar } from 'react-native';

import CareerCategoriesScreen from '../../Careers/CategoriesScreen';
import ShowCareerCategoryScreen from '../../Careers/ShowCategoryScreen';
import CareerDetailScreen from '../../Careers/DetailScreen';

import CareerCounsellorScreen from '../../CareerCounsellor/CareerCounsellor';
import AboutCareerCounsellor from '../../CareerCounsellor/AboutCareerCounsellor';

import PersonalUnderstandingForm from '../../CareerTest/PersonalUnderstanding/PersonalUnderstandingForm';
import SubjectScreen from '../../CareerTest/Subject/subject_screen';
import PersonalityScreen from '../../CareerTest/Personality/personality_screen';
import PersonalityJobsScreen from '../../CareerTest/PersonalityJobs/personality_jobs_screen';
import SummaryScreen from '../../CareerTest/FavoriteJob/summary_screen';
import RecommendationScreen from '../../CareerTest/Recommendation/recommendation_screen';
import GoalScreen from '../../CareerTest/Goal/goal_screen';
import ContactScreen from '../../CareerTest/Contact/contact_screen';

import InstitutionDetail from '../../school/institution_detail';

import GameHistoryScreen from '../../GameHistory/game_history_screen';
import PersonalUnderstandingReport from '../../GameHistory/personal_understanding_report';
import SubjectReport from '../../GameHistory/subject_report';
import PersonalityJobsReport from '../../GameHistory/personality_jobs_report';
import StudentPersonalityReport from '../../GameHistory/student_personality_report';
import RecommendationReport from '../../GameHistory/recommendation_report';
import SchoolListScreen from '../../GameHistory/school_list';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function CareerCounsellorStack() {
  return(
    <Stack.Navigator screenOptions={{ }} initialRouteName='CareerCounsellorScreen'>
      <Stack.Screen name="CareerCounsellorScreen" component={CareerCounsellorScreen} options={{headerShown: false}} />
      <Stack.Screen name="PersonalUnderstandingFormScreen" component={PersonalUnderstandingForm} options={{headerShown: false}} />
      <Stack.Screen name="ShowCareerCategoryScreen" component={ShowCareerCategoryScreen} options={({navigation, route}) => ({
        title: route.params.title,
      })} />
      <Stack.Screen name="CareerDetailScreen" component={CareerDetailScreen} options={{headerShown: false}} />
      <Stack.Screen name="AboutCareerCounsellorScreen" component={AboutCareerCounsellor} options={{title: "ការធ្វើតេសវាយតម្លៃមុខរបរ និងអាជីព"}} />
      <Stack.Screen name="SubjectScreen" component={SubjectScreen} options={{headerShown: false}} />
      <Stack.Screen name="PersonalityScreen" component={PersonalityScreen} options={{headerShown: false}} />
      <Stack.Screen name="PersonalityJobsScreen" component={PersonalityJobsScreen} options={{headerShown: false}} />
      <Stack.Screen name="SummaryScreen" component={SummaryScreen} options={{headerShown: false}} />
      <Stack.Screen name="RecommendationScreen" component={RecommendationScreen} options={{headerShown: false}} />
      <Stack.Screen name="GoalScreen" component={GoalScreen} options={{headerShown: false}} />
      <Stack.Screen name="ContactScreen" component={ContactScreen} options={{headerShown: false}} />
      <Stack.Screen name="CareerCategoriesScreen" component={CareerCategoriesScreen} options={{headerShown: false}} />
      <Stack.Screen name="InstitutionDetail" component={InstitutionDetail} options={{headerShown: false}} />
      <Stack.Screen name="GameHistoryScreen" component={GameHistoryScreen} options={{title: "លទ្ធផលតេស្ត"}} />
      <Stack.Screen name="PersonalUnderstandingReport" component={PersonalUnderstandingReport} options={{title: "ស្វែងយល់អំពីខ្លួនឯង"}} />
      <Stack.Screen name="SubjectReport" component={SubjectReport} options={{title: "ការបំពេញមុខវិជ្ជា"}} />
      <Stack.Screen name="PersonalityJobsReport" component={PersonalityJobsReport} options={{title: "ការជ្រើសរើសមុខរបរផ្អែកលើបុគ្គលិកលក្ខណៈ"}} />
      <Stack.Screen name="StudentPersonalityReport" component={StudentPersonalityReport} options={{title: "ការបំពេញបុគ្គលិកលក្ខណៈ"}} />
      <Stack.Screen name="RecommendationReport" component={RecommendationReport} options={{title: "ការផ្តល់អនុសាសន៍"}} />
      <Stack.Screen name="SchoolListScreen" component={SchoolListScreen} options={{title: "គ្រឹះស្ថានសិក្សា"}} />
    </Stack.Navigator>
  )
}

export default CareerCounsellorStack;
