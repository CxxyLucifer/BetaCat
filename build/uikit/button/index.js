import * as tslib_1 from "tslib";
// tslint:disable:no-empty
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { WithTheme } from '../style';
import buttonStyles from './style/index';
export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.onPressIn = (...arg) => {
            this.setState({ pressIn: true });
            if (this.props.onPressIn) {
                this.props.onPressIn(...arg);
            }
        };
        this.onPressOut = (...arg) => {
            this.setState({ pressIn: false });
            if (this.props.onPressOut) {
                this.props.onPressOut(...arg);
            }
        };
        this.onShowUnderlay = (...arg) => {
            this.setState({ touchIt: true });
            if (this.props.onShowUnderlay) {
                this.props.onShowUnderlay(...arg);
            }
        };
        this.onHideUnderlay = (...arg) => {
            this.setState({ touchIt: false });
            if (this.props.onHideUnderlay) {
                this.props.onHideUnderlay(...arg);
            }
        };
        this.state = {
            pressIn: false,
            touchIt: false,
        };
    }
    render() {
        // TODO: replace `TouchableHighlight` with `TouchableWithoutFeedback` in version 1.1.0
        // for using setNativeProps to improve performance
        const _a = this.props, { size = 'large', type = 'default', disabled, activeStyle, onPress, style, styles, loading } = _a, restProps = tslib_1.__rest(_a, ["size", "type", "disabled", "activeStyle", "onPress", "style", "styles", "loading"]);
        return (<WithTheme themeStyles={buttonStyles} styles={styles}>
        {_styles => {
            const textStyle = [
                _styles[`${size}RawText`],
                _styles[`${type}RawText`],
                disabled && _styles[`${type}DisabledRawText`],
                this.state.pressIn && _styles[`${type}HighlightText`],
            ];
            const wrapperStyle = [
                _styles.wrapperStyle,
                _styles[`${size}Raw`],
                _styles[`${type}Raw`],
                disabled && _styles[`${type}DisabledRaw`],
                this.state.pressIn && activeStyle && _styles[`${type}Highlight`],
                activeStyle && this.state.touchIt && activeStyle,
                style,
            ];
            const underlayColor = StyleSheet.flatten(activeStyle ? activeStyle : _styles[`${type}Highlight`]).backgroundColor;
            const indicatorColor = StyleSheet.flatten(this.state.pressIn
                ? _styles[`${type}HighlightText`]
                : _styles[`${type}RawText`]).color;
            return (<TouchableHighlight activeOpacity={0.4} {...restProps} style={wrapperStyle} disabled={disabled} underlayColor={underlayColor} onPress={(e) => onPress && onPress(e)} onPressIn={this.onPressIn} onPressOut={this.onPressOut} onShowUnderlay={this.onShowUnderlay} onHideUnderlay={this.onHideUnderlay}>
              <View style={_styles.container}>
                {loading ? (
            // tslint:disable-next-line:jsx-no-multiline-js
            <ActivityIndicator style={_styles.indicator} animating color={indicatorColor} size="small"/>) : null}
                <Text style={textStyle}>{this.props.children}</Text>
              </View>
            </TouchableHighlight>);
        }}
      </WithTheme>);
    }
}
Button.defaultProps = {
    pressIn: false,
    disabled: false,
    loading: false,
    onPress: (_) => { },
    onPressIn: (_) => { },
    onPressOut: (_) => { },
    onShowUnderlay: (_) => { },
    onHideUnderlay: (_) => { },
};
