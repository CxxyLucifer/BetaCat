import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { Scene, Theme, Button, Modal, Provider, ImagePicker,WhiteSpace,ActionSheet} from 'UIKit';

export default class Index extends Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            files: [
              {
                url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
                id: '2121',
              },
              {
                url: 'https://zos.alipayobjects.com/rmsportal/WCxfiPKoDDHwLBM.png',
                id: '2122',
              }
            ],
        };
    }

    render() {
        return (
            <Scene header={'上传图片'} hasBack={true} style={styles.body}>
                <View style={{ alignItems: 'center', flex: 1 }}>
                    <WhiteSpace />
                    <Button type="primary" onPress={this._showActionSheet}>
                        ActionSheet
                    </Button>
                    <WhiteSpace />
                    <ImagePicker
                        onChange={this.handleFileChange}
                        files={this.state.files}
                    />
                </View>
            </Scene>
        );
    }

    handleFileChange = (files: any) => {
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