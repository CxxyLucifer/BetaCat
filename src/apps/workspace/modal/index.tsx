import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    Modal,
    View,
    TouchableOpacity
} from 'react-native';
import { Scene, Theme, Button} from 'UIKit';
import { Icon } from 'UIcon';

export default class Index extends Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            animationType: 'none',//none slide fade
            transparent: true,
            modal1: false,
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
                    <Button type="primary" onPress={() => this._showModal('modal1')}>弹出</Button>
                    <Modal
                        animationType={this.state.animationType}
                        transparent={this.state.transparent}
                        visible={this.state.modal1}
                        onRequestClose={() => { this._onClose('modal1') }}
                    >
                        <View style={[styles.container, modalBackgroundStyle]}>
                            <View style={[styles.innerContainer, innerContainerTransparentStyle]}>
                                <View style={styles.heard}>
                                    <View style={styles.heardLeft}></View>
                                    <View style={styles.heardTitle}><Text>ModalDemo</Text></View>
                                    <TouchableOpacity style={styles.heardRight} onPress={() => this._onClose('modal1')} >
                                        <Icon name={'antDesign|closecircleo'} size={24} color={'#9b9b9b'} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                </View>
            </Scene>
        );
    }


    _showModal = (key) => {
        this.setState({
            [key]: true,
        });
    }
    _onClose = (key) => {
        this.setState({
            [key]: false,
        });
    }
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: Theme.pages.content_default_bg,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    innerContainer: {
        flexDirection:'column',
        borderRadius: 10,
        height: 400,
        // alignItems: 'center',
        // borderWidth: 1,
        // borderColor: 'blue',
    },
    heard:{
        flexDirection:'row',
        // borderWidth: 1,
        // borderColor: 'red',
    },
    heardLeft: {
        width:40,
    },
    heardTitle:{
        flex:1,
        alignItems: 'center',
        justifyContent:'center',
    },
    heardRight:{
        width:40,
        alignItems: 'flex-end',
        justifyContent: 'center',
        // borderWidth: 1,
        // borderColor: 'red',
    }
});