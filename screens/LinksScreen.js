import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, AsyncStorage, Modal, TouchableHighlight, Alert, ImageBackground, Image } from 'react-native';
import Constants from 'expo-constants';
// import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';
import { Card, Icon } from 'react-native-elements';
import { Button } from 'native-base';
const ip = "http://192.168.1.10:3000"

export default class PropertiesScreen extends React.Component {
  static navigationOptions ={
    header:null
     // title: 'Registration Screen',
  };

  state = {
    properties: [],
    myProperties: [],
    modalVisible: false,
    questionMode: false,
    question: '',
    answers: [],
    correct: false,
    bal: '',
    propid: ''
  };


  
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  async componentDidMount() {
    await this.getAllProperties()
  }

  async checkAnswer(ans){
    if(ans.correct === true){
      try{
        await this.buyProperty()
        await AsyncStorage.setItem("turn", "false")
        alert(`Answer ${ans.text} is correct, purchase successful! 

          Fun fact: The first official egyptian currency was minted and issued for circulation in 1836, Before the first official egyptian pound was minted, the main currency in circulation was the ‘Turkish qersh’. The first egyptian paper banknote was issued in April of 1899. It was worth 1 EGP = 0.97 GBP.`);

      }catch(err){
        alert(`Error ${err}!`);
      }
    }
    else 
      alert(`Answer ${ans.text} is incorrect, purchase unsuccessful!`);
    
    //end turn
    this.setState({questionMode: false})

    
  }

  async getAllProperties(){
    try{
      await fetch(ip + "/properties", {
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
                console.log("HEYY", responseJson.response);
                // this.properties = responseJson.response
                this.setState({properties: responseJson.response})

              })
              .catch(error => {
                console.error(error);
              });
    }catch(err){
      console.log(err)
    }
  }

  async buyProperty(){
    var un = await AsyncStorage.getItem("username")
    try{
      await fetch(ip + "/properties/buy", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                username: un,
                id: this.state.propid
              })
            })
              .then(response => response.text())
              .then(responseJson => {
                responseJson = JSON.parse(responseJson)
                console.log("HEYY", responseJson);
                this.state.myProperties.push(responseJson.response)
              })
              .catch(error => {
                console.error(error);
              });
    }catch(err){
      console.log(err)
    }
  }
  async handleLogic(propid, val){
    this.getQuestion(propid)
    this.state.bal = val
    this.state.propid = propid
    this.setState({questionMode: true})
    // this.setModalVisible(true)

  }
  async rentProperty(propid){
    console.log("RENT")
  }
  async getQuestion(propid){
    try{
      await fetch(ip + "/questions/randomQuestion", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                propertyId: '1'
              })
            })
              .then(response => response.text())
              .then(responseJson => {
                responseJson = JSON.parse(responseJson)
                console.log("HEYY", responseJson);
                this.setState({question: responseJson.response.Question.text})
                this.setState({answers: responseJson.response.Answers})
                console.log(this.state.answers)

              })
              .catch(error => {
                console.error(error);
              });
    }catch(err){
      console.log(err)
    }
  }

  

  render() {
    // const propertiesList = this.state.properties
    if(!this.state.questionMode)
      return(
        <ScrollView style={{marginTop:'20%'}}>

          
            {
              this.state.properties.map(property => (
              //   <Card >
              //   <CardImage 
              //     source={{uri: 'http://bit.ly/2GfzooV'}} 
              //     title={property.name}
              //   />
              //   <CardTitle
              //     subtitle={"Value: "+ property.Value + "   Rent Value: " + property.rentValue}
              //   />
              //   <CardContent text={property.info} />
              //   <CardAction 
              //     separator={true} 
              //     inColumn={false}>
              //     <Button style={styles.button1} onPress={() => {this.handleLogic(property.id, property.Value)}} ><Text style={styles.btntext}>BUY</Text></Button>
              //     <Button style={styles.button2} onPress={() => {this.rentProperty(property.id)}} disabled={!property.owner}><Text style={styles.btntext2}>RENT</Text></Button>
              //   </CardAction>
              // </Card>
              <Card
                  title={property.name}
                  image={{uri: property.url}}
                  >
                      <Image source={require("../assets/images/valIcon.png")} style={{marginLeft: '25%'}}></Image>
                    <View style={{position: 'absolute', top: '18%', left: '10%', right: 0, bottom: 0, alignItems: 'center'}}>
                      <Text style={{color: '#FFFFFF', fontFamily: 'roboto-bold', fontSize: '18'}}>{property.Value}</Text>
                    </View>
                  <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.renttxt}>
                        RENT VALUE
                      </Text>
                      <Text style={styles.rentVal}>
                        {property.rentValue}
                      </Text>
                  </View>
                  

                  <View style={{ flexDirection: 'row' }}>
                  
                    <Button style={styles.button1} onPress={() => {this.handleLogic(property.id, property.Value)}} ><Text style={styles.btntext}>BUY</Text></Button>
                    <Button style={styles.button2} onPress={() => {this.rentProperty(property.id)}} disabled={!property.owner}><Text style={styles.btntext}>RENT</Text></Button>
                  </View>
                </Card>

              ))
            }

            <Text style={{alignSelf: "center", color:"Black", paddingBottom: '10%', paddingTop: '10%', fontFamily: 'roboto-light'}}>MY PROPERTIES</Text>

            {
              this.state.myProperties.map(property => (
                <Card
                  title={property.name}
                  image={{uri: property.url}}
                  >
                      <Image source={require("../assets/images/valIcon.png")} style={{marginLeft: '25%'}}></Image>
                    <View style={{position: 'absolute', top: '18%', left: '10%', right: 0, bottom: 0, alignItems: 'center'}}>
                      <Text style={{color: '#FFFFFF', fontFamily: 'roboto-bold', fontSize: '18'}}>{property.Value}</Text>
                    </View>
                  <View style={{ flexDirection: 'row' }}>
                      <Text style={styles.renttxt}>
                        RENT VALUE
                      </Text>
                      <Text style={styles.rentVal}>
                        {property.rentValue}
                      </Text>
                  </View>
                  

                  <View style={{ flexDirection: 'row' }}>
                  
                    <Button style={styles.button1} onPress={() => {this.handleLogic(property.id, property.Value)}} ><Text style={styles.btntext}>SELL</Text></Button>
                  </View>
                </Card>

              ))
            }

          
        
          </ScrollView>
        //   <View style={{marginTop: 22}}>
          
        // </View>
      );
    if(this.state.questionMode){
      return(
        // <Modal
        //           animationType="slide"
        //           transparent={false}
        //           visible={this.state.modalVisible}
        //           onRequestClose={() => {
        //             Alert.alert('Modal has been closed.');
        //           }}>
                  <ImageBackground source={require("../assets/images/qs.png")} style={StyleSheet.absoluteFillObject, {alignItems: 'center'}}>
                    <Text style={styles.baltxt}>{this.state.bal}</Text>
                    <Text style={styles.questiontxt}>{this.state.question}</Text>
                    <View style={{marginTop: '30%'}}>
                      {
                        this.state.answers.map(answer =>(
                          <Button style={styles.answerbtn} onPress={() => {this.checkAnswer(answer)}}><Text style={styles.answertxt}>{answer.text}</Text></Button>
                        ))
                      }

                    </View>
                  </ImageBackground>

          // </Modal>
      )
    }

    
  }

  
}

const styles = StyleSheet.create({
root: {
  // 
  alignItems: 'center',
  // justifyContent: 'center',
},
questiontxt:{
  color: "#5ECACA",
  fontSize: 17,
  fontFamily: "roboto-light",
  marginTop: '20%',
  marginLeft: '15%',
  marginRight:'15%',
  marginBottom: '10%'
},
renttxt:{
  color: "#62D7C5",
  fontSize: 20,
  fontFamily: "roboto-bold",
  marginTop: '5%',
  marginLeft: '5%',
  marginRight: '50%', // marginRight:'15%',
  marginBottom: '10%'
},
rentVal:{
  color: "#62D7C5",
  fontSize: 20,
  fontFamily: "roboto-bold",
  marginTop: '5%',
  // alignSelf: 'flex-end'
  // marginLeft: '5%',
  // marginRight:'15%',
  marginBottom: '10%'
},
baltxt:{
  color: '#FFFFFF',
  fontFamily: "roboto-bold",
  fontSize: 22,
  marginTop: '30%',
  marginLeft:'10%'
},
answerbtn:{
  marginLeft:'10%',
  marginRight: '10%',
  marginBottom: 22,
  backgroundColor: '#3014AC',
  width: 310,
  height: 45,
  alignItems: 'center',
  justifyContent: 'center',
},
answertxt:{
  color:"#FFFFFF",
  fontSize: 18,
  fontFamily: "roboto-light",
  
},
button1: {
  
  // flex: 1,
  backgroundColor:'#62D7C5',
  marginRight: '8%',
  width: 150,
  height: 50,
//  marginLeft:'33%',
  borderRadius:20,
//  top:'130%',
  alignItems: 'center',
  justifyContent: 'center',
},

btntext: {
    color: "#ffffff",
    fontSize: 18,
    fontFamily: "roboto-bold",
    // fontWeight: "bold",
  },
btntext2: {
  color: "#5ECACA",
  fontSize: 18,
  fontFamily: "roboto-light",
  // fontWeight: "bold",
},
text: {
  color: "#696463",
  // marginLeft:'40%',
  alignItems: 'center',
  justifyContent: 'center',
  top:'50%',
  fontSize: 26,
  fontFamily: "roboto-light",
  // fontWeight: "bold",
},
button2: {
  
    // flex: 1,
    backgroundColor:'#3014AC',
    width: 150,
    height: 50,
    borderRadius:20,
    borderColor: '#5ECACA',
  //  marginLeft:'50%',
    alignItems: 'center',
    justifyContent: 'center',
    // top:'140%',
    // alignItems: 'center',
    // justifyContent: 'center',
},
    textinput:{
        // alignSelf: 'stretch',
        // marginLeft:'40%',
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

