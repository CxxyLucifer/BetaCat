import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Scene, Theme, Button, Modal, Provider} from 'UIKit';

export default class Index extends Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            visible2: false,
        };
    }

    render() {
        return (
            <Provider>
                <Scene header={'弹窗'} hasBack={true} style={styles.body}>
                    <View style={{ alignItems: 'center', flex: 1 }}>
                        <Button onPress={() => this.setState({ visible2: true })}>
                            popup
                        </Button>
                        <Modal
                            popup
                            visible={this.state.visible2}
                            animationType="slide-up"
                            onClose={this.onClose2}
                        >
                            <View style={{ paddingVertical: 20, paddingHorizontal: 20 }}>
                                <Text style={{ textAlign: 'center' }}>Content...</Text>
                                <Text style={{ textAlign: 'center' }}>Content...</Text>
                            </View>
                            <Button type="primary" onPress={this.onClose2}>
                                close modal
                            </Button>
                        </Modal>

                    </View>
                </Scene>
            </Provider>
        );
    }

    onClose2 = () => {
        this.setState({
            visible2: false,
        });
    };
}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: Theme.pages.content_default_bg,
    },
});