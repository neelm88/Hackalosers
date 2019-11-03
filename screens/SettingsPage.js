import React from 'react';
import { StyleSheet, Button, Text, ScrollView} from 'react-native';

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
        return (
            <ScrollView>

            </ScrollView>
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