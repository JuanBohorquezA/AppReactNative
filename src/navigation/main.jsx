import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/login';
import SignUp from '../screens/signUp';
import ForgotPassword from '../screens/forgotPassword';

const Stack = createNativeStackNavigator();

function Main() {
  return (
    <NavigationContainer >
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}  options={{headerShown: false}} />
        <Stack.Screen name="SignUp" component={SignUp}  options={{headerShown: false}}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword}  options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Main;
