import 'react-native-gesture-handler';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Auth from './src/Pages/Auth';
import Dashboard from './src/Pages/Dashboard';

import type {StackNavigationProp} from '@react-navigation/stack';
import Transfer from './src/Pages/Transfer';

import Success from './src/Pages/Success';
import Failed from './src/Pages/Failed';

type RootStackParamList = {
  Auth: undefined;
  Dashboard: undefined;
  Transfer: undefined;
  Success: any;
  Failed: any;
};

export type ScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const Stack = createStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{headerShown: false}}
          name="Auth"
          component={Auth}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Dashboard"
          component={Dashboard}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Transfer"
          component={Transfer}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Success"
          component={Success}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Failed"
          component={Failed}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
