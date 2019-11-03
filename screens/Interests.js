import React, { Component } from 'react';
import { View, Text, Picker, Button, StyleSheet, ScrollView} from 'react-native'
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
  },];

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
        <View style={{ flex: 1, marginTop:100}}>
       
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
                    submitButtonColor="#48d22b"
                    submitButtonText="Submit"
                    
                />
      

            <View style={{position:'absolute',bottom:70, marginLeft: '30%'}}>
            <Button 
                title="Match Me &#8594;"
                onPress={() => {this.props.navigation.navigate('DisplayMatches')}}
                />
                </View>
        </View>
      )
   }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  }
})