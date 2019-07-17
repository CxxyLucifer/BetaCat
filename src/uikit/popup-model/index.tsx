import React, { Component } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, Animated} from 'react-native';
import PropTypes from 'prop-types';
import styles from './styles';

export interface PopUpModelProps{
    title:string,
    titleStyle:Object,
    content:any,
    visible:boolean,
}

export default class PopUpModel extends Component<PopUpModelProps, any> {
    static propTypes = {
        title: PropTypes.string, // 标题
        content: PropTypes.object, //  内容
        show: PropTypes.func, // 显示
        hide: PropTypes.func, // 隐藏
    }

    translateY;
    cancel;
    constructor(props) {
        super(props);
        this.translateY = 150;
        this.state = {
            visible: false,
            sheetAnim: new Animated.Value(this.translateY)
        }
        this.cancel = this._cancel.bind(this);
    }

    componentWillReceiveProps(nextProps: any) {
        console.log('------- nextProps:',nextProps)
        if (this.props.visible != nextProps.visible) {
            this.setState({
                visible: nextProps.visible
            });
        }
    }

    /**
     * Modal为最外层，ScrollView为内容层
     */
    render() {
        const { visible, sheetAnim } = this.state;
        console.log('---- visible:', visible)

        return (
            <Modal
                visible={visible}
                transparent={false}
                animationType="none"
                onRequestClose={this._cancel}
            >
                <View style={styles.wrapper}>
                    <TouchableOpacity style={styles.overlay} onPress={this._cancel}></TouchableOpacity>
                    <Animated.View
                        style={[styles.bd, { height: this.translateY, transform: [{ translateY: sheetAnim }] }]}>
                        {this._renderTitle()}
                        <ScrollView
                            horizontal={true}
                            showsHorizontalScrollIndicator={false}>
                            {this._renderContainer()}
                        </ScrollView>
                    </Animated.View>
                </View>
            </Modal>
        )
    }

    /**
     * 标题
     */
    _renderTitle() {
        const { title, titleStyle } = this.props;
        if (!title) {
            return null
        }
        if (React.isValidElement(title)) {
            return (
                <View style={styles.title}>{title}</View>
            )
        }
        return (
            <Text style={ titleStyle}>{title}</Text>
        )
    }

    /**
     * 内容布局
     */
    _renderContainer() {
        const { content } = this.props;
        console.log('=======content:', content)
        return (
            <View style={styles.container}>
                {content}
            </View>
        )
    }


    /**
     * 控制Modal点击关闭，Android返回键关闭
     */
    _cancel =()=> {
        this._hide();
    }

    /**
     * 隐藏
     */
    _hide =()=> {
        this.setState({ visible: false })
        Animated.timing(this.state.sheetAnim, {
            toValue: this.translateY,
            duration: 150
        }).start();
    }
}