import React, { Component } from 'react';
import { Text, View, StyleSheet, FlatList} from 'react-native';
import { Scene, Theme } from 'UIKit';
import { Icon } from 'UIcon';

const data = [
  {'name':'底部菜单','page':''},
  { 'name': '下拉刷新上拉加载更多', 'page': '' }
]

export default class Index extends Component<any, any> {
  render() {
    return (
      <Scene header={'工作台'} hasBack={false} style={styles.bg}>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return(
              <View style={styles.itemView}>
                <View style={styles.itemLeft}>
                   <Text>{item.name}</Text>
                </View>
                <View style={styles.itemRight}>
                   <Icon name={'antDesign|right'} size={24} color={'#a1a1a1'} />
                </View>
              </View>
            )
          }
        }/>
      </Scene>
    );
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
