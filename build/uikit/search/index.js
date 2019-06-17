import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'UIcon';
export default class Index extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { onPress, placeholder } = this.props;
        return (<View style={styles.search}>
        <TouchableOpacity onPress={onPress} style={styles.input}>
          <View style={{
            width: 30,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 3,
        }}>
            <Icon name={'antDesign|search1'} size={20} color={'#d4d4d4'}/>
          </View>
          <Text numberOfLines={1} style={styles.placeholder}>
            {placeholder}
          </Text>
        </TouchableOpacity>
      </View>);
    }
}
const styles = StyleSheet.create({
    search: {
        height: 58,
        justifyContent: 'center',
    },
    input: {
        height: 36,
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 18,
        borderWidth: 0,
        borderColor: '#979797',
        borderStyle: 'solid',
        backgroundColor: 'white',
        shadowColor: 'grey',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.2,
        elevation: 4,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 48,
    },
    placeholder: {
        color: '#d4d4d4',
        fontFamily: 'PingFangSC-Regular',
    },
});
