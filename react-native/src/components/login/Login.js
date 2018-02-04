import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, TouchableHighlight, Text, Alert} from 'react-native';
import { Container, Header, Content, Button, Icon} from 'native-base';
import { StackNavigator } from 'react-navigation';



const t = require('tcomb-form-native');
const Form = t.form.Form
const newUser = t.struct({
  username: t.String,
  password:  t.String
})
const options = {
  fields: {
    username: {
      autoCapitalize: 'none',
      autoCorrect: false
    },
    password: {
      autoCapitalize: 'none',
      password: true,
      secureTextEntry: true,
      autoCorrect: false
    }
  },
  auto: 'placeholders'
}

export default class Login extends Component {
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


  handleLoginPressed = async () => {
      const value = this.refs.form.getValue();
    let resp = await tryLogin(value.username, value.password);
    if(resp.status !== 200){
      if (resp.status === 504) {
        Alert.alert("Network Error", "Check your internet connection" )
      } else {
        Alert.alert("Error", "Unauthorized, Invalid username or password")
      }
    } else {
      this.setState({isLoggedIn:true})
      var result=resp.json();
      var username = result.username;
      var auth_token=result.authToken;
      Alert.alert('Success','you are successfully login');
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (


      <ScrollView style={styles.container}>

       <Text style={styles.text}>Instagram</Text>

  <Form
            ref='form'
            type={newUser}
            options={options}
            value={this.state.value}
            onChange={this._onChange}
  />
  <Button full style={styles.button} onPress={this.handleLoginPressed}>
  <Text style={styles.blueButton}>Log in</Text>
  </Button>
  <Text style={{textAlign:'center',color:'#949699'}}>Forgot password?</Text>
<TouchableHighlight  onPress={() => navigate('Signup')}>
 <Text style={{textAlign:'center',color:'#949699', marginTop:20}}>Do not have an account <Text style={{color:'#4392db'}}>Sign up</Text></Text></TouchableHighlight>
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
    textAlign:'center',
    marginBottom:20,
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
