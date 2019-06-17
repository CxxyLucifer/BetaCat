import React from 'react';
import { View } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { WithTheme } from '../style';
import TabBarStyles from './style/index';
import TabBarItem from './TabBarItem';
class TabBar extends React.Component {
    getPanes(styles, content) {
        const { tintColor, unselectedTintColor, children } = this.props;
        // ios 规则： selected 为多个则只选中最后一个， selected 为 0 个则选中第一个;
        let selectedIndex = 0;
        [].concat(children).forEach((child, idx) => {
            if (child.props.selected) {
                selectedIndex = idx;
            }
        });
        const newChildren = [];
        React.Children.map(children, (child, idx) => {
            if (content && selectedIndex === idx) {
                newChildren.push(<View key={idx} style={[styles.contentItem, idx === selectedIndex ? styles.contentItemSelected : undefined]}>
            {child.props.children}
          </View>);
            }
            else {
                newChildren.push(React.cloneElement(child, {
                    key: idx,
                    tintColor,
                    unselectedTintColor,
                    styles,
                }));
            }
        });
        if (content) {
            return newChildren.filter((_, i) => i === selectedIndex);
        }
        return newChildren;
    }
    render() {
        const style = { backgroundColor: this.props.barTintColor };
        return (<SafeAreaView forceInset={{ bottom: 'always', top: 'never' }} style={[{ flex: 1 }, style]}>
        <WithTheme styles={this.props.styles} themeStyles={TabBarStyles}>
          {styles => (<View style={styles.tabbar}>
              <View style={styles.content}>{this.getPanes(styles, true)}</View>
              <View style={[style, styles.tabs]}>{this.getPanes(styles, false)}</View>
            </View>)}
        </WithTheme>
      </SafeAreaView>);
    }
}
TabBar.defaultProps = {
    barTintColor: 'white',
    tintColor: '#108ee9',
    unselectedTintColor: '#888',
};
TabBar.Item = TabBarItem;
export default TabBar;
