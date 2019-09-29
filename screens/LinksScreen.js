import * as React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import { Card, CardTitle, CardContent, CardAction, CardButton, CardImage } from 'react-native-cards';

export default class BarcodeScannerExample extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
  };

  async componentDidMount() {
  }

  

  render() {
    const { hasCameraPermission, scanned } = this.state;

    return(
      <ScrollView>
 
        <Card>
          <CardImage 
            source={{uri: 'http://bit.ly/2GfzooV'}} 
            title="Yasser Mall"
          />
          <CardTitle
            subtitle="Yasser Mall"
          />
          <CardContent text="Clifton, Western Cape" />
          <CardAction 
            separator={true} 
            inColumn={false}>
            <CardButton
              onPress={() => {}}
              title="Buy"
              color="#FEB557"
            />
            <CardButton
              onPress={() => {}}
              title="Rent"
              color="#FEB557"
            />
          </CardAction>
        </Card>
        <Card>
          <CardImage 
            source={{uri: 'http://bit.ly/2GfzooV'}} 
            title="Oufi Shit"
          />
          <CardTitle
            subtitle="Oufi Shit"
          />
          <CardContent text="cairo, Egypt" />
          <CardAction 
            separator={true} 
            inColumn={false}>
            <CardButton
              onPress={() => {console.log("aa")}}
              title="Buy"
              color="#FEB557"
            />
            <CardButton
              onPress={() => {}}
              title="Rent"
              color="#FEB557"
            />
          </CardAction>
        </Card>
      
</ScrollView>
    );
  }

  
}
