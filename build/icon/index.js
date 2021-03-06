/**
 * Created by guangqiang on 2017/9/14.
 */
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MyIcon } from './myIcon';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
const iconMap = {
    fontAwesome: FontAwesome,
    antDesign: AntDesign,
    evilIcons: EvilIcons,
    materialCommunity: MaterialCommunityIcons,
    myIcon: MyIcon,
};
class Icon extends Component {
    render() {
        const { name, size, color } = this.props;
        if (!name.includes('|')) {
            throw new Error('name 解析错误！');
            return null;
        }
        let nameArr = name.split('|');
        let fontlib = nameArr[0];
        let font = nameArr[1];
        let CustomIcon = iconMap[fontlib];
        if (!CustomIcon)
            throw new Error(`没有找到匹配的{${name}}font库，请review代码！`);
        return (<CustomIcon name={font} size={size} color={color}/>);
    }
}
Icon.propTypes = {
    name: PropTypes.string.isRequired,
    size: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired
};
export { Icon };
