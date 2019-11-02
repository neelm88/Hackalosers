import React from 'react';
import Login from './screens/Login.js';
import SwipeView from './screens/SwipeView';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

/*
export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
}); */



class Loader extends React.Component{  
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        
      </View>
    );
  }
}

const AppNavigator = createStackNavigator({
  Login: {
      screen: Login ,
      navigationOptions : {header: null}
  }, SwipeView: {
    screen: SwipeView,
    navigationOptions : {header: null}
  }
  
}, {initialRouteName: "Login",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: '#fff',
      },
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }
});


export default createAppContainer(AppNavigator);