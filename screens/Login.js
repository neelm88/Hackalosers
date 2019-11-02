import React from 'react';
import { StyleSheet, Button, Text,TitleText, View,TextInput, TouchableOpacity} from 'react-native';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: '', password: ''};
      }
    

    storeUsername = (input) => {
        this.setState({username: input})
    }

    storePassword = (input) => {
        this.setState({password: input})
    }

    render(){
        console.log(this.username);
        return (

            <View style={style_login.container}>
                <Text style = {style_login.signIn}> Sign In</Text>
                <TextInput style = {style_login.input}
                placeholder="Username"
                onChangeText = {this.storeUsername}
                value={this.state.username}
            
                />

                <TextInput  secureTextEntry={true}  style = {style_login.input}
                placeholder="Password"
                onChangeText = {this.storePassword}
                value={this.state.password}
                />
               
                
               <Button color = "black"
                title="Login"

                />

                <Button 
                title="Forgot Password"
                onPress={() => {this.props.navigation.navigate('Interests')}}
                />
         
            </View>
        )
        
    }
}

  
  const style_login = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
        marginTop: 10,
        height: 40,
        width: 300
     },
     signIn:{
        fontSize: 20,
        fontWeight: 'bold',
     },
  });

  // Make it more button like
  // Format forgot buttons 
  // Link button to another page