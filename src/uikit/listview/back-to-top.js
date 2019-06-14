/**
 * 返回顶部
 */
import React from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    PixelRatio
} from 'react-native';
import { msg } from 'plume2';
import { Icon } from 'UIcon';

export default class BackToTop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isHide: !props.show
        };
    }

    componentDidMount() {
        msg.on('flat-list:back-to-top', this._showBackToTop);
    }

    componentWillUnmount() {
        msg.off('flat-list:back-to-top', this._showBackToTop);
    }

    render() {
        const { onPress } = this.props;
        if (this.state.isHide) {
            return null;
        } else {
            return (
                <TouchableOpacity
                    accessible={true}
                    accessibilityLabel={'flat-list:back-to-top'}
                    activeOpacity={0.8}
                    hitSlop={{ top: 10, bottom: 10, left: 0, right: 18 }}
                    onPress={onPress}
                    style={styles.operate}
                >
                    <Icon name="myIcon|icon-back-top" size={24} color="white" />
                </TouchableOpacity>
            );
        }
    }

    _showBackToTop = isHide => {
        this.setState({ isHide });
    };
}

const styles = StyleSheet.create({
    operate: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        width: 40,
        height: 40,
        borderRadius: 20,
        borderWidth: 1 / PixelRatio.get(),
        borderColor: '#eee',
        backgroundColor: 'rgba(0,0,0,0.5)'
    }
});
