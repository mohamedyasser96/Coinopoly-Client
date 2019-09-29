import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { Alert, View, StyleSheet, Text, ImageBackground, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { Button } from 'native-base';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';

import { BarCodeScanner } from 'expo-barcode-scanner';


import { MonoText } from '../components/StyledText';
export default class HomeScreen extends Component
{
  static navigationOptions ={
    header:null
     // title: 'Registration Screen',
  };
  constructor(props){
    super(props);
    this.state = { username: 'SHERIFA',
    code: '',
    fontLoaded: false,
    scanMode: false,
    hasCameraPermission: null,
    scanned: false,
                    
  };

  }
  async componentDidMount() {
    this.getPermissionsAsync();
    await Font.loadAsync({
      'roboto-bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  changeTurn(){
    this.setState({ username: 'Hamada'})
  }

  getPermissionsAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  };
  setScanMode(){
    this.setState({ scanMode: true });
  }
  render(){
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    if(this.state.fontLoaded)
    {
      if(!this.state.scanMode)
        return (
          <ImageBackground source={require("../assets/images/homescreen.png")} style={styles.root}>
              <Text style={styles.text}>{this.state.username + "'s"} </Text>
              <Text style={styles.text2}>TURN</Text>
              <Button transparent style={styles.button3} onPress={() => {this.changeTurn()}}><Text style={styles.btntext} >BUY PROPERTY</Text></Button>
              <Button transparent style={styles.button2} onPress={() => {this.changeTurn()}}><Text style={styles.btntext} >PAY RENT</Text></Button>
              <Button transparent style={styles.button1} onPress={() => {this.changeTurn()}}><Text style={styles.btntext} >s</Text></Button>
          </ImageBackground>
        );
      else
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
          }}>
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
  
          {scanned && (
            <Button title={'Tap to Scan Again'} onPress={() => this.setState({ scanned: false })} />
          )}
        </View>
      );

    }
    else
      return null

  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };
        

}


const styles = StyleSheet.create({
  button1: {
    
      // flex: 1,
      borderRadius: 10,
      // backgroundColor:'#5ECACA',
     width: 120,
    //  marginLeft:'35%',
     top:'155%',
     alignItems: 'center',
     justifyContent: 'center',
  },
  root: {
    width: '100%', 
    height: '100%',
    alignItems: 'center',
    // justifyContent: 'center',
  },
  button3: {
    
    // flex: 1,
    // borderRadius: 10,
    // backgroundColor:'#5ECACA',
   width: 140,
  //  marginLeft:'35%',
   top:'60%',
   alignItems: 'center',
   justifyContent: 'center',
   textAlign: 'center',
},
  btntext: {
      color: "#ffffff",
      fontSize: 20,
      fontFamily: "roboto-light",
      textAlign: 'center',
      // fontWeight: "bold",
    },
    text:{
      fontFamily: "roboto-bold",
      top:'20%',
      fontSize: 36,
      textAlign: 'center',
      color:'#ffffff'
    },
    text2:{
      fontFamily: "roboto-bold",
      top:'22%',
      fontSize: 36,
      // marginLeft: '40%',
      textAlign: 'center',
      color:'#ffffff'
    },
  button2: {
    
    width: 140,
    //  marginLeft:'35%',
     top:'65%',
     alignItems: 'center',
     justifyContent: 'center',
     textAlign: 'center',
  }}
)
