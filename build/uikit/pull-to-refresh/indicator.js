/**
 * @flow
 */
'use strict';
import React, { Component } from 'react';
import { View, Dimensions, ActivityIndicator, Animated, StyleSheet } from 'react-native';
import { Icon } from 'AJIcon';
import Text from '../text';
import Theme from '../style/theme';
const LOADING_HEIGHT = 40;
const SCREEN_WIDTH = Dimensions.get('window').width;
class Indicator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: new Animated.Value(0)
        };
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.height != this.props.height) {
            Animated.timing(this.state.height, {
                toValue: nextProps.height,
                duration: nextProps.height == 0 ? this.props.duration : 20
            }).start();
        }
    }
    render() {
        // 当前的刷新状态
        // pull 正在下拉，
        // push 正在上提
        const mode = this.props.mode;
        return (<Animated.View style={{
            overflow: 'hidden',
            alignItems: 'center',
            justifyContent: 'center',
            height: this.state.height
        }}>
        {!mode || mode == 'refresh'
            ? this._renderRefresh()
            : this._renderPullOrPushTip()}
      </Animated.View>);
    }
    _renderRefresh() {
        return (<View style={styles.refresh}>
        <ActivityIndicator size="small"/>
        <Text style={styles.text}>加载中...</Text>
      </View>);
    }
    _renderPullOrPushTip() {
        const mode = this.props.mode;
        return (<View style={styles.refresh}>
        {mode === 'push'
            ? <Icon name="myIcon|icon-songshougengxin" size={20} color="#999"/>
            : <Icon name="myIcon|icon-xiala" size={20} color="#999"/>}
        <Text style={styles.text}>{mode === 'push' ? '松开刷新' : '下拉刷新'}</Text>
      </View>);
    }
}
Indicator.defaultProps = {
    mode: 'refresh',
    height: 0
};
const styles = StyleSheet.create({
    refresh: {
        flex: 1,
        overflow: 'hidden',
        borderBottomWidth: Theme.border.widthSm,
        borderColor: Theme.border.split,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: Theme.font.sizeBase,
        color: '#999',
        marginLeft: 5
    }
});
export { Indicator, LOADING_HEIGHT };
