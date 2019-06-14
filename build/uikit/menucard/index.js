import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { isObject, isEmpty } from 'lodash';
import { Icon } from 'UIcon';
import Toast from '../toast';
export default class Index extends Component {
    constructor(props) {
        super(props);
        this._onMenuPress = () => {
            Toast.info('========test');
        };
        this._showMore = () => {
            const { showMore } = this.state;
            this.setState({ showMore: !showMore });
        };
        this._renderMenu = (data) => {
            const { showMore } = this.state;
            let menus = new Array();
            if (showMore && !isEmpty(data.childs)) {
                data.childs.forEach((v, i) => {
                    menus.push(<TouchableOpacity onPress={this._onMenuPress} key={v.menuId + "_" + i} style={styles.menuItem}>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name={'myIcon|icon-stock-taking'} size={45} color={'#FBB074'}/>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 13, color: '#333333' }}>{v.menuName}</Text>
                        </View>
                    </TouchableOpacity>);
                });
            }
            else if (!showMore && !isEmpty(data.childs)) {
                data.childs.forEach((v, i) => {
                    if (i < 4) {
                        menus.push(<TouchableOpacity onPress={this._onMenuPress} key={v.menuId + "_" + i} style={styles.menuItem}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                                <Icon name={'myIcon|icon-stock-taking'} size={45} color={'#FBB074'}/>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 13, color: '#333333' }}>{v.menuName}</Text>
                            </View>
                        </TouchableOpacity>);
                    }
                });
            }
            return menus;
        };
        this.state = {
            showMore: false,
            funName: '',
        };
    }
    render() {
        const { showMore } = this.state;
        const { data } = this.props;
        if (!isObject(data)) {
            return null;
        }
        return (<View style={styles.wrapper}>
                <View style={styles.nameView}>
                    <View style={[styles.flex1, styles.funName]}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <Text style={{ fontSize: 16, color: '#333333', marginLeft: 5 }}>{data.menuName || ''}</Text>
                        </View>
                    </View>
                    {(!isEmpty(data.childs) && data.childs.length > 4) ?
            <TouchableOpacity onPress={this._showMore} style={[styles.flex1, styles.more]}>
                                <Text style={{ color: '#9b9b9b', fontSize: 12 }}>
                                    {showMore ? '收起更多' : '展开更多'}
                                </Text>
                            </TouchableOpacity> : <View style={styles.flex1}/>}
                </View>
                <View style={styles.menuView}>
                    {this._renderMenu(data)}
                </View>
            </View>);
    }
}
const styles = StyleSheet.create({
    flex1: {
        flex: 1,
    },
    wrapper: {
        marginTop: 10,
        paddingBottom: 5,
        marginBottom: 10,
        borderTopWidth: 1,
        borderTopColor: '#f9f9f9',
        borderBottomWidth: 1,
        borderBottomColor: '#f9f9f9',
        backgroundColor: 'white',
    },
    nameView: {
        height: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#f9f9f9',
        flexDirection: 'row'
    },
    menuView: {
        marginLeft: 10,
        marginRight: 10,
        flexWrap: 'wrap',
        flexDirection: 'row',
    },
    menuItem: {
        width: '25%',
        height: 80,
        marginBottom: 5,
        alignItems: 'center',
    },
    funName: {
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 10,
        flexDirection: 'row'
    },
    more: {
        flexDirection: 'row',
        alignItems: "center",
        paddingRight: 15,
        justifyContent: "flex-end"
    }
});
