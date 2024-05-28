import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import 'react-native-gesture-handler';
import React from 'react';
import Login from './src/screen/Login';
import Home from './src/screen/Home';
import Register from './src/screen/Register';

function App(): React.JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'LOGIN',
            headerTintColor: 'White',
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#2CB494'},
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: 'REGISTER',
            headerTintColor: 'White',
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#2CB494'},
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'HOME',
            headerTintColor: 'White',
            headerTitleAlign: 'center',
            headerStyle: {backgroundColor: '#2CB494'},
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
