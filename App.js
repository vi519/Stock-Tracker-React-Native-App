import { StatusBar } from 'expo-status-bar';
import React from 'react';
// import styles from "./App.css";
import { StyleSheet, Text, View } from 'react-native';
import Stock from './Stock';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Vineet Welcome You!


      </Text>
      <Stock/>
    
      <StatusBar style="auto" />

      

    </View>

    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    

  },
});
