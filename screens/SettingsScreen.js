import React, { Component }  from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import { DeviceMotion } from 'expo-sensors';


export default class BalanceScreen extends Component {

  static navigationOptions ={
    header:null
     // title: 'Registration Screen',
  };
  
  state = {
    username: '',
    balance: '500',
    fontLoaded: false,
  };

  async componentDidMount() {
    // await Font.loadAsync({
    //   'roboto-bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
    // });
    // console.log(this.state.fontLoaded)
    // this.setState({ fontLoaded: true });


  }
  
  
  
  render() {
    // if(this.state.fontLoaded)
      return (
        <ImageBackground source={require("../assets/images/balanceScreen.png")} style={styles.root}>
            <Text style={styles.text}> {this.state.balance}</Text>
        </ImageBackground>
      );

  }
}

const styles = StyleSheet.create({
  root: {
    width: '100%', 
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  text: {
    color: "#ffffff",
    // marginLeft:'40%',
    alignItems: 'center',
   justifyContent: 'center',
    top:'45%',
    fontSize: 30,
    fontFamily: "roboto-bold",
    // fontWeight: "bold",
  },
});