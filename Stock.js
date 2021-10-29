import { StatusBar } from "expo-status-bar";
import React, { useEffect, useReducer, useState } from "react";
// import styles from "./App.css";
import { StyleSheet, Text, View } from "react-native";
import Plot from 'react-plotly.js';
import { SafeAreaView, TextInput, Button} from "react-native";
import axios from "axios";
import { Dimensions } from 'react-native';




export default function Stock() {

  const {width, height} = Dimensions.get('window');
  const StockSymbol = "FB";
  const API_KEY = "VF87SL5QMSWYG57Z";
  let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;

  
  const [ data, setData]= useState([]);
  let [search,setSearch]=useState([]);
  //const [ stockChartYValues, setstockChartYValues]=useState([])
  let SearchURL=`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${search}&outputsize=compact&apikey=${API_KEY}`;

  // const handleSearch= aysnc ()=>{
     
  //   const result = await axios.get(SearchURL);
  // };


async function handleSearch(){
 return await axios.get(SearchURL).then(res=>{

    setData(res.data);
    console.log("values",res.data);
   })
 // console.log(search);
}
 


useEffect(async()=>{
  await axios.get(API_Call).then(res=>{

    setData(res.data);
    console.log("values",res.data);
   })
  //  setDimensions(getWindowDimensions());
  
},[])
// function handleChange(e){
//   setSearch({...search,[e.target.id]:e.target.value})
//   console.log(search);

// }
  
console.log(search);
function transformData (data) {
  if(data === undefined) 
  
  
  {return}
  else{
   let  plot_data = [];

  let x = [];
  let y = [];

   data['Time Series (Daily)']&& Object.keys(data['Time Series (Daily)']).map(key => {
    x.push(key)
    y.push(data['Time Series (Daily)'][key]['1. open'])
  })
  plot_data['x'] = x;
  plot_data['y'] = y;

  console.log(plot_data)

  return plot_data

  }
  
}


   
  

  return (
    <View style={styles.container}>
      <Text>Stock App</Text>
     {
      data["Meta Data"]&& Object.keys(data["Meta Data"]).map(stockname=>{
        <Text>{stockname["2. Symbol"]}</Text>
      })
    } 
    


  
      <TextInput 
       id="search"
      placeholder="Search stock by NASDAQ Keyword..."
      onChangeText={text => setSearch(text)}
      value={search}
      />
      {"\n"}
       <Button
        title="Search"
       
        name="search"
       
        onPress={handleSearch}
        color="#f194ff"
        
      />

Search For :{search}
     <Plot data = {[
							{type: 'scatter',
							 mode: 'lines+markers',
							 x: transformData(data)['x'],
							 y: transformData(data)['y'],
							 marker: { color: 'cyna'}},
              
						]}
            layout= {{
              useResizeHandler: true,
              autosize: true,
              style: {width: "100%", height: "100%"},
            width:Dimensions.get('window').width,
            height:Dimensions.get('window').height

            
              }}
            
				 />
          
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 20,
    justifyContent: "center",
    width:"100%",

  },
});
