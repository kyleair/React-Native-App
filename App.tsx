import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Image, TouchableOpacity } from 'react-native';
import goodd from './data2.json';
import key from './apikey.json';
import logos from './imageloader';
import InfoBlock from './InfoBlock'

interface MyProps {

}

interface MyState {
  nfldata: any, 
  isLoaded: boolean, 
  darkMode: boolean
  error: any
}

export default class App extends Component<MyProps, MyState> {
  constructor(props:any) {
    super(props);
    this.state = {
      nfldata: [],
      isLoaded: false,
      darkMode: false,
      error:''
  }
}

componentDidMount() {
  // fetch("https://odds.p.rapidapi.com/v1/odds?sport=americanfootball_nfl&region=us&mkt=h2h&dateFormat=iso&oddsFormat=american", {
  //   "method": "GET",
  //   "headers": {
  //     "x-rapidapi-host": "odds.p.rapidapi.com",
  //     "x-rapidapi-key": key.x_rapidapi_key
  //   }
  // })
  //     .then(res => res.json())
  //     .then(
  //       (result) => {
  //         this.setState({
  //           isLoaded: true,
  //           nfldata: result.data
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
   nfldata: goodd.data
 })
 }
toggleDarkMode(){
  this.setState({
    darkMode: !this.state.darkMode
  })
}

render(){
  const { error, isLoaded, nfldata } = this.state;
  var { darkMode } = this.state
    if (error) {
      return <SafeAreaView><Text>Error: {error.message}</Text></SafeAreaView>;
    } else if (!isLoaded) {
      return <SafeAreaView><Text>Loading...</Text></SafeAreaView>;
    } else {
      return (
        <SafeAreaView style = { [styles.container, darkMode?{backgroundColor: '#212121'}:{}]}>
          <ScrollView>
            <View style={[styles.header, darkMode?{borderBottomColor: '#D9CAB3'}:{}]}>
            <View style={ [styles.titlewrapper, darkMode?{backgroundColor: '#A2DBFA'}:{}]}>
            <Text style={styles.title}>
             NFL Betting Odds
            </Text></View>

            <TouchableOpacity onPress={()=>{this.toggleDarkMode()}}  style={ [styles.button, darkMode? {backgroundColor:'#A2DBFA'}:{}] }>
              <Text style={ styles.buttontext }>{darkMode? 'Light Mode':'Dark Mode'} <Image source={darkMode?logos['sun']:logos['moon']} style={styles.buttonlogo}/></Text>
            </TouchableOpacity>
            </View>
            <View style={styles.body}>
          {nfldata.map((game) => {
            let avg_odds_zero=0
            let best_odds_zero=game.sites[0].odds.h2h[0]
            let avg_odds_one=0
            let best_odds_one=game.sites[0].odds.h2h[1]
            let best_site_zero=game.sites[0].site_nice
            let best_site_one=game.sites[1].site_nice
            let date = new Date(game.commence_time)
            let dateString = date.toLocaleTimeString();
            dateString = dateString.slice(0, dateString.length-6) + dateString.slice(dateString.length-3)+', '+date.toDateString().slice(0,date.toDateString().length-5)
            let team_zero_path = game.teams[0].split(' ').join('').toLowerCase()
            let team_one_path = game.teams[1].split(' ').join('').toLowerCase()

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

           return(<View style={ [styles.gamebox, darkMode?{backgroundColor: '#A2DBFA'}:{}]}>
             <View style={styles.oddsboxWrapper}><Image source={logos[team_zero_path]} style={styles.logostyle}/>
             <Text style={styles.oddsbox}>
              {game.teams[0]}{'\n'}(Avg: {(avg_odds_zero<=0?"-":"+")}{avg_odds_zero} | Best: {(best_odds_zero<=0?"-":"+")}{best_odds_zero} at {best_site_zero})
              </Text></View>
              <Text style={{fontFamily: 'Futura', paddingLeft: 55, fontWeight: 'bold'}}>vs</Text>
              <View style={[styles.oddsboxWrapper, {borderBottomWidth: 1, borderBottomColor: 'black'}]}><Image source={logos[team_one_path]} style={styles.logostyle}/>
              <Text style={styles.oddsbox}>
              {game.teams[1]}{'\n'}(Avg: {(avg_odds_one<=0?"-":"+")}{avg_odds_one} | Best: {(best_odds_one<=0?"-":"+")}{best_odds_one} at {best_site_one})
              </Text></View>
              <Text style={styles.hometeambox}>
                Game at {game.home_team}{'\n'}{dateString}
              </Text>
              </View>) 
          })}
          </View>
          <View style={styles.footer}>
          <View style={styles.gamebox}>
            <Text style={styles.hometeambox}>Where did this data come from?</Text>
            <InfoBlock></InfoBlock>
          </View>
          </View>
          </ScrollView>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#368B85',
  },
  titlewrapper: {
    backgroundColor: '#E8F0F2',
    padding:10,
    margin:10,
    borderRadius:20,
    borderWidth: 1,
    borderColor:'black'
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
  },
  header: {
    borderBottomColor: 'black',
    borderBottomWidth: 3,
    padding:10
  },
  body: {
    padding: 10
  },
  footer: {

  },
  gamebox: {
    borderWidth: 1,
    borderColor:'black',
    borderRadius:25,
    margin:8,
    paddingBottom: 3,
    backgroundColor: '#E8F0F2',
  },
  oddsboxWrapper: {
    padding:10,
    flexDirection: 'row',
  },
  oddsbox: {
    fontFamily: 'Futura',
    flexDirection: 'row',
    marginLeft: 15,
    alignSelf: 'center'
  },
  hometeambox: {
    padding:10,
    paddingLeft:20,
    paddingVertical: 5,
    fontFamily: 'Futura'
  },
  logostyle: {
    width:50, 
    height:50,
  },
  button: {
    backgroundColor: "#E8F0F2",
    borderRadius: 25,
    padding: 7,
    margin: 10,
    borderWidth: 1,
    borderColor:'black',
    alignSelf: 'flex-start',
  },
  buttontext: {
    fontFamily: 'Futura',
  },
  buttonlogo: {
    height: 15,
    width: 15,
    paddingStart: 19,
  }
});
