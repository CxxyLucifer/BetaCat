/**
 * Created by syf on 2017/5/4
 * 组件和样式参考ant mobile的代码
 */
import * as tslib_1 from "tslib";
import React from 'react';
import { TouchableHighlight, Text, StyleSheet, View, ActivityIndicator } from 'react-native';
import buttonStyles from './style/index';
export default class QMButton extends React.Component {
    constructor(props) {
        super(props);
        this.styles = buttonStyles;
        this.onPress = (...arg) => {
            let myState = this.state;
            if (this.props.onPress) {
                if (myState.clicking) {
                    myState.clicking = false;
                    this.props.onPress(...arg);
                    setTimeout(() => {
                        myState.clicking = true;
                    }, 500);
                }
            }
        };
        this.onPressIn = (...arg) => {
            if (!this.props.disabled) {
                this.setState({ pressIn: true });
            }
            if (this.props.onPressIn) {
                this.props.onPressIn(...arg);
            }
        };
        this.onPressOut = (...arg) => {
            if (!this.props.disabled) {
                this.setState({ pressIn: false });
            }
            if (this.props.onPressOut) {
                this.props.onPressOut(...arg);
            }
        };
        this.onShowUnderlay = (...arg) => {
            if (!this.props.disabled) {
                this.setState({ touchIte: true });
            }
            if (this.props.onShowUnderlay) {
                this.props.onShowUnderlay(...arg);
            }
        };
        this.onHideUnderlay = (...arg) => {
            if (!this.props.disabled) {
                this.setState({ touchIt: false });
            }
            if (this.props.onHideUnderlay) {
                this.props.onHideUnderlay(...arg);
            }
        };
        this.state = {
            pressIn: false,
            touchIt: false,
            clicking: true,
        };
    }
    render() {
        // TODO: replace `TouchableHighlight` with `TouchableWithoutFeedback` in version 1.1.0
        const _a = this.props, { size = 'normal', type = 'default', disabled, activeStyle, onPress, style, loading } = _a, restProps = tslib_1.__rest(_a, ["size", "type", "disabled", "activeStyle", "onPress", "style", "loading"]);
        [
            'activeOpacity',
            'delayPressOut',
            'underlayColor',
            'onPress',
            'onPressIn',
            'onPressOut',
            'onShowUnderlay',
            'onHideUnderlay',
        ].forEach(prop => {
            if (restProps.hasOwnProperty(prop)) {
                delete restProps[prop];
            }
        });
        const styles = this.styles;
        const textStyle = [
            styles[`${size}RawText`],
            styles[`${type}RawText`],
            disabled && styles.disabledRawText && styles[`${type}DisabledText`],
            this.state.pressIn && styles[`${type}HighlightText`],
        ];
        const wrapperStyle = [
            styles.wrapperStyle,
            styles[`${size}Raw`],
            styles[`${type}Raw`],
            disabled && styles.disabledRaw && styles[`${type}Disabled`],
            this.state.pressIn && activeStyle && styles[`${type}Highlight`],
            this.state.touchIt && activeStyle,
            style,
        ];
        const underlayColor = StyleSheet.flatten(styles[activeStyle ? `${type}Highlight` : `${type}Raw`])
            .backgroundColor;
        const indicatorColor = StyleSheet.flatten(this.state.pressIn ? styles[`${type}HighlightText`] : styles[`${type}RawText`]).color;
        return (<TouchableHighlight activeOpacity={1} delayPressOut={1} underlayColor={underlayColor} style={wrapperStyle} onPress={this.onPress} onPressIn={this.onPressIn} onPressOut={this.onPressOut} onShowUnderlay={this.onShowUnderlay} onHideUnderlay={this.onHideUnderlay} disabled={disabled} {...restProps}>
        <View style={styles.container}>
          {loading ? (<ActivityIndicator style={styles.indicator} animating color={indicatorColor} size="small"/>) : null}
          <Text style={textStyle} allowFontScaling={false} numberOfLines={1}>
            {this.props.children}
          </Text>
        </View>
      </TouchableHighlight>);
    }
}
QMButton.defaultProps = {
    disabled: false,
    activeStyle: {},
    loading: false,
    onPress: (_x) => { },
    onPressIn: (_x) => { },
    onPressOut: (_x) => { },
    onShowUnderlay: (_x) => { },
    onHideUnderlay: (_x) => { },
};
