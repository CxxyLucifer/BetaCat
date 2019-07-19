import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Scene, Theme, Button, Modal, Provider, WingBlank,WhiteSpace} from 'UIKit';

export default class Index extends Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            visible2: false,
            visible3: false
        };
    }

    render() {
        const footerButtons = [
            { text: 'Cancel', onPress: () => console.log('cancel') },
            { text: 'Ok', onPress: () => console.log('ok') },
        ];

        return (
            <Scene header={'弹窗'} hasBack={true} style={styles.body}>
                <Provider>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <WingBlank>
                            <WhiteSpace />
                            <Button onPress={() => this._onShow('visible')}>
                                showModal
                            </Button>
                            <WhiteSpace />
                            <Button onPress={() => this._onShow('visible2')}>
                                slideUp
                            </Button>
                            <WhiteSpace />
                            <Button onPress={() => this._onShow('visible3')}>
                                slideDown
                            </Button>
                        </WingBlank>

                        <Modal
                            title="Title"
                            transparent
                            onClose={() => this._onClose('visible')}
                            maskClosable
                            visible={this.state.visible}
                            closable
                            footer={footerButtons}
                        >
                            <View style={{ paddingVertical: 20 }}>
                                <Text style={{ textAlign: 'center' }}>Content...</Text>
                                <Text style={{ textAlign: 'center' }}>Content...</Text>
                            </View>
                            <Button type="primary" onPress={() => this._onClose('visible')}>
                                close modal
                            </Button>
                        </Modal>

                        <Modal
                            popup
                            visible={this.state.visible2}
                            animationType="slide-up"
                            onClose={() => this._onClose('visible2')}
                        >
                            <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                                <Text style={{ textAlign: 'center' }}>Content...</Text>
                                <Text style={{ textAlign: 'center' }}>Content...</Text>
                            </View>
                            <Button type="primary" onPress={() => this._onClose('visible2')}>
                                close modal
                            </Button>
                        </Modal>

                        <Modal
                            popup
                            visible={this.state.visible3}
                            animationType="slide-down"
                            onClose={() => this._onClose('visible3')}
                        >
                            <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                                <Text style={{ textAlign: 'center' }}>Content...</Text>
                                <Text style={{ textAlign: 'center' }}>Content...</Text>
                            </View>
                            <Button type="primary" onPress={() => this._onClose('visible3')}>
                                close modal
                            </Button>
                        </Modal>

                    </View>
                </Provider>
            </Scene>
        );
    }

    _onShow = (key) => {
        this.setState({
            [key]: true,
        });
    };

    _onClose = (key) => {
        this.setState({
            [key]: false,
        });
    };
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: Theme.pages.content_default_bg,
    },
});