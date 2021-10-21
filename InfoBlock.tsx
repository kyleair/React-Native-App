import React, { Component } from 'react';
import { StyleSheet, Text, Image, View } from 'react-native'
import logos from './imageloader'

interface MyProps {
    infoBoxOpen: boolean
}

interface MyState {

}

export default class InfoBlock extends Component<MyProps, MyState> {
    constructor(props: any){
        super(props);
    }


render(){
    return(<View style={{ flexDirection: 'row', alignSelf: 'center', paddingTop:15 }}>
    <Text style={styles.test}>Where does this data come from? </Text><Image source={this.props.infoBoxOpen?logos['uparrow']:logos['downarrow']} style={styles.arrowicon}/>
    </View>)
}
}

const styles = StyleSheet.create({
    test: {
        fontFamily: 'Futura',
        fontWeight: 'bold',
        fontSize:16,
        padding: 10,
        paddingRight:0,
        paddingTop:8,
        alignItems: 'center'
    },
    arrowicon: {
        width:20,
        height:20,
        alignSelf: 'center'
    }
})

