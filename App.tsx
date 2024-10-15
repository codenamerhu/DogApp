/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/redux/store';
import DogListContainer from './src/containers/DogListContainer';
import LoginContainer from './src/containers/LoginContainer';

// RootStackParamList type
export type RootStackParamList = {
  Login: undefined;
  DogListScreen: undefined;
};

// stack navigator
const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginContainer} />
          <Stack.Screen name="DogList" component={DogListContainer} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
