import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native'

interface MyProps {

}

interface MyState {

}

export default class InfoBlock extends Component<MyProps, MyState> {
    constructor(props: any){
        super(props);
    }


render(){
    return(<Text style={styles.test}>testing component!!</Text>)
}
}

const styles = StyleSheet.create({
    test: {
        fontFamily: 'Futura',
        fontWeight: 'bold'
    }
})

