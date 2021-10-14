import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import goodd from './data2.json';


export default class App extends Component {
  constructor(props:any) {
    super(props);
    this.state = {
      databruh: [],
      isLoaded: false
  }
}

componentDidMount() {
  fetch("https://odds.p.rapidapi.com/v1/odds?sport=americanfootball_nfl&region=us&mkt=h2h&dateFormat=iso&oddsFormat=american", {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "odds.p.rapidapi.com",
      "x-rapidapi-key": "86a584335bmshc19523db0e51bbfp11a759jsnb08a99cb55ba"
    }
  })
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            databruh: result.data
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
//  this.setState({
//    isLoaded: true,
//    databruh: goodd.data
//  })
}
render(){
  const { error, isLoaded, databruh } = this.state;
    if (error) {
      return <SafeAreaView><Text>Error: {error.message}</Text></SafeAreaView>;
    } else if (!isLoaded) {
      return <SafeAreaView><Text>Loading...</Text></SafeAreaView>;
    } else {
      return (
        // <SafeAreaView>
        //   {databruh[0].teams.map((team) => {
        //     return(<Text>{team}</Text>)
        //   })} 
        // </SafeAreaView>
        <SafeAreaView>
          {databruh.map((game) => {
           return(<Text>
              {game.teams[0]} ({game.sites[0].odds.h2h[0]}) vs {game.teams[1]}{'\n'}
              </Text>) 
          })}
        </SafeAreaView>
      );
    }
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  header: {
    flex: 0.1,
    alignSelf: 'center'
  },
  weekheader: {
    flex: 0.1,
  },
  teamlist: {
    padding: 25,
  }
});
