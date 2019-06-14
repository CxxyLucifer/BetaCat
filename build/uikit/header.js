'use strict';
import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Icon } from 'UIcon';
import Kit from './kit';
import Text from './text';
import Theme from './style/theme';
import emptyFn from './empty-fn';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
/**
 * header模块
 * Usage
 *
 * [LeftArrow LeftTilte brandName title home search shoppingCart rightTitle rightArrow]
 */
export default class Header extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            isEdit: false,
        };
        this._renderLeft = () => {
            if (this.props.brandName) {
                return (<View style={styles.leftMenu}>
					<Text numberOfLines={1} style={[styles.leftTitle, { width: SCREEN_WIDTH - 60, textAlign: 'center' }]}>
						{this.props.brandName}
					</Text>
				</View>);
            }
            else {
                return (<View style={styles.leftMenu}>
					<Text numberOfLines={1} style={styles.leftTitle}>
						{this.props.leftTitle}
					</Text>
				</View>);
            }
        };
        this._renderGroup = () => {
            if (this.props.group) {
                return (<TouchableOpacity activeOpacity={0.8} accessible={true} accessibilityLabel={`aj-header:group-btn`} hitSlop={{ top: 0, bottom: 0, left: 10, right: 20 }} style={styles.group} onPress={this.props.onGroupPress}>
					<Icon name={'antDesign|left'} size={20} color={'red'}/>
				</TouchableOpacity>);
            }
            return null;
        };
        this._renderSearch = () => {
            if (this.props.search) {
                return (<TouchableOpacity activeOpacity={0.8} accessible={true} accessibilityLabel={`aj-header:search-btn`} hitSlop={{ top: 0, bottom: 0, left: 10, right: 10 }} style={styles.right} onPress={this.props.onSearchPress}>
					<Icon name={'antDesign|left'} size={20} color={'red'}/>
				</TouchableOpacity>);
            }
            return null;
        };
        this._renderAdd = () => {
            if (this.props.add) {
                return (<TouchableOpacity activeOpacity={0.8} accessible={false} accessibilityLabel={''} hitSlop={{ top: 0, bottom: 0, left: 10, right: 10 }} style={styles.right} onPress={this.props.onAddPress}>
					<Icon name={'antDesign|left'} size={20} color={'red'}/>
				</TouchableOpacity>);
            }
            return null;
        };
        this._renderCustomize = () => {
            if (this.props.customize) {
                return (<TouchableOpacity activeOpacity={0.8} accessible={false} accessibilityLabel={''} hitSlop={{ top: 0, bottom: 0, left: 10, right: 10 }} style={styles.right} onPress={this.props.onCustomizePress}>
					{this.props.customize}
				</TouchableOpacity>);
            }
            return null;
        };
    }
    render() {
        return (<View style={[styles.container, this.props.style]}>
				{this._renderLeft()}
				{this._renderGroup()}
				<View style={styles.rightContainer}>
					{this._renderSearch()}
					{this._renderAdd()}
					{this._renderCustomize()}
				</View>
				{this.props.brandName
            ? <View>
						<Text>
							{''}
						</Text>
					</View>
            :
                <TouchableOpacity activeOpacity={0.8} accessible={true} accessibilityLabel={`aj-header:back-btn`} hitSlop={{ top: 0, bottom: 0, left: 0, right: 20 }} style={styles.leftBack} onPress={this.props.onLeftMenuPress}>
						<Icon name={'antDesign|left'} size={20} color={Theme.colors.textSecondary}/>
					</TouchableOpacity>}
			</View>);
    }
}
Header.defaultProps = {
    group: false,
    add: false,
    home: false,
    search: false,
    customize: false,
    shoppingCart: false,
    showSettingBtn: false,
    edit: false,
    showEdit: false,
    brandName: '',
    leftTitle: '',
    onGroupPress: emptyFn,
    onLeftMenuPress: emptyFn,
    onSearchPress: emptyFn,
    onAddPress: emptyFn,
    onCustomizePress: emptyFn,
    onHomePress: emptyFn,
    onShoppingCartPress: emptyFn,
    onEditPress: emptyFn,
    onShowSettingPress: emptyFn,
};
const styles = StyleSheet.create({
    container: {
        paddingRight: 10,
        paddingTop: Kit.isAndroid() ? 10 : Kit.isIphoneX() ? 40 : 20,
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Theme.colors.fillBase,
        borderBottomWidth: Theme.border.widthSm,
        borderColor: Theme.border.split,
    },
    group: {
        position: 'absolute',
        top: 5,
        left: 0,
        justifyContent: 'center',
        paddingLeft: 10,
        height: 40,
        width: 34,
    },
    leftBack: {
        position: 'absolute',
        top: 5,
        left: 0,
        justifyContent: 'center',
        paddingLeft: 10,
        height: 40,
        width: 30,
    },
    leftMenu: {
        flex: 1,
        height: 40,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    leftTitle: {
        width: SCREEN_WIDTH - 60,
        textAlign: 'center',
        color: Theme.colors.textSecondary,
        fontSize: 18,
    },
    rightContainer: {
        position: 'absolute',
        top: 5,
        right: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: 40,
    },
    right: {
        height: 40,
        justifyContent: 'center',
    },
});
