import React from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { SplashScreen } from 'expo';
import { Asset } from 'expo-asset';

export default class App extends React.Component {
  state = {
    isReady: false,
  };

  disableSplash(){
    var i;
    for(i = 0; i < 100; i++){
      console.log(this.state)
    }
    this.setState({ isReady: true})
  }

  componentDidMount() {
    SplashScreen.preventAutoHide();
    
  }

  render() {
    if (!this.state.isReady) {
      return (
        <View style={{ flex: 1 }}>
          <Image
            style={styles.image}
            source={require('../assets/images/splash2.png')}
          />
        </View>
      );
    }

    return (
      <View style={{ flex: 1 }}>
        <Image source={require('../assets/images/robot-dev.png')} />
        <Image source={require('../assets/images/robot-dev.png')} />
      </View>
    );
  }

  _cacheResourcesAsync = async () => {
    this.disableSplash()
    SplashScreen.hide();
  };


  };


  const styles = StyleSheet.create({
    image: {
      height: '100%',
      width: '100%',
      position: "absolute",
    },
  })
