import React, { PureComponent } from 'react';
import { View,
  Text,
  Dimensions,
  StyleSheet,
  SectionList,
  FlatList,
  Image,
  TouchableOpacity
} from 'react-native';
import { Content } from 'native-base';
import { PinYinUtil, Scene, Fetch,Theme } from 'UIKit';

const MySectionList:any = SectionList;
export interface itemProps {
  avatar?: string;
  department?: string;
  email?: string;
  mobile?: string;
  name?: string;
}

export default class Example extends PureComponent<any, any> {
  _sectionList: any;
  constructor(props) {
    super(props);
    this.state = {
      sections: [],
      letterArr: [],//拼音首字母
    };
  }

  componentDidMount(){
    this._getContacts();
  }

  render() {
    const {letterArr, sections} = this.state;

    //偏移量 = （设备高度 - 字母索引高度 - 底部导航栏 - 顶部标题栏 - 24）/ 2
    const top_offset = (Dimensions.get('window').height - letterArr.length * 22 - 52 - 44 - 24) / 2;

    return (
      <Scene header={'通讯录'} hasBack={false} style={styles.container}>
        <Content contentContainerStyle={{flex:1,flexDirection:'row',justifyContent:'flex-start'}}>
            <MySectionList
                ref={sectionView => (this._sectionList = sectionView)}
                renderSectionHeader={this._renderSectionHeader}
                ItemSeparatorComponent={() => <View style={{height: 1, backgroundColor: '#E3E3E3',marginHorizontal:10}}/>}
                sections={sections}
                keyExtractor={(item, index) => item + index}
                numColumns={1}
                getItemLayout={this._getItemLayout}
                renderItem={({item, index}) => this._renderItem(item, index)}
            />
            {
              letterArr.length ?
                <View style={{position:'absolute',width:26,right:0,top:top_offset,backgroundColor:'rgba(0,0,0,0.3)',borderRadius:10,paddingTop:5,paddingBottom:5}}>
                  <FlatList
                      data= {letterArr}
                      keyExtractor = {(item:string, index) => index.toString()}
                      renderItem={({item,index}) =>
                          <TouchableOpacity style={{marginVertical:2,height:18,flexDirection:'row',justifyContent:'center',alignItems:'center'}}
                            onPress={()=>{this._onSectionselect(index)}}
                          >
                              <Text style={{fontSize:12,color:'white',fontWeight:'600'}}>{item.toUpperCase()}</Text>
                          </TouchableOpacity>
                      }
                  />
              </View>:<View/>
            }
        </Content>
      </Scene>
    );
  }

  _renderSectionHeader(sectionItem){
    const {section} = sectionItem;
    return(
        <View style={{height:20,backgroundColor:'#f2f2f2',paddingHorizontal:10,flexDirection:'row',alignItems:'center'}}>
            <Text style={{fontSize: 16}}>{section.title.toUpperCase()}</Text>
        </View>
    );
  }


  _renderItem(item, index){
    return(
        <TouchableOpacity style={{paddingLeft:20,paddingRight:30,height:70,flexDirection:'row',justifyContent:'flex-start',backgroundColor:'white',alignItems:'center'}}
          activeOpacity={0.75}
        >
            <Image source={require('../../img/default_avatar.png')} style={{height:40, width:40}} />
            <View style={{marginLeft:10,flexDirection:'row',justifyContent:'space-between',flexGrow:1}}>
                <View>
                    <Text style={styles.nameStyle}>{item.name}</Text>
                    <Text style={{fontSize:12}}>{item.department}</Text>
                    <Text style={{fontSize:12}}>{item.roleName}</Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: 100}}>
                    
                </View>
            </View>
        </TouchableOpacity>
      );
  }

  _getItemLayout(data, index) {
    //每个分组里的列表项的高度都为 45,头部高度都为 20
    //index: 元素索引位置信息， offset: 该元素距离列表顶部的距离， length: 该元素自身的高度
    return {length: 70, offset: 70 * index + 20, index: index}
  }

  _onSectionselect = (key) => {
    this._sectionList.scrollToLocation({animated: false, sectionIndex: key, itemIndex: 0});
  };

  _getContacts= async ()=> {
    const url = 'https://www.easy-mock.com/mock/5d316c4628b6660fbc183930/betaCat/queryAddressBook';

    const { data } = await Fetch(url, { method:'post'});
    const dataList: Array<itemProps> = data.list || [];

    let sections = [];
    let letterArr: Array<string> = [];

    dataList.map((item,index)=>{
      const firstLetter = PinYinUtil.getFirstLetter(item.name);
      if(letterArr.indexOf(firstLetter) == -1){
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
    this.setState({ letterArr, sections});
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.pages.content_default_bg,
  },
  nameStyle: {
    fontSize: 14,
    color: '#1a1a1a',
  },
  userStyle: {
    fontSize: 12,
  },
  iconStyle: {
    color: '#4597cd',
    fontSize: 24,
  },
  iconImg:{
    width: 20,
    height: 20,
  },
  btnStyle: {
    width:30,
    height: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  }
});
