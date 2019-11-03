import React from 'react';
import {TouchableHighlight, Image, Linking, TextInput, Picker} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import  IP  from "../constants/ip.js";
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

export default class UserPreferences extends React.Component {
    constructor(props) {
        super(props);
        const text = this.props.navigation.getParam('username', () => {});
        this.state = {  username: this.props.navigation.getParam('username', () => {}),
                        password: this.props.navigation.getParam('password', () => {}),
                        firstname: '',
                        lastname: '',
                        grad_year: '2019',
                        gender: '',
                        school: '',};
    }
  componentDidMount() {
 
  }
  nextPage() {
    fetch(IP.ip + 'user_data/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(this.state),
    }).then((response) => response.json())
        .then((responseJson) => {
          return responseJson;
        })
        .catch((error) => {
          console.error(error);
        });
    this.props.navigation.navigate('Interests');
  }
  render() {
  return (  
    <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scroll}>
            <TextInput
                style={signin_style.input}
                placeholder="First Name"
                onChangeText={(firstname) => this.setState({firstname})}
                value={this.state.firstname}
            />
            <TextInput
                style={signin_style.input}
                placeholder="Last Name"
                onChangeText={(lastname) => this.setState({lastname})}
                value={this.state.lastname}
            />
            <Text>Gender:</Text>
            <Picker
                style={{height: 132}} itemStyle={{height: 132}}
                placeholder="Gender"
                mode= 'dropdown'
                selectedValue={this.state.gender}
                onValueChange={(itemValue) =>
                    this.setState({gender: itemValue})
                  }
                >
                <Picker.Item label = "Female" value = "Female" />
                <Picker.Item label = "Male" value = "Male" />
                <Picker.Item label = "Other" value = "Other" />
            </Picker>
            <Text>Select Your School: </Text>
            <Picker
                style={{height: 132}} itemStyle={{height: 132}}
                placeholder="School"
                mode= 'dropdown'
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
                        date={this.state.grad_year}
                        mode="date"
                        format="YYYY"
                        placeholder="Select Date"
                        minDate="1950"
                        maxDate="2050"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                display: 'none'
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            }}
                        onDateChange={(date) => {this.setState({grad_year: date})}}/>
            <Button
                style={signin_style.buttons}
                title="Next"
                color="#f194ff"
                onPress={() => {this.nextPage()}}
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