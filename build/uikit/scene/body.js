// @flow
('use strict');
/**
 * Navigator导航中心
 */
import React, { Component } from 'react';
import { InteractionManager, StyleSheet, View, NetInfo } from 'react-native';
import LoadingContainer from './container/loading-container';
import OverflowLoadingContainer from './container/oveflow-loading-container';
import Network from './components/network';
import Kit from '../kit';
import noop from '../noop';
/**
 * 主要处理几个公共的状态
 *  1. 数据加载
 *  2. 网络中断
 */
export default class Body extends Component {
    constructor(props = {}) {
        super(props);
        this.state = {
            hasNetwork: true,
            timeoutId: -1,
            loading: this.props.loading,
        };
        /**
         *
         * @param hasNetwork
         * @private
         */
        this._onNetChangeHandler = (hasNetwork) => {
            let { onNetworkBack, onNetworkBreak } = this.props;
            if (hasNetwork && this.props.onNetworkBack) {
                InteractionManager.runAfterInteractions(() => {
                    onNetworkBack();
                });
            }
            else if (onNetworkBreak) {
                onNetworkBreak();
            }
            this.setState({ hasNetwork });
        };
        /**
         * @private
         */
        this._onCheckNetwork = () => {
            NetInfo.isConnected.fetch().then(isConnected => {
                if (__DEV__) {
                    console.log('检查网络 => ', isConnected);
                }
                this._onNetChangeHandler(isConnected);
            });
        };
    }
    componentDidMount() {
        NetInfo.isConnected.addEventListener('change', this._onNetChangeHandler);
    }
    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('change', this._onNetChangeHandler);
    }
    render() {
        //没有网络
        if (!this.state.hasNetwork) {
            return <Network onPress={this._onCheckNetwork}/>;
        }
        else {
            //业务自有
            const { loading, overflowLoading, style, children } = this.props;
            //如果都没有设置loading或者overflowLoading,直接返回children
            if (!loading && !overflowLoading) {
                return <View style={[styles.container, style]}>{children}</View>;
            }
            else if (loading) {
                return (<LoadingContainer style={style} loading={loading}>
            {children}
          </LoadingContainer>);
            }
            else {
                return (<OverflowLoadingContainer style={style} loading={overflowLoading}>
            {children}
          </OverflowLoadingContainer>);
            }
        }
    }
}
Body.defaultProps = {
    loading: null,
    overflowLoading: null,
    style: null,
    onNetworkBreak: noop,
    onNetworkBack: noop,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    model: {
        width: Kit.Width,
        height: Kit.Height,
        backgroundColor: 'rgba(0,0,0,0.3)',
        position: 'absolute',
        left: 0,
        top: 0,
    },
});
