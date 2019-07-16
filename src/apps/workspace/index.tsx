import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import { Scene, Theme, SwipeAction } from 'UIKit';
import { msg } from 'plume2';
import { Icon } from 'UIcon';

const data = [
  {'name':'底部菜单','page':''},
  {'name': '下拉刷新上拉加载更多', 'page': '' }
]

export default class Index extends Component<any, any> {
  render() {
    return (
      <Scene header={'工作台'} hasBack={false} style={styles.bg}>
        <FlatList
          data={data}
          renderItem={this._renderItem}/>
      </Scene>
    );
  }

  _renderItem = ({ item }) => {
    const right = [
      {
        text: '更多',
        onPress: () => console.log('more'),
        style: { backgroundColor: 'orange', color: 'white' },
      },
      {
        text: '删除',
        onPress: () => console.log('delete'),
        style: { backgroundColor: 'red', color: 'white' },
      },
    ];

    return(
      <SwipeAction
        autoClose
        style={{ backgroundColor: 'transparent' }}
        right={right}
        onOpen={() => console.log('open')}
        onClose={() => console.log('close')}
      >
        <TouchableOpacity style={styles.itemView}>
          <View style={styles.itemLeft}>
            <Text>{item.name}</Text>
          </View>
          <View style={styles.itemRight}>
            <Icon name={'antDesign|right'} size={24} color={'#a1a1a1'} />
          </View>
        </TouchableOpacity>
      </SwipeAction>
    )
  }

}

const styles = StyleSheet.create({
  contailor: {
    flex: 1,
  },
  bg: {
    backgroundColor: Theme.pages.content_default_bg,
  },
  itemView: {
    height:50,
    flexDirection:'row',
    borderBottomWidth: 1,
    borderBottomColor: '#f9f9f9',
    backgroundColor:'white',
  },
  itemLeft: {
    flex:1,
    paddingLeft:15,
    justifyContent:'center',
  },
  itemRight: {
    width:30,
    justifyContent: 'center',
  }
});
