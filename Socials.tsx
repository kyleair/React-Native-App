import React, { Component } from 'react';
import { StyleSheet, Alert, Linking, Text, View } from 'react-native'
import { SocialIcon } from 'react-native-elements'

interface MyProps {

}

interface MyState {

}

export default class Socials extends Component<MyProps, MyState> {
    constructor(props: any){
        super(props);
    }



render(){
    return(
        <View>
        <Text style={ styles.textstyle}>Developer's Socials</Text>
        <View style={styles.container}>
    <SocialIcon type='github' onPress={()=> Linking.openURL('https://github.com/kyleair/React-Native-App')}/>
    <SocialIcon type='linkedin' onPress={()=> Linking.openURL('https://www.linkedin.com/in/kyle-air-813853164/')}/>
    <SocialIcon type='envelope' onPress={()=> Linking.openURL('mailto:kyleair8@gmail.com')}/>
    <SocialIcon type='twitter' onPress={()=> Linking.openURL('https://twitter.com/riaelyk')}/>
    </View></View>
    )
}
}

const styles = StyleSheet.create({
    textstyle: {
        fontFamily: 'Futura',
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10
    },
    container: {
        flexDirection: 'row',
        alignSelf: 'center'
    }
})