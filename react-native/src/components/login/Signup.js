import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableHighlight, Text, Alert} from 'react-native';
import { Container, Header, Content, Button, Icon} from 'native-base';
import { StackNavigator } from 'react-navigation';
import Login from './Login';
import { trySignup} from './Auth';
const t = require('tcomb-form-native');
const Form = t.form.Form
const newUser = t.struct({
  mobile_number_or_email: t.String,
  full_name: t.String,
  username: t.String,
  password:  t.String
})
const options = {
  fields: {
    mobile_number_or_email: {
      autoCapitalize: 'none',
      autoCorrect: false
    },
    full_Name: {
      autoCapitalize: 'none',
      autoCorrect: false
    },
    username: {
      autoCapitalize: 'none',
      autoCorrect: false
    },
    password: {
      autoCapitalize: 'none',
      password: true,
      autoCorrect: false
    }
  },
  auto: 'placeholders'
}

export default class Signup extends Component {
  constructor(props) {
super(props)
this.state = {
      value: {
        username: '',
        password: ''
      },
      isLoggedIn:false
    }
  }
componentWillUnmount() {
this.setState = {
      value: {
        username: '',
        password: null
      }
    }
  }
_onChange = (value) => {
this.setState({
      value
    })
  }

  handleSignupPressed = async () => {
    const value = this.refs.form.getValue();
    let resp = await trySignup(value.username, value.password);
    if(resp.status !== 200){
      if (resp.status === 504) {
        Alert.alert("Network Error", "Check your internet connection" )
      } else {
        Alert.alert("Error", "Password too short / User already exists")
      }
    } else {
      this.setState({isLoggedIn:true});
          Alert.alert("success", "you are succesfully login");

    }
  }


  render() {

    const { navigate } = this.props.navigation;
    return (
      <ScrollView style={styles.container}>
       <Text style={styles.text}>Instagram</Text>
       <Text style={styles.subheading}>Sign up to see photos and videos from your friends.</Text>
       <Button full style={styles.button} onPress={this._handleAdd}>
               <Text style={styles.blueButton}>Log in with facebook</Text>
       </Button>
        <Text style={{textAlign:'center',color:'#949699', marginBottom:20}}>_________________    OR    _________________</Text>
  <Form
            ref='form'
            type={newUser}
            options={options}
            value={this.state.value}
            onChange={this._onChange}
  />
  <Button full style={styles.button} onPress={this.handleSignupPressed}>
  <Text style={styles.blueButton}>Sign up</Text>
  </Button>
  <Text style={{textAlign:'center',color:'#949699'}}>By signing up, you agree to our</Text>
  <Text style={{textAlign:'center',color:'#949699', fontWeight:'bold'}}>Terms & Privacy Policy.</Text>
 <TouchableHighlight  onPress={() => navigate('Login')}><Text style={{textAlign:'center',color:'#949699', marginTop:20}}>Have an account? <Text style={{color:'#4392db'}}>Log in</Text></Text></TouchableHighlight>

  </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  button: {
    borderRadius: 4,
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#4392db'
  },
  blueButton: {
    backgroundColor: '#4392db',
    fontWeight:'bold',
    color:'#fff'
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    fontWeight:'bold',
    fontSize:36,
    textAlign:'center'
  },
  subheading:{
    marginTop:20,
    marginBottom:20,
    fontWeight:'bold',
    fontSize:18,
    textAlign:'center',
    color:'#949699'
  }
})
