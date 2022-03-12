import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import WelcomeScreen from './app/screens/WelcomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsContentScreen from './app/screens/NewsContentScreen';
import NewsListScreen from './app/screens/NewsListScreen';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="NewsList"
          component={NewsListScreen}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen name="NewsContent" component={NewsContentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
  console.log("Hello World")
  return (
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>

    // <NavigationContainer>
    //   <WelcomeScreen>

    //   </WelcomeScreen>
    // </NavigationContainer>
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
