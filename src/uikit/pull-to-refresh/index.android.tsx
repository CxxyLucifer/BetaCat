/**
 * Created by hufeng on 3/22/16.
 * android pull-to-refresh
 */
"use strict";

import React, { Component } from "react";
import {
  ScrollView,
  ViewStyle,
  UIManager,
  RefreshControl,
  StyleSheet,
  Dimensions
} from "react-native";
import TimerMixin from "react-timer-mixin";
import reactMixin from "react-mixin";

const MyScrollView: any = ScrollView;

const noop = () => {};
const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export interface FactoryPullToRefreshProps {
  /**
   * 是否需要动态计算样式
   */
  needCalcStyle?: boolean;

  /**
   * 是否需要初始化loading
   */
  needInitLoading?: false;

  /**
   * 动画消失时间,默认600ms
   */
  duration?: number;

  /**
   * 超过多少像素也渲染,默认800
   */
  scrollRenderAheadDistance?: number;

  /**
   * 模块变动回调
   */
  onModeChange?: (type: any) => void;

  /**
   * 滚动回调
   */
  onScroll?: (e: any) => void;

  /**
   * 滚动到底部回调
   */
  onScrollEnd?: () => void;

  /**
   * 刷新回调
   */
  onRefresh?: (e: any) => void;

  /**
   * 刷新结束回调
   */
  onRefreshEnd?: () => void;

  /**
   * contentContainerStyle
   */
  contentContainerStyle?: ViewStyle;

  /**
   * 是否自动调整大小，仅Android有效，默认true
   */
  autoResize?: boolean;
}

export default class PullToRefresh extends Component<
  FactoryPullToRefreshProps,
  any
> {
  requestAnimationFrame: any;
  _swipeRefreshView: any;

  static defaultProps = {
    onRefresh: noop,
    autoResize: true,
    contentContainerStyle: null
  };

  constructor(props) {
    super(props);

    this.state = {
      isRefreshing: false,
      contentContainerStyle: null
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

    return (
      <MyScrollView
        ref={scrollView => (this._swipeRefreshView = scrollView)}
        onScroll={this._handleScroll}
        contentContainerStyle={[
          contentContainerStyle,
          this.state.contentContainerStyle
        ]}
        style={styles.container}
        refreshControl={
          <RefreshControl
            colors={["#1e90ff", "#40e0d0", "#ff69b4"]}
            refreshing={this.state.isRefreshing}
            onRefresh={this._handleOnRefresh}
          />
        }
      >
        {this.props.children}
      </MyScrollView>
    );
  }

  /**
   * 更新ScrollView的内部样式
   * @param height
   * @private
   */
  _updateContentContainerStyle = () => {
    if (this._swipeRefreshView) {
      this.requestAnimationFrame(() => {
        UIManager.measure(
          this._swipeRefreshView.getInnerViewNode(),
          (x, y, width, height, pageX, pageY) => {
            //avoid re-redner
            if (height <= SCREEN_HEIGHT) {
              if (!this.state.contentContainerStyle) {
                this.setState({
                  contentContainerStyle: {
                    flex: 1
                  }
                });
              }
            } else {
              //avoid re-render
              if (this.state.contentContainerStyle) {
                this.setState({
                  contentContainerStyle: null
                });
              }
            }
          }
        );
      });
    }
  };

  _handleOnRefresh = () => {
    this.setState({
      isRefreshing: true
    });

    this.props.onRefresh(this.onEnd);
  };

  onEnd = () => {
    this.setState({
      isRefreshing: false
    });
  };

  /**
   * 处理滚动
   * @param e
   * @private
   */
  _handleScroll = e => {
    this.props.onScroll && this.props.onScroll(e);
  };

  getScrollResponder: Function = () => {
    return (
      this._swipeRefreshView && this._swipeRefreshView.getScrollResponder()
    );
  };
}

reactMixin(PullToRefresh.prototype, TimerMixin);

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
