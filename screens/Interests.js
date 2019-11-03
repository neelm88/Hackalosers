import React, { Component } from 'react';
import { View, Text, Picker, Button, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native'
import MultiSelect from 'react-native-multiple-select';

const items = [
    {
    id: 'Awareness/Activism',
    name: 'Awareness/Activism',
  },{
    id: 'Academic',
    name: 'Academic',
  },{
    id: 'Cultural',
    name: 'Cultural',
  },{
    id: 'Fraternities',
    name: 'Fraternities',
  },{
    id: 'Honoraries',
    name: 'Honoraries',
  },{
    id: 'Performing Arts',
    name: 'Performing Arts',
  }, {
    id: 'Religious',
    name: 'Religious',
  },{
    id: 'Sororities',
    name: 'Sororities',
  },{
    id: 'Sports',
    name: 'Sports',
  },{
    id: 'Service',
    name: 'Service',
  },{
    id: 'Technology',
    name: 'Technology',
  }];

export default class Interests extends Component {

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
        <View style={styles.container}>
       
                <MultiSelect
                    hideTags
                    items={items}
                    uniqueKey="id"
                    ref={(component) => { this.multiSelect = component }}
                    onSelectedItemsChange={this.onSelectedItemsChange}
                    selectedItems={selectedItems}
                    selectText="    Choose Interests"
                    searchInputPlaceholderText="Search Items..."
                    //altFontFamily="Arial"
                    tagRemoveIconColor="#CCC"
                    tagBorderColor="#CCC"
                    tagTextColor="#CCC"
                    selectedItemTextColor="#CCC"
                    selectedItemIconColor="#CCC"
                    itemTextColor="#000"
                    displayKey="name"
                    searchInputStyle={{ color: '#CCC' }}
                    submitButtonColor = "#D9B4F5"
                    submitButtonText="Submit"
                    fixedHeight = 'true'
                />
      
      <Image  style={{position:'absolute',bottom:150, left: 170, width: 80, height: 80}} source = {require('../assets/pinkdisco.gif')}/> 
      
      <View style={{position:'absolute',bottom:30, left: 100}}>
       < TouchableOpacity activeOpacity = {0.5} onPress={() => {this.props.navigation.navigate('DisplayMatches')}}>

        <Image  style={{width: 200, height: 100}} source = {require('../assets/matchme.png')}/> 


         </TouchableOpacity>
</View>

        </View> 
      )
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 100,
    backgroundColor: '#f5b5f1',
  }
})