import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Search, PullToRefresh } from 'UIKit'

import Gallery from './component/gallery';
import ToDo from './component/todo';
import Summary from './component/summary';

export default class Index extends Component<any, any> {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <PullToRefresh
                onRefresh={(freshEnd) => { setTimeout(() => { freshEnd() }, 1000) }}
                style={styles.container}>
                {/* 搜索 */}
                <Search placeholder='订单号/项目名称/客户名称' />
                {/* 轮播图标 */}
                <Gallery />
                {/* 代办、预警、通知 */}
                <ToDo />
                {/* 关注数据 */}
                <Summary />
            </PullToRefresh>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1
    },
})