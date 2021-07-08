import {StatusBar} from 'expo-status-bar';
import React from 'react';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignIn from './Screen/SignIn';
import SignUp from './Screen/SignUp';
import Home from './Screen/Home';
import Welcome from './Screen/Welcome';
import SignUpSup from './Screen/SignUpSup';
import SignUpWork from './Screen/SignUpWork';
import RegisterComplain from './Screen/RegisterComplain';
import ComplainList from './Screen/ComplainList';
import SingleComplain from './Screen/SingleComplain';
import AdminScreen from './Screen/Admin/AdminScreen';
import AddBranch from './Screen/Admin/AddBranch';
import MainScreen from './Screen/Department/MainScreen';
import Staff from './Screen/Admin/Staff';
import Department from './Screen/Admin/Department';
import AddStaff from './Screen/Admin/AddStaff';
import AllDepartments from './Screen/Admin/AllDepartments';
import ComplainMap from './Screen/Department/ComplainMap';
import AllComplains from './Screen/Department/AllComplains';
import SupComplain from './Screen/Department/SupComplain';
import Summary from './Screen/senior/Summary';
import SeniorScreen from './Screen/senior/SeniorScreen';
import UnresolvedComplinList from './Screen/senior/UnresolvedComplainList';

import {Constants} from 'react-native-unimodules';

const AuthStack = createStackNavigator();

export default function App(props) {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="Home" component={Home} />
        <AuthStack.Screen name="SignIn" component={SignIn} />
        <AuthStack.Screen
          name="Welcome"
          component={Welcome}
          options={{headerLeft: false}}
        />
        <AuthStack.Screen name="AdminScreen" component={AdminScreen} />
        <AuthStack.Screen name="AddBranch" component={AddBranch} />
        <AuthStack.Screen name="MainScreen" component={MainScreen} />
        <AuthStack.Screen
          name="RegisterComplain"
          component={RegisterComplain}
        />
        <AuthStack.Screen
          name="SignUp"
          component={SignUp}
          options={{
            title: 'Sign Up Form',
            headerStyle: {
              backgroundColor: 'grey',
            },
          }}
        />

        <AuthStack.Screen name="ComplainList" component={ComplainList} />
        <AuthStack.Screen name="SingleComplain" component={SingleComplain} />
        <AuthStack.Screen name="Staff" component={Staff} />
        <AuthStack.Screen name="Department" component={Department} />
        <AuthStack.Screen name="AddStaff" component={AddStaff} />
        <AuthStack.Screen name="AllDepartments" component={AllDepartments} />
        <AuthStack.Screen name="ComplainMap" component={ComplainMap} />
        <AuthStack.Screen name="AllComplains" component={AllComplains} />
        <AuthStack.Screen name="SupComplain" component={SupComplain} />
        <AuthStack.Screen name="Summary" component={Summary} />
        <AuthStack.Screen name="SeniorScreen" component={SeniorScreen} />
        <AuthStack.Screen
          name="UnresolvedComplinList"
          component={UnresolvedComplinList}
        />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
}
