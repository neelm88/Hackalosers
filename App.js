import React from 'react';
import Login from './screens/Login.js';
import SwipeView from './screens/SwipeView';
import Interests from './screens/Interests.js';
import UserPreferences from './screens/UserPreferences.js';
import DisplayMatches from './screens/DisplayMatches.js';
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
const LoginStack = createStackNavigator({
  Login: {
      screen: Login,
      navigationOptions : {header: null}
  }
});

const InterestsStack = createStackNavigator({
  Interests: {
      screen: Interests,
      navigationOptions : {header: null}
  }
});

const UserPreferencesStack = createStackNavigator({
  UserPreferences: {
    screen: UserPreferences,
    navigationOptions: {
      header: null
    }
  }
});

const DisplayMatchesStack = createStackNavigator({
  DisplayMatches: {
    screen: DisplayMatches,
    navigationOptions: {
      header: null
    }
  }
});

const SwipeViewStack = createStackNavigator({
  SwipeView: {
    screen: SwipeView,
    navigationOptions: {
      header: null
    }
  }
});

const AppNavigator = createStackNavigator({
  Login: {
      screen: Login,
      navigationOptions : {header: null}
  },
  Interests: {
    screen: Interests ,
    navigationOptions : {header: null}
  },
  UserPreferences: {
    screen: UserPreferences,
    navigationOptions : {header: null}    
  }, 
  DisplayMatches: {
    screen: DisplayMatches,
    navigationOptions : {header: null}    
  },
  SwipeView: {
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

const drawerConfig = () => ({
  initialRouteName: 'Home',
  drawerPosition: 'Left',
  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
});



export default createAppContainer(AppNavigator);