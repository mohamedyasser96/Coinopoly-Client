import React, { Component }  from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ImageBackground, AsyncStorage } from 'react-native';
import { Button } from 'native-base';
import { Accelerometer } from 'expo-sensors';
import { DeviceMotion } from 'expo-sensors';

const ip = "http://10.40.51.51:3000"

export default class BalanceScreen extends Component {

  static navigationOptions ={
    header:null
     // title: 'Registration Screen',
  };
  
  state = {
    username: '',
    balance: '0',
    fontLoaded: false,
  };

  async updateBalance(){
    this.getPlayer()
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
                userName: await AsyncStorage.getItem('username'),
              })
            })
              .then(response => response.text())
              .then(async responseJson => {
                responseJson = JSON.parse(responseJson)
                console.log("sssss", responseJson.response);
                this.setState({balance: responseJson.response.balance})
              })
              .catch(error => {
                console.error(error);
              });
    }catch(err){
      console.log(err)
    }
}

  async componentDidMount() {
    // this.state.balance = await AsyncStorage.getItem("balance")
    // await Font.loadAsync({
    //   'roboto-bold': require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
    // });
    // console.log(this.state.fontLoaded)
    // this.setState({ fontLoaded: true });
    setInterval( () =>  (
      this.updateBalance()), 5000);
  }

  
  
  
  render() {
    // if(this.state.fontLoaded)
      return (
        <ImageBackground source={require("../assets/images/balanceScreen2.png")} style={styles.root}>
            <Text style={styles.text}> {this.state.balance}</Text>
            {/* <Button style={styles.button3} onPress={() => {this.updateBalance()}}><Text style={styles.btntext}>Refresh</Text></Button> */}
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
  button3: {
      
    // flex: 1,
  borderRadius: 10,
  backgroundColor:'#5ECACA',
   width: 100,
  //  marginLeft:'22%',
   top:'110%',
   alignItems: 'center',
   justifyContent: 'center',
},
btntext: {
  color: "#ffffff",
  // fontSize: 26,
  fontFamily: "roboto-bold",
  // fontWeight: "bold",
},
});