import React, { Component } from 'react';
import { Alert, TextInput, StyleSheet, Text, ImageBackground, KeyboardAvoidingView, TouchableOpacity, AsyncStorage } from "react-native";
import { Button } from 'native-base';
import * as Font from 'expo-font';


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
                      
    };

    }

    async joinGame(){
      try { 
       let result = await fetch('http://192.168.1.10:3000/players/insert', {
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
   } catch (error) {
       console.log(error);
       console.log('aywaaa')
     };
     this.props.navigation.navigate("Main")
   }
    genCode(){
        var x = Math.floor((Math.random() * 100000) + 1).toString();
        this.setState({ code: x })
        console.log(this.state.code)
    }


  render() {
    const {navigate} = this.props.navigation;

    if(this.state.fontLoaded)
      return (
        <ImageBackground source={require("../assets/images/joinGame.png")} style={{width: '100%', height: '90%'}}>
            <TextInput style={styles.textinput} placeholder={"username"} placeholderTextColor='#696463' onChangeText={(username) => this.setState({username})}
              value={this.state.username}/>
            <TextInput style={styles.text} onChangeText={(code) => this.setState({code})}
              value={this.state.code}/>
            <Button transparent style={styles.button1} onPress={() => {this.joinGame()}}><Text style={styles.btntext}>JOIN GAME</Text></Button>
        </ImageBackground>
      );
    else
        return null;
  }
}

const styles = StyleSheet.create({
    button1: {
      
        // flex: 1,
    //    backgroundColor:'#5ECACA',
       width: 140,
       marginLeft:'33%',
       borderRadius:20,
       top:'130%',
       alignItems: 'center',
       justifyContent: 'center',
    },
    btntext: {
        color: "#ffffff",
        // fontSize: 26,
        fontFamily: "roboto-light",
        // fontWeight: "bold",
      },
      text: {
        color: "#ffffff",
        marginLeft:'40%',
        top:'50%',
        fontSize: 26,
        fontFamily: "roboto-light",
        // fontWeight: "bold",
      },
    button2: {
      
        // flex: 1,
        backgroundColor:'#5ECACA',
       width: 120,
       marginLeft:'50%',
       top:'150%',
       alignItems: 'center',
       justifyContent: 'center',
    },
    textinput:{
        alignSelf: 'stretch',
        marginLeft:'40%',
        height: 40,
        top:'35%',
        marginBottom: 30,
        fontSize: 18,
        color: 'black',
    }
}
)

