import React, { Component } from 'react';
import { Alert, View, StyleSheet, Text, ImageBackground, KeyboardAvoidingView, TouchableOpacity } from "react-native";
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


  render() {
    const {navigate} = this.props.navigation;
    if(this.state.fontLoaded)
      return (
        <ImageBackground source={require("../assets/images/screen1.png")} style={{width: '100%', height: '90%'}}>
            <Button style={styles.button1} onPress={() => {this.props.navigation.navigate("Code")}}><Text style={styles.btntext}>START GAME</Text></Button>
            <Button style={styles.button2} onPress={() => {this.props.navigation.navigate("Join")}}><Text style={styles.btntext}>JOIN GAME</Text></Button>
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
        backgroundColor:'#5ECACA',
       width: 120,
       marginLeft:'15%',
       top:'150%',
       alignItems: 'center',
       justifyContent: 'center',
    },
    btntext: {
        color: "#ffffff",
        // fontSize: 26,
        fontFamily: "roboto-bold",
        // fontWeight: "bold",
      },
    button2: {
      
        // flex: 1,
        borderRadius: 10,
        backgroundColor:'#5ECACA',
       width: 120,
       marginLeft:'55%',
       top:'138%',
       alignItems: 'center',
       justifyContent: 'center',
    }}
)

