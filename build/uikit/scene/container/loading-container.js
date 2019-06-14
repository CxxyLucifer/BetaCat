'use strict';
import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Loading from '../../loading';
import { START, END } from './loading-status';
export default class LoadingContainer extends Component {
    render() {
        const { loading, children } = this.props;
        return (<View style={[styles.container, this.props.style]}>
        {loading === START ? <Loading /> : children}
      </View>);
    }
}
LoadingContainer.defaultProps = {
    loading: END,
    style: null
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});
