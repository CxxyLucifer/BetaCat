import React, { Component } from 'react';
import { View, Text, StyleSheet, ViewStyle, TouchableOpacity, TextStyle } from "react-native";
import { Icon } from 'UIcon';

export default class ToDo extends Component<any, any> {

    render() {
        return (
            <View style={styles.content}>
                <View style={styles.item}>
                    <TouchableOpacity style={[styles.cicleView, { backgroundColor: '#fb996b' }]}>
                        <Icon name={'myIcon|icon-daikexiadan'} size={30} color={'white'} />
                    </TouchableOpacity>
                    <View style={styles.warning}>
                        <Text style={styles.warningTxt}>1</Text>
                    </View>
                    <Text style={styles.font}>代办</Text>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity style={[styles.cicleView, { backgroundColor: '#07cce3' }]}>
                        <Icon name={'materialCommunity|alarm-light'} size={30} color={'white'} />
                    </TouchableOpacity>
                    <View style={styles.warning}><Text style={styles.warningTxt}>20</Text></View>
                    <Text style={styles.font}>预警</Text>
                </View>
                <View style={styles.item}>
                    <TouchableOpacity style={[styles.cicleView, { backgroundColor: '#8591fe' }]}>
                        <Icon name={'fontAwesome|bell'} size={30} color={'white'} />
                    </TouchableOpacity>
                    <View style={styles.warning}>
                        <Text style={styles.warningTxt}>100</Text>
                    </View>
                    <Text style={styles.font}>通知</Text>
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    content: {
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5,
        height: 70,
        flexDirection: 'row',
    } as ViewStyle,
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    } as ViewStyle,
    cicleView: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
        marginBottom: 10,
        shadowColor: 'grey',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8,
        elevation: 4,
    } as ViewStyle,
    warning: {
        height: 18,
        top: 0,
        right: 28,
        elevation: 4,
        paddingLeft: 6,
        paddingRight: 6,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        position: 'absolute',
        backgroundColor: 'red',
    } as ViewStyle,
    warningTxt: {
        fontSize: 12,
        color: 'white',
    } as TextStyle,
    font: {
        fontSize: 12,
        color: '#333333',
        fontFamily: 'PingFangSC-Regular'
    } as TextStyle,
});