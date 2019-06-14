import React, { Component } from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ViewStyle
} from "react-native";
import { Scene, MenuCard, Theme } from 'UIKit';

import Gallery from './component/gallery';

const data = [
    {
        "menuId": 23376,
        "systemId": 3000,
        "menuName": "常用功能",
        "url": "",
        "icon": "",
        "parentId": 20000,
        "roleId": 23333,
        "itemId": 46586,
        "childs": [
            {
                "menuId": 23377,
                "systemId": 3000,
                "menuName": "订单管理",
                "url": "/workspace/order-main.html",
                "icon": "icon-order",
                "parentId": 23376,
                "roleId": 20003,
                "itemId": 46655,
                "childs": []
            },
            {
                "menuId": 23378,
                "systemId": 3000,
                "menuName": "施工管理",
                "url": "/workspace/construct-service-list.html",
                "icon": "icon-chat",
                "parentId": 23376,
                "roleId": 20003,
                "itemId": 46656,
                "childs": []
            },
            {
                "menuId": 23379,
                "systemId": 3000,
                "menuName": "经纪人管理",
                "url": "/workspace/manager-main.html",
                "icon": "icon-manager",
                "parentId": 23376,
                "roleId": 20003,
                "itemId": 46657,
                "childs": []
            },
            {
                "menuId": 23380,
                "systemId": 3000,
                "menuName": "交付",
                "url": "/workspace/deliver-main.html",
                "icon": "icon-delivery",
                "parentId": 23376,
                "roleId": 20003,
                "itemId": 46658,
                "childs": []
            },
            {
                "menuId": 23439,
                "systemId": 3000,
                "menuName": "工地质检",
                "url": "/workspace/siteInspection.html",
                "icon": "icon-icon_daiban",
                "parentId": 23376,
                "roleId": 20003,
                "itemId": 46958,
                "childs": []
            },
            {
                "menuId": 23436,
                "systemId": 3000,
                "menuName": "安装验收",
                "url": "/workspace/install-acceptance.html",
                "icon": "icon-icon_daiban",
                "parentId": 23376,
                "roleId": 20003,
                "itemId": 46959,
                "childs": []
            }
        ]
    },
    {
        "menuId": 23381,
        "systemId": 3000,
        "menuName": "流程审批",
        "url": "",
        "icon": "",
        "parentId": 20000,
        "roleId": 23333,
        "itemId": 46582,
        "childs": [
            {
                "menuId": 23382,
                "systemId": 3000,
                "menuName": "定价",
                "url": "/workspace/price-list.html",
                "icon": "icon-dingdan1",
                "parentId": 23381,
                "roleId": 20003,
                "itemId": 46659,
                "childs": []
            },
            {
                "menuId": 23387,
                "systemId": 3000,
                "menuName": "钉钉审批",
                "url": "https://ding.sit.ihomefnt.org/dingding.html#/beta-todo-list/",
                "icon": "icon-dingdan1",
                "parentId": 23381,
                "roleId": 23333,
                "itemId": 46585,
                "childs": []
            }
        ]
    },
    {
        "menuId": 23385,
        "systemId": 3000,
        "menuName": "统计分析",
        "url": "",
        "icon": "",
        "parentId": 20000,
        "roleId": 20003,
        "itemId": 46631,
        "childs": [
            {
                "menuId": 23386,
                "systemId": 3000,
                "menuName": "报表",
                "url": "/workspace/chat-main.html",
                "icon": "icon-qushi",
                "parentId": 23385,
                "roleId": 20003,
                "itemId": 46663,
                "childs": []
            }
        ]
    },
    {
        "menuId": 23383,
        "systemId": 3000,
        "menuName": "业务看板",
        "url": "",
        "icon": "",
        "parentId": 20000,
        "roleId": 23333,
        "itemId": 46591,
        "childs": [
            {
                "menuId": 23384,
                "systemId": 3000,
                "menuName": "销售看板",
                "url": "./board/board-main.html",
                "icon": "icon-icon_daiban",
                "parentId": 23383,
                "roleId": 23333,
                "itemId": 46592,
                "childs": []
            },
            {
                "menuId": 23409,
                "systemId": 3000,
                "menuName": "交付看板",
                "url": "./board/board-deliver.html",
                "icon": "icon-icon_daiban",
                "parentId": 23383,
                "roleId": 20003,
                "itemId": 46662,
                "childs": []
            }
        ]
    },
    {
        "menuId": 23423,
        "systemId": 3000,
        "menuName": "客服业务",
        "url": "",
        "icon": "",
        "parentId": 20000,
        "roleId": 20003,
        "itemId": 46775,
        "childs": [
            {
                "menuId": 23424,
                "systemId": 3000,
                "menuName": "工单处理",
                "url": "./customer-service/my-work-list.html",
                "icon": "icon-shouji",
                "parentId": 23423,
                "roleId": 20003,
                "itemId": 46799,
                "childs": []
            },
            {
                "menuId": 23425,
                "systemId": 3000,
                "menuName": "绑定小艾",
                "url": "./customer-service/bind-customer-list.html",
                "icon": "icon-qushi",
                "parentId": 23423,
                "roleId": 20003,
                "itemId": 46800,
                "childs": []
            },
            {
                "menuId": 23427,
                "systemId": 3000,
                "menuName": "工单分配",
                "url": "./customer-service/my-work-order-manages/list-tab-first.html",
                "icon": "icon-qushi",
                "parentId": 23423,
                "roleId": 20003,
                "itemId": 46801,
                "childs": []
            }
        ]
    }
]

export default class Index extends Component<any, any> {
    render() {
        return (
            <Scene
                header={"工作台"}
                hasBack={false}
                style={styles.bg}
            >
                <ScrollView style={styles.contailor}>
                    {/* 轮播图片 */}
                    <Gallery />
                    {/* 常用功能 */}
                    <MenuCard data={data[0]} />
                </ScrollView>
            </Scene>
        )
    }
}


const styles = StyleSheet.create({
    contailor: {
        flex: 1
    },
    bg: {
        backgroundColor: Theme.pages.content_default_bg
    }
});