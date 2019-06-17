import React, { isValidElement } from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { Icon } from 'UIcon';
export default class TabBarItem extends React.Component {
    render() {
        const { title, selected, tintColor, unselectedTintColor, icon, selectedIcon, onPress, badge, iconStyle, } = this.props;
        const styles = this.props.styles;
        const itemSelectedStyle = selected ? styles.barItemSelected : null;
        const badgeDom = badge ? (<View style={[styles.badge]}>
        <Text style={[styles.badgeText]}>{badge}</Text>
      </View>) : null;
        // icon
        const source = selected && selectedIcon !== undefined ? selectedIcon : icon !== undefined ? icon : null;
        const color = selected ? tintColor : unselectedTintColor;
        const isIcon = source && source.type && source.type.displayName === 'Icon';
        return (<TouchableWithoutFeedback onPress={onPress}>
        <View style={[styles.barItem, itemSelectedStyle]}>
          <View>
            {source === null ? null : isValidElement(source) ? (isIcon ? (<Icon color={color} {...source.props}/>) : (source)) : (<Image source={source} style={[styles.barIcon, iconStyle]}/>)}
            {badgeDom}
          </View>
          <Text style={[styles.barItemTitle, { color }]}>{title}</Text>
        </View>
      </TouchableWithoutFeedback>);
    }
}
TabBarItem.defaultProps = {
    onPress() { },
};
