import * as WebBrowser from 'expo-web-browser';
import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Alert, View, StyleSheet, Text, ImageBackground, KeyboardAvoidingView, TouchableOpacity, AsyncStorage } from "react-native";
// import AsyncStorage from '@react-native-community/async-storage';
import Dialog, { DialogTitle, DialogContent } from 'react-native-popup-dialog';
import { Button, Image } from 'native-base';
import * as Permissions from 'expo-permissions';
import * as Font from 'expo-font';


import { BarCodeScanner } from 'expo-barcode-scanner';


const ip = "http://10.40.51.51:3000"

export default class HomeScreen extends Component
{
  static navigationOptions ={
    header:null
     // title: 'Registration Screen',
  };
  constructor(props){
    super(props);
    this.state = { username: '',
    code: '',
    // fontLoaded: false,
    scanMode: false,
    hasCameraPermission: null,
    scanned: false,
    rollMode: true,
    diceValue: '0',
    turn: true,
    qrCode: '',
    rolled: false,
    turn: false,
    player: {},
    cardText: ''
                    
  };

  }

  async getPlayer(){

      try{
        await fetch(ip + "/players/getPlayer", {
                method: "POST",
                headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  userName: this.state.username,
                })
              })
                .then(response => response.text())
                .then(async responseJson => {
                  responseJson = JSON.parse(responseJson)
                  console.log("sssss", responseJson.response);
                  this.setState({player: responseJson.response})
                  this.setState({turn: responseJson.response.turn})
                  await AsyncStorage.setItem("balance", responseJson.response.balance.toString())
                })
                .catch(error => {
                  console.error(error);
                });
      }catch(err){
        console.log(err)
      }
  }
  async getPlayers(){

  try{
    await fetch(ip + "/players/getAllPlayers", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              gameCode: this.state.code,
            })
          })
            .then(response => response.text())
            .then(responseJson => {
              responseJson = JSON.parse(responseJson)
              console.log(responseJson);
            })
            .catch(error => {
              console.error(error);
            });
  }catch(err){
    console.log(err)
  }
  }

  handleCardLogic(val){
    if(val != null){
      //update balance
      console.log(parseInt(val))
    }
  }

  async getChance(){

    try{
      await fetch(ip + "/getChance", {
              method: "GET",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
            })
              .then(response => response.text())
              .then(async responseJson => {
                responseJson = JSON.parse(responseJson)
                console.log("cccc", responseJson.response);
                this.setState({cardText: responseJson.response.text})
                this.handleCardLogic(responseJson.response.action)
              })
              .catch(error => {
                console.error(error);
              });
    }catch(err){
      console.log(err)
    }
}

  rollDice(){
    var x = Math.floor((Math.random() * 12) + 1).toString();
    this.setState({ diceValue: x })
    this.setState({rolled: true})
    var delayInMilliseconds = 5000; //1 second

    setTimeout(function() {
      //your code to be executed after 1 second

      this.setState({rollMode: false})      
    }.bind(this), delayInMilliseconds);

    
  }

  async componentDidMount() {
    const un = await AsyncStorage.getItem("username")
    const gc = await AsyncStorage.getItem("gamecode")
    this.setState({username: un})
    this.setState({code: gc})
    this.getPermissionsAsync();
    await this.getPlayer()
    // await Font.loadAsync({
    //   'roboto-bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
    // });
    // this.setState({ fontLoaded: true });


    // setInterval(async () =>  (
    //   await this.getPlayer()), 5000);
    // try{
    //   setInterval(async () =>  (
    //       await this.getPlayer()), 5000);

    // }catch(err){
    //   console.log(err)
    // }

    


  }
  componentWillUnmount() {

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
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    
      if(!this.state.scanMode && !this.state.rollMode)
        return (
          <ImageBackground source={require("../assets/images/home5.png")} style={styles.root}>
              <Text style={styles.text}>{this.state.username + "'s"} </Text>
              <Text style={styles.text2}>TURN</Text>
              <Button transparent style={styles.button3} onPress={() => {this.props.navigation.navigate("Prop")}}><Text style={styles.btntext} >BUY PROPERTY</Text></Button>
              <Button transparent style={styles.button2} onPress={() => {this.changeTurn()}}><Text style={styles.btntext} >PAY RENT</Text></Button>
              <Button transparent style={styles.button1} onPress={() => {this.setScanMode()}}><Text style={styles.btntext} ></Text></Button>
          </ImageBackground>
        );
      if(this.state.rollMode && !this.state.scanMode){
        return (
          <ImageBackground source={require("../assets/images/roll2.png")} style={styles.root}>
              <Text style={styles.text}>{this.state.username + "'s"} </Text>
              <Text style={styles.text2}>TURN</Text>
              <Text style={styles.rolltxt}>{this.state.diceValue}</Text>
              <Button transparent style={styles.rollbtn} disabled={this.state.rolled} onPress={() => {this.rollDice()}}><Text style={styles.btntext2} >ROLL IT!</Text></Button>
          </ImageBackground>
          
        )
      }
      else
      if(this.state.scanMode && !this.state.rollMode)
        return (
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'flex-end',
            }}>
            <BarCodeScanner
              onBarCodeScanned={this.state.scanned ? undefined : this.handleBarCodeScanned}
              style={StyleSheet.absoluteFillObject}
            />
    
            {/* {this.state.scanned && (
              // <View style={styles.container}> */}
              <Dialog
              visible={this.state.scanned}
              dialogTitle={<DialogTitle title="Chance" />}
              style={styles.DialogStyle}
              width= '0.8'
              height='50%'
              >
                <DialogContent style={styles.DialogStyle}>
                  {/* <ImageBackground source={require("../assets/images/popup.png")} style={{width: '80%', height: '50%'}}></ImageBackground> */}
                  <Text style={styles.cardtxt}>{this.state.cardText}</Text>
                  <Button style={styles.cardbtn} onPress={() => {this.endScan()}}><Text style={styles.cardbtntxt}>OK!</Text></Button>
                </DialogContent>
              </Dialog>
          </View>
          //   )}
          // </View>
        );

  }

  async endScan(){
    // await this.setState({ scanMode: false })
    await this.setState({ scanned: false })
    console.log("yo", this.state.scanned)
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    console.log("jajgajhaj")
    // alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    this.state.qrCode = data
    if(data === 'Chance')
      this.getChance()

    console.log(this.state.qrCode)
  };
        

}


const styles = StyleSheet.create({
  button1: {
    
      // flex: 1,
      borderRadius: 10,
      // backgroundColor:'#5ECACA',
     width: 120,
    //  marginLeft:'35%',
     top:'110%',
     alignItems: 'center',
     justifyContent: 'center',
  },
  DialogStyle:{
    marginTop: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardtxt:{
    fontFamily: 'roboto-bold',
    fontSize: 20,
    color: '#3014AC'

  },
  cardbtn:{
    borderRadius: 10,
    backgroundColor:'#3014AC',
    width: 50,
    height: 30,
    //  marginLeft:'35%',
    // top:'110%',
    marginTop: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardbtntxt:{
    fontFamily: 'roboto-bold',
    color: '#FFFFFF',
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
   top:'61%',
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
    btntext2: {
      color: "#ffffff",
      fontSize: 30,
      fontFamily: "roboto-bold",
      textAlign: 'center',
      // fontWeight: "bold",
    },
    rolltxt:
    {
      fontFamily: "roboto-bold",
      top:'47%',
      fontSize: 70,
      textAlign: 'center',
      color:'#ffffff'
    },
    rollbtn: {
     width: 120,
    //  marginLeft:'35%',
     top:'110%',
     alignItems: 'center',
     justifyContent: 'center',
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
     top:'67%',
     alignItems: 'center',
     justifyContent: 'center',
     textAlign: 'center',
  }}
)
