import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsContentScreen from './app/screens/NewsContentScreen';
import NewsListScreen from './app/screens/NewsListScreen';
import { observer } from 'mobx-react';

const Stack = createNativeStackNavigator();

export default observer(function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="NewsList"
          component={NewsListScreen}
          options={{ title: 'Technology News' }}
        />
        <Stack.Screen
          name="NewsContent"
          component={NewsContentScreen}
          options={{title: "News Content"}}
           />
      </Stack.Navigator>
    </NavigationContainer>

  );
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
