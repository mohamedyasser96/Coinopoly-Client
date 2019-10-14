import React, { Component } from 'react';
import { Alert, View, StyleSheet, Text, ImageBackground, KeyboardAvoidingView, TouchableOpacity, Linking } from "react-native";
import { Button } from 'native-base';
import * as Font from 'expo-font';

export default class App extends Component {
    static navigationOptions ={
        header:null
         // title: 'Registration Screen',
      };

    constructor(props){
      super(props);
      this.state = { username: '',
      code: '',
      fontLoaded: false
                      
    };

    }

    async componentDidMount() {
        await Font.loadAsync({
          'roboto-light': require('../assets/fonts/Roboto/Roboto-Light.ttf'),
          'roboto-bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf')
        });
        this.setState({ fontLoaded: true });
      }

    handleClick = () => {
      Linking.canOpenURL('https://www.luminpdf.com/viewer/5da07b09ee5adf001904f3c2').then(supported => {
        if (supported) {
          Linking.openURL('https://www.luminpdf.com/viewer/5da07b09ee5adf001904f3c2');
        } else {
          console.log("Don't know how to open URI: " + "https://www.luminpdf.com/viewer/5da07b09ee5adf001904f3c2");
        }
      });
    };


  render() {
    const {navigate} = this.props.navigation;
    if(this.state.fontLoaded)
      return (
        <ImageBackground source={require("../assets/images/landing2.png")} style={{width: '100%', height: '90%'}}>
            <Button transparent style={styles.button1} onPress={() => {this.props.navigation.navigate("Code")}}><Text style={styles.btntext2}>START GAME</Text></Button>
            <Button transparent style={styles.button2} onPress={() => {this.props.navigation.navigate("Join")}}><Text style={styles.btntext}>JOIN GAME</Text></Button>
            <Button transparent style={styles.button3} onPress={() => {this.handleClick()}}><Text style={styles.btntext2}>INSTRUCTIONS</Text></Button>
        </ImageBackground>
      );
    else
        return null
  }
}

const styles = StyleSheet.create({
    button1: {
      
        // flex: 1,
        borderRadius: 10,
        // backgroundColor:'#5ECACA',
       width: 120,
       marginLeft:'10%',
       top:'144%',
       alignItems: 'center',
       justifyContent: 'center',
    },
    btntext: {
        color: "#5ECACA",
        // fontSize: 26,
        fontFamily: "roboto-bold",
        // fontWeight: "bold",
      },
      btntext2: {
        color: "#ffffff",
        // fontSize: 26,
        fontFamily: "roboto-bold",
        // fontWeight: "bold",
      },
    button2: {
      
        // flex: 1,
        borderRadius: 10,
        // backgroundColor:'#5ECACA',
       width: 120,
       marginLeft:'58%',
       top:'132%',
       alignItems: 'center',
       justifyContent: 'center',
    },
    button3: {
      
      // flex: 1,
      borderRadius: 10,
      // backgroundColor:'#5ECACA',
     width: 220,
     marginLeft:'22%',
     top:'136%',
     alignItems: 'center',
     justifyContent: 'center',
  }}
)

