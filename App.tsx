import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login';
import UserProfile from './screens/userProfile';
import Register from './screens/register';
import Machine from './screens/machine';
import Branch from './screens/branch';
import ReduxProvider from './screens/redux/ReduxProvider';

const Stack = createStackNavigator();
export default function App() {
  return (
    <ReduxProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Branch" component={Branch} />
        <Stack.Screen name="Machine" component={Machine} />
      </Stack.Navigator>
    </NavigationContainer>
    </ReduxProvider>
  );
}
