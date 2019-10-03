import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Scene, Theme, Button, Modal, Provider, WingBlank,WhiteSpace,ActionSheet} from 'UIKit';

export default class Index extends Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }

    render() {
        return (
            <Scene header={'上传图片'} hasBack={true} style={styles.body}>
                <Provider>
                    <View style={{ alignItems: 'center', flex: 1 }}>

                        <Button type="primary" onPress={this._showActionSheet}>
                            ActionSheet
                        </Button>
                        
                    </View>
                </Provider>
            </Scene>
        );
    }

    _showActionSheet = () => {
        const BUTTONS = [
            '拍照',
            '从手机相册选择',
            '取消',
          ];
          ActionSheet.showActionSheetWithOptions(
            {
              options: BUTTONS,
              cancelButtonIndex: 2
            },
          (buttonIndex: any) => {
            console.log('=========button:',BUTTONS[buttonIndex])
          },
        );
      }

}

const styles = StyleSheet.create({
    body:{
        flex: 1,
        backgroundColor: Theme.pages.content_default_bg,
    },
});