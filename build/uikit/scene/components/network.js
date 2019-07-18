import React from 'react';
import { View, StyleSheet } from 'react-native';
import Kit from '../../kit';
import Button from '../../button';
import Text from '../../text';
export default class NoNetwork extends React.Component {
    render() {
        return (<View style={styles.container}>
        <View style={[styles.body]}>
          <Text style={styles.bodyText}>喂喂，网断啦，连不上啦</Text>
          <Text style={styles.bodyText}>快去检查网络</Text>
          <Button style={styles.btn} size="small" onPress={this.props.onPress}>
            重新加载
          </Button>
        </View>
      </View>);
    }
}
NoNetwork.defaultProps = {
    onPress: Kit.noop,
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bodyText: {
        fontSize: 14,
        color: '#999',
        lineHeight: 20,
        marginBottom: 5,
    },
    btn: {
        marginTop: 15,
        width: 180,
    },
});
