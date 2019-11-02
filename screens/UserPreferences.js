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
  ScrollView
} from 'react-native';
import Constants from 'expo-constants';
import DatePicker from 'react-native-datepicker'

function Separator() {
  return <View style={styles.separator} />;
}

export default class Alumni extends React.Component {
    constructor(props) {
        super(props);
        this.state = {  school: "",
                        first_name: '',
                        last_name: '',
                        date: '2019'};
    }
  componentDidMount() {
 
  }

  render() {
  return (  
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
            <TextInput
                style={signin_style.input}
                placeholder="First Name"
                onChangeText={(first_name) => this.setState({first_name})}
                value={this.state.first_name}
            />
            <TextInput
                style={signin_style.input}
                placeholder="Last Name"
                onChangeText={(last_name) => this.setState({last_name})}
                value={this.state.last_name}
            />
            <Text>Select Your School: </Text>
            <Picker
                style={signin_style.picker}
                placeholder="Pick School"
                selectedValue={this.state.school}
                onValueChange={(itemValue) =>
                    this.setState({school: itemValue})
                  }
                >
                <Picker.Item label = "The Ohio State University" value = "The Ohio State University" />
                <Picker.Item label = "Other School" value = "Other School1" />
                <Picker.Item label = "Other School" value = "Other School2" />
            </Picker>
            <DatePicker style={{width: 200}}
                        display="spinner"
                        date={this.state.date}
                        mode="date"
                        format="YYYY"
                        placeholder="Select Date"
                        minDate="1950"
                        maxDate="2050"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            }}
                        onDateChange={(date) => {this.setState({date: date})}}/>
            <Button
                style={signin_style.buttons}
                title="Next"
                color="#f194ff"
                onPress={() => {this.props.navigation.navigate('Interests')}}
                />            
        </ScrollView> 
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
  scroll: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

const signin_style = StyleSheet.create({
    image: {
      width: 300,
      height: 60,
      resizeMode: 'stretch'
    },
    hightlight: {
      // width: 200,
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
      height: 40,
      width: 300
    },
    picker: {
      justifyContent: 'flex-end'
    },
    buttons: {
      flexDirection: 'column',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    }
  });