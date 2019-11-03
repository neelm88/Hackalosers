import React from 'react';
import { StyleSheet, Button, Text,TitleText, View,TextInput, TouchableOpacity, Dimensions, Image} from 'react-native';
import { AnimatedBackgroundColorView } from 'react-native-animated-background-color-view';
import { Icon } from 'react-native-elements'
export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '', 
            password: '',
        };
      }   

    storeUsername = (input) => {
        this.setState({username: input})
    }

    storePassword = (input) => {
        this.setState({password: input})
    }

    render(){
        return (
            <AnimatedBackgroundColorView color='#a9dbc0' initialColor='#f5b5f1' duration={60000} style = {style_login.container}>  
                <Image source={{uri : 'https://img1.picmix.com/output/stamp/normal/3/5/1/1/1321153_5c59f.gif'}} style={{position: 'absolute', top: "3.5%", width: 400, height: 400}}/>
                <Image source={require('../assets/hubbub.png')} style={{ width: 400, height: 200}}/>
                <Text style = {style_login.signIn}> Sign In</Text>
                <View style = {style_login.icon}>
                
                <Icon name="people-outline"/>
                <TextInput style = {style_login.input}
                    placeholder="Username"
                    onChangeText = {this.storeUsername}
                    value={this.state.username}   
                />
                </View>
                <View style = {style_login.icon}>
                <Icon name="security"/>
                <TextInput  secureTextEntry={true}  style = {style_login.input}
                    placeholder="Password"
                    onChangeText = {this.storePassword}
                    value={this.state.password}
                />
                </View>
                <View style = {style_login.optionsContainer}>
                    <Button color = "black"
                        opacity="50%"
                        title="Login"
                    onPress={() => {this.props.navigation.navigate('SwipeView')}}
                    
                    />
                    <Button 
                        title="Forgot Password"
                        color="black"
                        onPress={() => {this.props.navigation.navigate('Interests')}}
                        title="Forgot Password"
                    />
                    <Button
                        title="Sign Up"
                        color="black"
                        onPress={() => {this.props.navigation.navigate('UserPreferences', {
                            username: this.state.username,
                            password: this.state.password 
                        })}}
                    />
                </View>
            </AnimatedBackgroundColorView>
        );
    }
}
   
  const style_login = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
        opacity: 1.0,
        marginTop: 10,
        height: 40,
        width: 300,
        marginLeft: 5,
        paddingHorizontal: 0,
     }, 
     optionsContainer: {
        flexDirection: 'row',
     },
     signIn:{
        fontSize: 20,
        fontWeight: 'bold',
     }, icon:{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
     }
  });

  // Make it more button like
  // Format forgot buttons 
  // Link button to another page