import React, { Component } from 'react';
import { View,Text} from 'react-native';
import { PinYinUtil, Scene, Fetch } from 'UIKit';

import styles from './styles';

export interface itemProps {
  avatar?: string;
  department?: string;
  email?: string;
  mobile?: string;
  name?: string;
}

export default class Example extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      listData: [],
      letterArr: [],//拼音首字母
      showIndex: -1, 
    };
  }

  componentWillMount(){
    this._getContacts();
  }

  render() {
    return (
      <Scene header={'通讯录'} hasBack={false} style={styles.container}>
        <Text>11111</Text>
      </Scene>
    );
  }


  _getContacts= async ()=> {
    const url = 'https://www.easy-mock.com/mock/5d316c4628b6660fbc183930/betaCat/queryAddressBook';
    const { data } = await Fetch(url, { method:'post'});
    const dataList: Array<itemProps> = data.list || [];

    let sections = [];
    let letterArr: Array<string> = [];

    dataList.map((item,index)=>{
      const firstLetter = PinYinUtil.getFirstLetter(item.name);
      if(letterArr.indexOf(firstLetter)!=-1){
        letterArr.push(firstLetter);
      }
    })
    letterArr.sort();

    letterArr.map((item, index)=>{
      const data = dataList.filter((obj)=>{
        return PinYinUtil.getFirstLetter(obj.name) == item;
      })
      sections.push({ key: item, title: item, data }); 
    })

    this.setState({
      listData: dataList,
      letterArr,
      sections,
    });

  }



}
