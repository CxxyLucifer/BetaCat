/**
 * Created by hufeng on 3/22/16.
 * android pull-to-refresh
 */
'use strict';
import React, { Component } from 'react';
import { ScrollView, UIManager, RefreshControl, StyleSheet, Dimensions } from 'react-native';
import TimerMixin from 'react-timer-mixin';
import reactMixin from 'react-mixin';
const MyScrollView = ScrollView;
const noop = () => { };
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
export default class PullToRefresh extends Component {
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
                        //avoid re-redner
                        if (height <= SCREEN_HEIGHT) {
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
        this._handleOnRefresh = () => {
            this.setState({
                isRefreshing: true,
            });
            this.props.onRefresh(this.onEnd);
        };
        this.onEnd = () => {
            this.setState({
                isRefreshing: false,
            });
        };
        /**
         * 处理滚动
         * @param e
         * @private
         */
        this._handleScroll = e => {
            this.props.onScroll && this.props.onScroll(e);
        };
        this.getScrollResponder = () => {
            return this._swipeRefreshView && this._swipeRefreshView.getScrollResponder();
        };
        this.state = {
            isRefreshing: false,
            contentContainerStyle: null,
        };
    }
    componentDidMount() {
        if (this.props.autoResize) {
            this._updateContentContainerStyle();
        }
    }
    componentDidUpdate() {
        if (this.props.autoResize) {
            this._updateContentContainerStyle();
        }
    }
    render() {
        const { contentContainerStyle } = this.props;
        return (<MyScrollView ref={scrollView => (this._swipeRefreshView = scrollView)} onScroll={this._handleScroll} contentContainerStyle={[contentContainerStyle, this.state.contentContainerStyle]} style={styles.container} refreshControl={<RefreshControl colors={['#1e90ff', '#40e0d0', '#ff69b4']} refreshing={this.state.isRefreshing} onRefresh={this._handleOnRefresh}/>}>
        {this.props.children}
      </MyScrollView>);
    }
}
PullToRefresh.defaultProps = {
    onRefresh: noop,
    autoResize: true,
    contentContainerStyle: null,
};
reactMixin(PullToRefresh.prototype, TimerMixin);
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
