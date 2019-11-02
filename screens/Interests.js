import React, { Component } from 'react';
import { View, Text, Picker, Button, StyleSheet, ScrollView} from 'react-native'
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