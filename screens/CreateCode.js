import React, { Component } from 'react';
import { Alert, TextInput, StyleSheet, Text, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Image, AsyncStorage } from "react-native";
// import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'native-base';
import * as Font from 'expo-font';

const ip = "http://192.168.1.10:3000"


export default class App extends Component {
    static navigationOptions ={
        header:null
         // title: 'Registration Screen',
      };

      async componentDidMount() {
        await Font.loadAsync({
          'roboto-light': require('../assets/fonts/Roboto/Roboto-Light.ttf'),
        });
        this.setState({ fontLoaded: true });
      }

    constructor(props){
      super(props);
      this.state = { username: '',
      code: '',
      fontLoaded: false,
      codeGenerated: false
                      
    };

    }
    async registerUser(){
      try { 
       let result = await fetch(ip +'/players/insert', {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json',
       },
       body: JSON.stringify({
         userName: this.state.username,
         gameCode: parseInt(this.state.code)
       }),
       
       
     });
     console.log(result);
     await AsyncStorage.setItem('username', this.state.username);
     await AsyncStorage.setItem('gamecode', this.state.code);
     await AsyncStorage.setItem('turn', 'true');
   } catch (error) {
       console.log(error);
       console.log('aywaaa')
     };
     this.props.navigation.navigate("Main")
   }
    genCode(){
        var x = Math.floor((Math.random() * 100000) + 1).toString();
        this.setState({ code: x })
        this.setState({ codeGenerated: true })
        console.log(this.state.code)
    }


  render() {
    const {navigate} = this.props.navigation;

    if(this.state.fontLoaded)
      return (
        <ImageBackground source={require("../assets/images/newGame3.png")} style={styles.root}>
            <TextInput style={styles.textinput} placeholder={"username"} placeholderTextColor='#696463' onChangeText={(username) => this.setState({username})}
              value={this.state.username}/>
            <Text style={styles.text}> {this.state.code}</Text>
            <Button transparent style={styles.button1} onPress={() => {this.genCode()}}><Text style={styles.btntext}>GENERATE CODE</Text></Button>
            <Button style={styles.button2} onPress={() => {this.registerUser()}} disabled={!this.state.codeGenerated}><Text style={styles.btntext}>START!</Text></Button>

        </ImageBackground>
      );
    else
        return null;
  }
}

const styles = StyleSheet.create({
  root: {
    width: '100%', 
    height: '90%',
    alignItems: 'center',
    // justifyContent: 'center',
  },
    button1: {
      
        // flex: 1,
        // backgroundColor:'#5ECACA',
       width: 140,
      //  marginLeft:'33%',
       borderRadius:20,
       top:'63%',
       alignItems: 'center',
       justifyContent: 'center',
    },

    btntext: {
        color: "#ffffff",
        // fontSize: 26,
        fontFamily: "roboto-bold",
        // fontWeight: "bold",
      },
      text: {
        color: "#696463",
        // marginLeft:'40%',
        alignItems: 'center',
       justifyContent: 'center',
        top:'59%',
        fontSize: 26,
        fontFamily: "roboto-light",
        // fontWeight: "bold",
      },
    button2: {
      
        // flex: 1,
        backgroundColor:'#62D7C5',
       width: 140,
       borderRadius:10,
      //  marginLeft:'50%',
      alignItems: 'center',
       justifyContent: 'center',
       top:'140%',
       alignItems: 'center',
       justifyContent: 'center',
    },
    textinput:{
        // alignSelf: 'stretch',
        marginLeft:'40%',
        alignSelf: 'stretch',
        alignItems: 'center',
       justifyContent: 'center',
        height: 40,
        top:'35%',
        marginBottom: 30,
        fontSize: 18,
        color: 'black',
    }
}
)

