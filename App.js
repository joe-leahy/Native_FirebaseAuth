import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './screens/Login';
import Home from './screens/Home';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"/>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown: false}} name ='Login' component={Login}/>
        <Stack.Screen options={{headerShown: false}} name ='Home' component={Home}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
