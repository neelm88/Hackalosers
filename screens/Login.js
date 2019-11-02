import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity} from 'react-native';

export default class Login extends React.Component {
    state = {
        username: "bye",
        password: "hu"
    };

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
                <TextInput style = {style_login.input}
                placeholder="Username"
                onChangeText = {this.storeUsername}
                value={this.state.username}
            
                />

                <TextInput style = {style_login.input}
                placeholder="Password"
                onChangeText = {this.storePassword}
                value={this.state.password}
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
  });