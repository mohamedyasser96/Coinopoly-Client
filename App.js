import React from 'react';

import {createStackNavigator, createAppContainer} from 'react-navigation';
import FirstScreen from "./screens/Home.js"
import CodeScreen from "./screens/CreateCode.js"
import JoinScreen from "./screens/joinGame.js"
import ScanQR from "./screens/scanQR"
// import SecondScreen from "./app/components/Register"
import MainScreen from "./screens/Tabs"
import Props from "./screens/LinksScreen.js"



  const MainNavigator = createStackNavigator({
    First: {screen:  FirstScreen},
    Code: {screen: CodeScreen},
    Join: {screen: JoinScreen},
    Main: {screen: MainScreen},
    Scan: {screen: ScanQR},
    Prop: {screen: Props}
  },
    {
      headerMode: 'none',
      navigationOptions: {
        header: null
      }
    }
  );
  const App = createAppContainer(MainNavigator);

  export default App;
