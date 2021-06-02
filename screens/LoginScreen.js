import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, KeyboardAvoidingView, Image} from 'react-native';
import firebase from 'firebase';

export default class LoginScreen extends React.Component{
    constructor(){
        super();
        this.state={
            email: '',
            password: '',
        }
    }

    login=async(email, password)=>{
        if(email && password){

            try{
              const response = await firebase.auth().signInWithEmailandPassword(email, password)
              if(response){
                alert('Login successful')
                this.props.navigation.navigate('Transaction')
              }
            }
            catch(error){
                switch (error.code){
                    case 'auth/user-not/found': 
                    alert("User does not exist")
                    break;
                    case 'auth/invalid-email':
                    alert("Incorrect email or password")
                }
            }

        }
        else{
            alert("Enter email Id and password")
        }

    }

    render(){
        return(
            <KeyboardAvoidingView style = {styles.container}>
            
              <Text style = {styles.wilyText}>WILY APP</Text>
              
              <View>
                <TextInput
                style = {styles.emailInput}
                placeholder = "abc@example.com"
                keyboardType = "email-address"
                onChangeText={(text)=>{
                    this.setState({
                        email: text,
                    })
                }}
                />

                <TextInput
                    style = {styles.passwordInput}
                    placeholder = "Enter password"
                    secureTextEntry = {true}
                    onChangeText={(text)=>{
                    this.setState({
                        password: text,
                    })
                }}
                />
              </View>

              <View>
                <TouchableOpacity 
                    style = {styles.loginButton}
                    onPress={()=>{
                      {this.login(this.state.email, this.state.password)}
                    }}
                >

                    <Text style = {styles.loginText}>Login</Text>

                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
        )
    }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wilyText:{
    color: 'red',
    fontSize: 40,
    padding: 10,
  },
  emailInput:{
    marginTop: 50,
    width: 160,
    alignSelf: 'center',
    height: 50,
    textAlign: 'center',
    borderWidth: 3,
    borderColor: 'blue',
  },
  passwordInput:{
    marginTop: 30,
    width: 160,
    alignSelf: 'center',
    height: 50,
    textAlign: 'center',
    borderWidth: 3,
    borderColor: 'blue',
  },
  loginButton:{
    backgroundColor: 'yellow',
    marginTop: 50,
    width: 190,
    alignSelf: 'center',
    height: 50,
    textAlign: 'center',
    borderWidth: 3,
    borderColor: 'blue',
  },
  loginText:{
    color: 'blue',
    fontSize: 20,
    padding: 10,
  },
});
