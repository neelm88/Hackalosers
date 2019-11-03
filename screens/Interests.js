import React, { Component } from 'react';
import { View, Text, Picker, Button, StyleSheet, ScrollView, TouchableOpacity, Image} from 'react-native'
import MultiSelect from 'react-native-multiple-select';

const items = [
    {
    id: 'Awareness/Activism',
    name: 'Awareness/Activism',
  },{
    id: 'Academic/College',
    name: 'Academic/College',
  },{
    id: 'Cultural/Ethnic',
    name: 'Cultural/Etnic',
  },{
    id: 'Community Serivce/Service Learning',
    name: 'Community Serivce/Service Learning',
  },{
    id: 'Creative and Performing Arts',
    name: 'Creative and Performing Arts',
  },{
    id: 'Goverance Organization',
    name: 'Goverance Organization',
  },{
    id: 'Honoraries/Honor Societies',
    name: 'Honoraries/Honor Societies',
  },{
    id: 'Media',
    name: 'Media',
  },{
    id: 'Performing Arts',
    name: 'Performing Arts',
  }, {
    id: 'Religious/Spiritual',
    name: 'Religious/Spiritual',
  },{
    id: 'Social Fraternities/Sororities',
    name: 'Social Fraternities/Sororities',
  },{
    id: 'Sports and Recreation',
    name: 'Sports and Recreation',
  },{
    id: 'Service',
    name: 'Service',
  },{
    id: 'Special Interest',
    name: 'Special Interest',
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