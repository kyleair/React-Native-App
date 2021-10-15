import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from 'react-native';
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
  // fetch("https://odds.p.rapidapi.com/v1/odds?sport=americanfootball_nfl&region=us&mkt=h2h&dateFormat=iso&oddsFormat=american", {
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-host": "odds.p.rapidapi.com",
  //     "x-rapidapi-key": "86a584335bmshc19523db0e51bbfp11a759jsnb08a99cb55ba"
  //   }
  // })
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           isLoaded: true,
  //           databruh: result.data
  //         });
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         this.setState({
  //           isLoaded: true,
  //           error
  //         });
  //       }
  //     )
 this.setState({
   isLoaded: true,
   databruh: goodd.data
 })
}

render(){
  const { error, isLoaded, databruh } = this.state;
    if (error) {
      return <SafeAreaView><Text>Error: {error.message}</Text></SafeAreaView>;
    } else if (!isLoaded) {
      return <SafeAreaView><Text>Loading...</Text></SafeAreaView>;
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <Text style={styles.header}>
              NFL Betting Odds
            </Text>
          {databruh.map((game) => {
            let avg_odds_zero=0
            let best_odds_zero=game.sites[0].odds.h2h[0]
            let avg_odds_one=0
            let best_odds_one=game.sites[0].odds.h2h[1]
            let best_site_zero=game.sites[0].site_nice
            let best_site_one=game.sites[1].site_nice

            //loop through all sites keeping track of best odds and adding all odds for avg calculation (adding in decimal format)
            game.sites.map((site) => {
              if (site.odds.h2h[0] > best_odds_zero){
                best_odds_zero = site.odds.h2h[0] 
                best_site_zero = site.site_nice
              }
              if (site.odds.h2h[1] > best_odds_one){
                best_odds_one = site.odds.h2h[1]
                best_site_one = site.site_nice
              }
              if(site.odds.h2h[0]>0){
                avg_odds_zero += 1+(site.odds.h2h[0]/100)
              }
              else {
                avg_odds_zero += 1-(100/site.odds.h2h[0])
              }
              if(site.odds.h2h[1]>0){
                avg_odds_one += 1+(site.odds.h2h[1]/100)
              } 
              else {
                avg_odds_one += 1-(100/site.odds.h2h[1])
              }
            })

            //normalize odds to average and convert to american format
            avg_odds_zero = avg_odds_zero/game.sites_count
            avg_odds_one = avg_odds_one/game.sites_count
            if(avg_odds_zero>=2) {avg_odds_zero = Math.round((avg_odds_zero-1)*100)}
            else {avg_odds_zero = Math.round(-100/(avg_odds_zero-1))}
            if(avg_odds_one>=2) {avg_odds_one = Math.round((avg_odds_one-1)*100)}
            else {avg_odds_one = Math.round(-100/(avg_odds_one-1))}

           return(<View style={styles.gamebox}><Text>{'\n'}
              {game.teams[0]}{'\n'}(Avg: {(avg_odds_zero<=0?"":"+")}{avg_odds_zero} | Best: {(best_odds_zero<=0?"":"+")}{best_odds_zero} @{best_site_zero}){'\n'}vs{'\n'}
              {game.teams[1]}{'\n'}(Avg: {(avg_odds_one<=0?"":"+")}{avg_odds_one} | Best: {(best_odds_one<=0?"":"+")}{best_odds_one} @{best_site_one}){'\n'}
              </Text>
              <Text>
                Game @ {game.home_team}
              </Text>
              </View>) 
          })}
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#86BBC7'
  },
  header: {
    textAlign: 'center',
    fontWeight: 'bold',
    backgroundColor: '#DFF4F9',
    margin:15,
    padding:10,
  },
  gamebox: {
    borderWidth: 0.5,
    borderColor:'black',
    margin:15,
    backgroundColor: '#DFF4F9'
  }
});
