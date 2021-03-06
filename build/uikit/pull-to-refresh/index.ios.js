/**
 * @flow
 */
'use strict';
import React from 'react';
import { ScrollView, Dimensions, UIManager, StyleSheet } from 'react-native';
import TimeMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';
import QMLoading from '../loading';
import { Indicator, LOADING_HEIGHT } from './indicator';
//do nothing.
const noop = () => { };
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const MyScrollView = ScrollView;
/**
 * 下拉刷新的公共组件
 */
export default class PullToRefresh extends React.Component {
    constructor(props) {
        super(props);
        /**
         * 更新ScrollView的内部样式
         * @param height
         * @private
         */
        this._updateContentContainerStyle = () => {
            if (this._swipeRefreshView) {
                this.requestAnimationFrame(() => {
                    UIManager.measure(this._swipeRefreshView.getInnerViewNode(), (x, y, width, height, pageX, pageY) => {
                        if (height <= SCREEN_HEIGHT) {
                            //avoid re-render
                            if (!this.state.contentContainerStyle) {
                                this.setState({
                                    contentContainerStyle: {
                                        flex: 1,
                                    },
                                });
                            }
                        }
                        else {
                            //avoid re-render
                            if (this.state.contentContainerStyle) {
                                this.setState({
                                    contentContainerStyle: null,
                                });
                            }
                        }
                    });
                });
            }
        };
        /**
         * 处理ScrollView的滚动
         * @param e
         * @private
         */
        this._handleScroll = (e) => {
            //通知父组件
            this.props.onScroll && this.props.onScroll(e);
            //得到当前的下拉距离
            //下拉距离+初始偏移量
            const offsetY = e.nativeEvent.contentOffset.y + e.nativeEvent.contentInset.top;
            if (offsetY <= 0 && this._isTouch) {
                if (Math.abs(offsetY) >= LOADING_HEIGHT) {
                    //如果不是push状态,更新
                    if (this.state.mode != 'push') {
                        this.setState({
                            mode: 'push',
                            height: LOADING_HEIGHT,
                        }, () => this.props.onModeChange('push'));
                    }
                }
                else {
                    //下拉的pull状态,更新mode和height
                    if (this.state.height != LOADING_HEIGHT) {
                        this.setState({
                            mode: 'pull',
                            height: Math.abs(offsetY),
                        }, () => this.props.onModeChange('pull'));
                    }
                    else if (this.state.mode != 'pull') {
                        //上拉的pull状态,只更新mode
                        this.setState({
                            mode: 'pull',
                        }, () => this.props.onModeChange('pull'));
                    }
                }
            }
        };
        /**
         * 当滚动结束时候
         * @param e
         * @private
         */
        this._handleScrollEnd = (e) => {
            //回到原点
            if (this.state.height === LOADING_HEIGHT) {
                this.setState({
                    mode: 'refresh',
                }, () => {
                    this.props.onModeChange('refresh');
                    // 通知外界正在刷新
                    this.props.onRefresh && this.props.onRefresh(this.onRefreshEnd);
                });
            }
            else {
                this.props.onScrollEnd && this.props.onScrollEnd();
                // 如查不刷新,就消失;
                this.setState({
                    height: 0,
                }, () => this.props.onModeChange(''));
            }
        };
        /**
         * 手势释放
         * @param e
         * @private
         */
        this._handleResponseRelease = (e) => {
            //不是刷新状态,直接消失
            if (this.state.mode === 'pull') {
                this.setState({
                    height: 0,
                }, () => this.props.onModeChange(''));
            }
        };
        /**
         * 处理结束事件
         */
        this.onRefreshEnd = () => {
            if (this.state.height) {
                this.setState({
                    height: 0,
                }, () => {
                    //结束之后通知父组件已经结束,可以做些后续的工作
                    this.props.onRefreshEnd && this.props.onRefreshEnd();
                    this.props.onModeChange('');
                });
            }
        };
        this.changeScrollEnable = enabled => {
            this.setState({
                scrollEnabled: enabled,
            });
        };
        this.getScrollResponder = () => {
            return this._swipeRefreshView && this._swipeRefreshView.getScrollResponder();
        };
        this._swipeRefreshView = null;
        this._isTouch = false;
        this.state = {
            //当前提示框的状态
            mode: 'refresh',
            //当前的提示的高度
            height: 0,
            //是不是可以滚动
            scrollEnabled: true,
            contentContainerStyle: null,
        };
    }
    componentDidMount() {
        if (this.props.needCalcStyle) {
            this._updateContentContainerStyle();
        }
    }
    componentDidUpdate() {
        if (this.props.needCalcStyle) {
            this._updateContentContainerStyle();
        }
    }
    /**
     * render
     */
    render() {
        if (this.props.needInitLoading) {
            return <QMLoading />;
        }
        return (<MyScrollView ref={swipeRefreshView => (this._swipeRefreshView = swipeRefreshView)} style={styles.container} scrollEventThrottle={32} scrollRenderAheadDistance={this.props.scrollRenderAheadDistance} keyboardDismissMode="on-drag" onTouchStart={e => (this._isTouch = true)} onTouchEnd={e => (this._isTouch = false)} onScroll={this._handleScroll} onScrollEnd={this.props.onScrollEnd && this.props.onScrollEnd} scrollEnabled={this.state.scrollEnabled} showsVerticalScrollIndicator={true} automaticallyAdjustContentInsets={false} contentContainerStyle={[this.state.contentContainerStyle, this.props.contentContainerStyle]} onResponderRelease={this._handleResponseRelease} onMomentumScrollEnd={this._handleScrollEnd}>
        
        <Indicator mode={this.state.mode} duration={this.props.duration} height={this.state.height}/>

        
        {this.props.children}
      </MyScrollView>);
    }
}
PullToRefresh.defaultProps = {
    // 是否需要动态计算样式
    needCalcStyle: false,
    needInitLoading: false,
    //默认动画消失时间,600ms
    duration: 600,
    scrollRenderAheadDistance: 800,
    onModeChange: noop,
    onScrollEnd: noop,
};
reactMixin(PullToRefresh.prototype, TimeMixin);
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
