import React, { Component } from 'react';
import { View, Text, Picker, Button, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import MultiSelect from 'react-native-multiple-select';

const items = [
    {
    id: 'Awareness/Activism',
    name: 'Awareness/Activism',
  },];

export default class App extends Component {

    constructor(props) {
        super(props);
        this.state = {selectedItems :[]};
      }

    onSelectedItemsChange = selectedItems => {
      this.setState({ selectedItems });
    }

    render() {
      const { selectedItems } = this.state;
      return (
        <View style={{ flex: 1, marginTop:100}}>
            <Text style = {styles.header}> Matches</Text>
            <TouchableOpacity onPress={this._onPressButton}>
                <Text>HI</Text>
            </TouchableOpacity>
        </View>
      )
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: '#fff'
  },header:{
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
 }
})