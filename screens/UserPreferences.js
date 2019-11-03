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
import { Header } from 'react-native-elements';

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
        <Text style={{
          paddingVertical:20,
          fontSize:50,
          textAlign:'center',
          backgroundColor:'white',
        }}>Sign Up</Text>
        <ScrollView contentContainerStyle={styles.scroll}>
            <Text style={{marginTop:20}}>Name:</Text>
            <TextInput
                style={signin_style.input}
                placeholder="First Name"
                onChangeText={(firstname) => this.setState({firstname})}
                value={this.state.firstname}
            />
            <TextInput
                style={signin_style.inputBottom}
                placeholder="Last Name"
                onChangeText={(lastname) => this.setState({lastname})}
                value={this.state.lastname}
            />
            <Text>Gender:</Text>
            <Picker
                style={{height: 132, paddingBottom:-20}} itemStyle={{height: 132, marginTop:10}}
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
            <Text style={{marginTop:50}}>Select Your School: </Text>
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
            <View style={styles.dateWrap}>
            < DatePicker style = {
              {
                marginTop: 30,
                width: '90%',
              }
              }
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
                                display: 'none',
                            },
                            dateInput: {
                                marginLeft: 36,
                            }
                          }}
                        onDateChange={(date) => {this.setState({grad_year: date})}}/>
            </View>
            <Button
                style={styles.buttons}
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
    marginHorizontal: 16,
  
    alignItems: 'center',
    // backgroundColor: '#a9dbc0'
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
  dateWrap: {
    justifyContent: 'center'
  }
});

const signin_style = StyleSheet.create({
    image: {
      width: 50,
      height: 50,
      marginTop: 5,
      resizeMode: 'stretch'
    },
    imgStyling: {
      width: 50,
      height: 50,
      position: "relative",
      marginTop: 5
    },
    hightlight: {
      // width: 200,
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
      //marginTop:100,
      height: 40,
      width: 300
    },
    inputBottom: {
      height: 40,
      width: 300,
      marginBottom: 30
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