import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Modal,
    PixelRatio,
    View
} from 'react-native';
import { Scene } from 'UIKit';
import { Icon } from 'UIcon';


export default class Index extends Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            animationType: 'none',//none slide fade
            modalVisible: false,
            transparent: true,
        };
    }

    render() {
        let modalBackgroundStyle = {
            backgroundColor: this.state.transparent ? 'rgba(0, 0, 0, 0.5)' : 'red',
        };
        let innerContainerTransparentStyle = this.state.transparent
            ? { backgroundColor: '#fff', padding: 20 }
            : null;

        return (
            <Scene header={'弹窗'} hasBack={true} style={styles.body}>
                <View style={{ alignItems: 'center', flex: 1 }}>
                    <Modal
                        animationType={this.state.animationType}
                        transparent={this.state.transparent}
                        visible={this.state.modalVisible}
                        onRequestClose={() => { this._setModalVisible(false) }}
                    >
                        <View style={[styles.container, modalBackgroundStyle]}>
                            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                                <Text
                                    onPress={this._setModalVisible.bind(this, false)}
                                    style={{ fontSize: 20, marginTop: 10 }}>
                                    关闭
                                </Text>
                                <View>
                                    <Icon onPress={() => this._setModalVisible(false)} name={'antDesign|closecircleo'} size={20} color={'#9b9b9b'} />
                                </View>
                            </View>
                        </View>
                    </Modal>
                    <Text style={{ fontSize: 30, color: 'red' }} onPress={this._setModalVisible.bind(this, true)}>弹出</Text>
                </View>
            </Scene>
        );
    }

    _setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }
}


const styles = StyleSheet.create({
    body:{
        flex: 1,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    innerContainer: {
        borderRadius: 10,
        height: 400,
        alignItems: 'center',

        // borderWidth: 1,
        // borderColor: 'red',
    },
    row: {
        alignItems: 'center',

        flex: 1,
        flexDirection: 'row',
        marginBottom: 20,
    },
    rowTitle: {
        flex: 1,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 5,
        flex: 1,
        height: 44,
        alignSelf: 'stretch',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    buttonText: {
        fontSize: 18,
        margin: 5,
        textAlign: 'center',
    },

    page: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
    },
    zhifu: {
        height: 150,
    },

    flex: {
        flex: 1,
    },
    at: {
        borderWidth: 1 / PixelRatio.get(),
        width: 80,
        marginLeft: 10,
        marginRight: 10,
        borderColor: '#18B7FF',
        height: 1,
        marginTop: 10

    },
    date: {
        textAlign: 'center',
        marginBottom: 5
    },
    station: {
        fontSize: 20
    },
    mp10: {
        marginTop: 5,
    },
    btn: {
        width: 60,
        height: 30,
        borderRadius: 3,
        backgroundColor: '#FFBA27',
        padding: 5,
    },
    btn_text: {
        lineHeight: 18,
        textAlign: 'center',
        color: '#fff',
    },
});