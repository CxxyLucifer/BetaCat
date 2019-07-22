import React, { PureComponent } from 'react';
import { 
  View,
  Text,
  Dimensions,
  StyleSheet,
  SectionList,
  FlatList,
  PixelRatio,
  Image,
  TouchableOpacity
} from 'react-native';
import sectionListGetItemLayout from 'react-native-section-list-get-item-layout';
import { PinYinUtil, Scene, Theme, NoData, Toast} from 'UIKit';
import { queryContactList } from './webapi';

export interface itemProps {
  avatar?: string;
  department?: string;
  email?: string;
  mobile?: string;
  name?: string;
}

export interface sectionDataProps {
  key?: string;
  title?: string;
  data?: Array<itemProps>;
}

export default class Index extends PureComponent<any, any> {
  _sectionList: any;
  constructor(props) {
    super(props);
    this.state = {
      sections: [], //处理过后的数据
      letterArr: [],//拼音首字母
    };
  }

  componentDidMount(){
    this._queryContactList();
  }

  render() {
    const {letterArr, sections} = this.state;

    //偏移量 = （设备高度 - 字母索引高度 - 底部导航栏 - 顶部标题栏 - 24）/ 2
    const top_offset = (Dimensions.get('window').height - letterArr.length * 22 - 52 - 44 - 24) / 2;

    return (
      <Scene header={'通讯录'} hasBack={false} style={styles.container}>
        <View style={styles.content}>
          {
            sections.length ? 
              <SectionList
                ref={sectionView => (this._sectionList = sectionView)}
                renderSectionHeader={this._renderSectionHeader}
                ItemSeparatorComponent={() =>
                  <View style={styles.horizontalLine} />
                }
                sections={sections}
                keyExtractor={(item, index) => item + index}
                getItemLayout={this._getItemLayout}
                ListEmptyComponent={() => <NoData />}
                renderItem={({ item, index }) => this._renderItem(item, index)}
              /> : <View/>
          }
          {
            letterArr.length ?
              <View style={[styles.rightLatterView, { top: top_offset }]}>
                <FlatList
                    data= {letterArr}
                    keyExtractor = {(item:string, index) => index.toString()}
                    renderItem={({item,index}) =>
                      <TouchableOpacity style={styles.latterItem} onPress={()=>{this._onSectionselect(index)}}>
                        <Text style={styles.latter}>{item.toUpperCase()}</Text>
                      </TouchableOpacity>
                    }
                />
              </View> : <View/>
          }
        </View>
      </Scene>
    );
  }

  _getItemLayout = sectionListGetItemLayout({
    getItemHeight: (rowData, sectionIndex, rowIndex) => 70,
    getSeparatorHeight: () => 1 / PixelRatio.get(),
    listHeaderHeight: 20,
  })

  _renderSectionHeader(sectionItem){
    const {section} = sectionItem;

    return(
      <View style={styles.sectionHeader}>
          <Text style={{fontSize: 16}}>{section.title.toUpperCase()}</Text>
      </View>
    );
  }

  _renderItem(item, index){
    return(
      <TouchableOpacity style={styles.contactItem} activeOpacity={0.75}>
          <Image source={require('../../img/default_avatar.png')} style={{height:40, width:40}} />
            <View style={styles.basicInfo}>
              <View>
                  <Text style={styles.nameStyle}>{item.name}</Text>
                  <Text style={{fontSize:12}}>{item.department}</Text>
                  <Text style={{fontSize:12}}>{item.roleName}</Text>
              </View>
              <View style={styles.contactInfo}>
                  
              </View>
          </View>
      </TouchableOpacity>
    );
  }

  _onSectionselect = (key) => {
    this._sectionList.scrollToLocation({ animated: false, sectionIndex: key, itemIndex: 0, viewPosition:0});
  };

  _queryContactList = ()=> {
    Toast.loading('加载中...',0);
    queryContactList().then((res) => {
      Toast.hide();
      const { data } = res;
      const dataList: Array<itemProps> = data.list || [];

      let sections: Array<sectionDataProps> = [];
      let letterArr: Array<string> = [];

      dataList.map((item, index) => {
        const firstLetter = PinYinUtil.getFirstLetter(item.name);
        if (letterArr.indexOf(firstLetter) == -1) {
          letterArr.push(firstLetter);
        }
      })
      letterArr.sort();

      letterArr.map((item, index) => {
        const data = dataList.filter((obj) => {
          return PinYinUtil.getFirstLetter(obj.name) == item;
        })
        sections.push({ key: item, title: item, data });
      })
      this.setState({ letterArr, sections });
    }).catch((err)=>{
      Toast.hide();
    })
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.pages.content_default_bg,
  },
  content:{
    flex: 1, 
    flexDirection: 'row', 
    justifyContent: 'flex-start'
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
  horizontalLine:{
    height: 1 / PixelRatio.get(), 
    backgroundColor: '#E3E3E3', 
    marginHorizontal: 10
  },
  btnStyle: {
    width:30,
    height: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 2,
  },
  sectionHeader:{
    height: 20, 
    backgroundColor: '#f2f2f2', 
    paddingHorizontal: 10, 
    flexDirection: 'row', 
    alignItems: 'center'
  },
  rightLatterView:{
    position: 'absolute', 
    width: 26, right: 0, 
    backgroundColor: 'rgba(0,0,0,0.3)', 
    borderRadius: 20, 
    paddingTop: 5, 
    paddingBottom: 5
  },
  latterItem:{
    marginVertical: 2, 
    height: 18, 
    flexDirection: 'row', 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  latter:{
    fontSize: 12, 
    color: 'white', 
    fontWeight: '600'
  },
  contactItem:{
    paddingLeft: 20, 
    paddingRight: 30, 
    height: 70, 
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    backgroundColor: 'white', 
    alignItems: 'center'
  },
  basicInfo:{
    marginLeft: 10, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    flexGrow: 1
  },
  contactInfo:{
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    width: 100
  }
});
