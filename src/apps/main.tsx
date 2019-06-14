import React, { Component } from "react";
import { StyleSheet, ViewStyle } from "react-native";
import SafeAreaView from 'react-native-safe-area-view';
import { TabBar, Theme } from 'UIKit';
import { Icon } from 'UIcon';

import Home from './home';
import WorkSpace from './workspace';
import MessageList from './message/listview';

const MyTabBar: any = TabBar;

export default class Main extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            selected: 'home'
        };
    }

    render() {
        const { selected } = this.state;

        return (
            <MyTabBar style={styles.flex1} tintColor={Theme.colors.brandPrimary} barTintColor={Theme.colors.fillBase}>
                <MyTabBar.Item
                    title="主页"
                    icon={<Icon name={'myIcon|icon-home'} size={30} color={'#9b9b9b'} />}
                    selectedIcon={<Icon name={'myIcon|icon-home'} size={30} color={'#5c87f1'} />}
                    onPress={this._handleSelect.bind(this, 'home')}
                    selected={selected === 'home'}
                >
                    <SafeAreaView style={[styles.flex1, styles.bg]}>
                        <Home />
                    </SafeAreaView>
                </MyTabBar.Item>

                <MyTabBar.Item
                    title="工作台"
                    icon={<Icon name={'antDesign|appstore1'} size={26} color={'#9b9b9b'} />}
                    selectedIcon={<Icon name={'antDesign|appstore1'} size={26} color={'#5c87f1'} />}
                    onPress={this._handleSelect.bind(this, 'workspace')}
                    selected={selected === 'workspace'}
                >
                    <WorkSpace />
                </MyTabBar.Item>

                <MyTabBar.Item
                    title="消息"
                    icon={<Icon name={'antDesign|message1'} size={26} color={'#9b9b9b'} />}
                    selectedIcon={<Icon name={'antDesign|message1'} size={26} color={'#5c87f1'} />}
                    onPress={this._handleSelect.bind(this, 'message')}
                    selected={selected === 'message'}
                >
                    <MessageList />
                </MyTabBar.Item>

                <MyTabBar.Item
                    title="我的"
                    icon={<Icon name={'myIcon|icon-wode1'} size={30} color={'#9b9b9b'} />}
                    selectedIcon={<Icon name={'myIcon|icon-wode1'} size={30} color={'#5c87f1'} />}
                    onPress={this._handleSelect.bind(this, 'mine')}
                    selected={selected === 'mine'}
                >
                    <SafeAreaView style={[styles.flex1, styles.bg]}>
                        <Icon name={'antDesign|left'} size={20} color={'red'} />
                        <Icon name={'fontAwesome|angle-left'} size={20} color={'red'} />
                        <Icon name={'fontAwesome|facebook'} size={20} color={'orange'} />
                        <Icon name={'myIcon|icon-wode1'} size={20} color={'red'} />
                        <Icon name={'myIcon|icon-home'} size={40} color={'#9b9b9b'} />
                    </SafeAreaView>
                </MyTabBar.Item>
            </MyTabBar>
        );
    }


    _handleSelect = (selected) => {
        this.setState({ selected });
    };
}

const styles = StyleSheet.create({
    flex1: {
        flex: 1
    } as ViewStyle,
    bg: {
        backgroundColor: Theme.pages.content_default_bg
    }
})
