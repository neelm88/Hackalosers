import React from 'react';
import {TouchableHighlight, Image, Linking, TextInput, Picker} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import {
  StyleSheet,
  Button,
  View,
  SafeAreaView,
  Text,
  Alert,
} from 'react-native';
import Constants from 'expo-constants';

function Separator() {
  return <View style={styles.separator} />;
}

export default class Alumni extends React.Component {
    constructor(props) {
        super(props);
        this.state = {school: ""};
    }
  componentDidMount() {
 
  }

  render() {
  return (  
    <SafeAreaView style={styles.container}>
          <Picker
              placeholder="Pick School"
              value={this.state.school}>
              <Picker.Item label = "The Ohio State University" value = "The Ohio State University" />
          </Picker> 
          <Separator />     
    </SafeAreaView>
  );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});