import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Dimensions, FlatList, Platform, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { msg } from 'plume2';
import Kit from '../kit';
import RefreshableScrollView from './refreshableScrollView';
import BackToTop from './back-to-top';
import NoData from '../no-data';
import LoadingSpinner from '../loadingSpinner';
const { width, height } = Dimensions.get('window');
const PaginationStatus = {
    firstLoad: 0,
    waiting: 1,
    allLoaded: 2
};
export default class AJListView extends Component {
    constructor(props) {
        super(props);
        this.onRefresh = () => {
            console.log('onRefresh()');
            if (this.mounted) {
                this.setState({
                    isRefreshing: true
                });
                this.setPage(1);
                this.props.onFetch(this.getPage(), this.postRefresh, this.endFetch);
            }
        };
        this.onPaginate = () => {
            if (this.state.paginationStatus !== PaginationStatus.allLoaded && !this.state.isRefreshing) {
                console.log('onPaginate()');
                this.setState({ paginationStatus: PaginationStatus.waiting });
                this.props.onFetch(this.getPage() + 1, this.postPaginate, this.endFetch);
            }
        };
        this.onEndReached = () => {
            // console.log('onEndReached()');
            if (this.props.pagination && this.props.autoPagination && this.state.paginationStatus === PaginationStatus.waiting) {
                this.onPaginate();
            }
        };
        this._scrollOffset = 0; // 返回顶部后需要隐藏返回顶底按钮;
        this.setPage = page => this.page = page;
        this.getPage = () => this.page;
        this.setRows = rows => this.rows = rows;
        this.getRows = () => this.rows;
        this.sleep = time => new Promise(resolve => setTimeout(() => resolve(), time));
        this.refresh = () => {
            this.onRefresh();
        };
        this.scrollToOffset = (option) => {
            this._flatList.scrollToOffset(option);
        };
        this.scrollToIndex = (option) => {
            this._flatList.scrollToIndex(option);
        };
        this.scrollToItem = (option) => {
            this._flatList.scrollToItem(option);
        };
        this.scrollToEnd = (option) => {
            this._flatList.scrollToEnd(option);
        };
        this.postRefresh = (rows = [], pageLimit) => {
            if (this.mounted) {
                let paginationStatus = PaginationStatus.waiting;
                if (rows.length < pageLimit) {
                    paginationStatus = PaginationStatus.allLoaded;
                }
                this.updateRows(rows, paginationStatus);
            }
        };
        this.endFetch = () => {
            // console.log('endRefresh()');
            if (this.mounted) {
                this.setState({ isRefreshing: false });
                if (this.props.refreshableMode === 'advanced' && this._flatList._listRef._scrollRef.onRefreshEnd) {
                    this._flatList._listRef._scrollRef.onRefreshEnd();
                }
            }
        };
        this.postPaginate = (rows = [], pageLimit) => {
            this.setPage(this.getPage() + 1);
            let mergedRows;
            let paginationStatus;
            if (rows.length === 0) {
                paginationStatus = PaginationStatus.allLoaded;
            }
            else {
                mergedRows = this.getRows().concat(rows);
                paginationStatus = PaginationStatus.waiting;
            }
            this.updateRows(mergedRows, paginationStatus);
        };
        this.updateRows = (rows, paginationStatus) => {
            if (rows) {
                this.setRows(rows);
                this.setState({
                    dataSource: rows,
                    isRefreshing: false,
                    paginationStatus
                });
            }
            else {
                this.setState({
                    dataSource: this.getRows().slice(),
                    isRefreshing: false,
                    paginationStatus
                });
            }
            if (this.props.refreshableMode === 'advanced') {
                this.endFetch();
            }
        };
        this.paginationFetchingView = () => {
            if (this.props.paginationFetchingView) {
                return this.props.paginationFetchingView();
            }
            return (<View style={styles.fetchingView}>
        <Text style={styles.paginationViewText}>{this.props.waitingSpinnerText}</Text>
      </View>);
        };
        this.paginationAllLoadedView = () => {
            if (this.props.pagination) {
                if (this.props.paginationAllLoadedView) {
                    return this.props.paginationAllLoadedView();
                }
                return (<View style={styles.paginationView}>
          <Text style={styles.allLoadedText}>
            {this.props.allLoadedText}
          </Text>
        </View>);
            }
            return null;
        };
        this.paginationWaitingView = (paginateCallback) => {
            if (this.props.pagination) {
                if (this.props.autoPagination) {
                    if (this.props.paginationWaitingView) {
                        return this.props.paginationWaitingView(paginateCallback);
                    }
                    return (<View style={styles.paginationView}>
            <ActivityIndicator color={this.props.spinnerColor} size={this.props.waitingSpinnerSize}/>
            <Text style={[styles.paginationViewText, { marginLeft: 5 }]}>{this.props.waitingSpinnerText}
            </Text>
          </View>);
                }
            }
            return null;
        };
        this.renderHeader = () => {
            if (this.props.header) {
                return this.props.header();
            }
            return null;
        };
        this.renderItem = ({ item, index, separators }) => {
            if (this.props.item) {
                return this.props.item(item, index, separators);
            }
            return null;
        };
        this.renderSeparator = () => {
            if (this.props.separator) {
                if (this.props.numColumns > 1) {
                    return null;
                }
                return this.props.separator();
            }
            return null;
        };
        this.renderEmptyView = () => {
            if (this.state.paginationStatus !== PaginationStatus.firstLoad && this.props.emptyView && !this.state.isRefreshing) {
                return this.props.emptyView();
            }
            else if (this.state.paginationStatus !== PaginationStatus.firstLoad && !this.state.isRefreshing) {
                return (<NoData />);
            }
            return null;
        };
        this.renderFooter = () => {
            if (this.state.paginationStatus === PaginationStatus.firstLoad) {
                return this.paginationFetchingView();
            }
            else if (this.state.paginationStatus === PaginationStatus.waiting && this.props.autoPagination === false) {
                return this.paginationWaitingView(this.onPaginate);
            }
            else if (this.state.paginationStatus === PaginationStatus.waiting && this.props.autoPagination === true) {
                return this.paginationWaitingView();
            }
            else if (this.getRows().length !== 0 && this.state.paginationStatus === PaginationStatus.allLoaded) {
                return this.paginationAllLoadedView();
            }
            return null;
        };
        this.renderScrollComponent = (props) => {
            if (this.props.refreshable && this.props.refreshableMode === 'advanced') {
                return (<RefreshableScrollView {...props} insideOfUltimateListView onRefresh={this.onRefresh} ref={ref => this.scrollView = ref}/>);
            }
            return (<ScrollView {...props} ref={ref => this.scrollView = ref}/>);
        };
        this.renderRefreshControl = () => {
            if (this.props.refreshable && this.props.refreshableMode === 'basic') {
                if (this.props.customRefreshControl) {
                    return this.props.customRefreshControl(this.state.isRefreshing, this.onRefresh);
                }
                return (<RefreshControl onRefresh={this.onRefresh} refreshing={this.state.isRefreshing} colors={this.props.refreshableColors} progressBackgroundColor={this.props.refreshableProgressBackgroundColor} size={this.props.refreshableSize} tintColor={this.props.refreshableTintColor} title={this.props.refreshableTitle}/>);
            }
            return null;
        };
        /**
         * 回到顶部
         */
        this._renderFlowBtn = () => {
            return (<View style={styles.shortcut}>
        <BackToTop show={this._scrollOffset > Kit.Height / 2} onPress={() => { this.scrollToOffset({ animated: true, offset: 0 }); }}/>
      </View>);
        };
        /**
        * 处理滚动
        * @param e
        * @private
        */
        this._handleScroll = e => {
            const { contentOffset, contentInset } = e.nativeEvent;
            this._scrollOffset = contentOffset.y + contentInset.top;
            if (this._scrollOffset < 10) {
                msg.emit('flat-list:back-to-top', true);
            }
            else if (this._scrollOffset > Kit.Height / 2) {
                msg.emit('flat-list:back-to-top', false);
            }
        };
        this.setPage(1);
        this.setRows([]);
        this.state = {
            dataSource: [],
            isRefreshing: false,
            paginationStatus: PaginationStatus.firstLoad
        };
    }
    componentDidMount() {
        this.mounted = true;
        if (this.props.firstLoader) {
            this.props.onFetch(this.getPage(), this.postRefresh, this.endFetch);
        }
    }
    componentWillUnmount() {
        this.mounted = false;
    }
    updateDataSource(rows = []) {
        this.setRows(rows);
        this.setState({
            dataSource: rows
        });
    }
    render() {
        const { numColumns } = this.props;
        return (<View style={styles.container}>
        <FlatList {...this.props} ref={ref => this._flatList = ref} key={numColumns} keyExtractor={(item, index) => `${index} - ${item}`} onEndReachedThreshold={0.1} data={this.state.dataSource} renderItem={this.renderItem} onScroll={e => this._handleScroll(e)} scrollRenderAheadDistance={1000} scrollEventThrottle={32} renderScrollComponent={this.renderScrollComponent} ItemSeparatorComponent={this.renderSeparator} ListHeaderComponent={this.renderHeader} ListFooterComponent={this.renderFooter} ListEmptyComponent={this.renderEmptyView} onEndReached={this.onEndReached} refreshControl={this.renderRefreshControl()} numColumns={numColumns}/>
        
        {this._renderFlowBtn()}
      </View>);
    }
}
AJListView.defaultProps = {
    initialNumToRender: 10,
    horizontal: false,
    firstLoader: true,
    scrollEnabled: true,
    onFetch: null,
    enableEmptySections: true,
    // Custom View
    header: null,
    item: null,
    paginationFetchingView: () => {
        return (<LoadingSpinner height={height * 0.2} text="加载中..."/>);
    },
    paginationAllLoadedView: null,
    paginationWaitingView: null,
    emptyView: null,
    separator: null,
    // Refreshable
    refreshable: true,
    refreshableMode: Platform.OS === 'android' ? 'basic' : 'advanced',
    // RefreshControl
    refreshableTitle: null,
    refreshableColors: ['dimgray', 'tomato', 'limegreen'],
    refreshableProgressBackgroundColor: 'white',
    refreshableSize: undefined,
    refreshableTintColor: 'lightgray',
    customRefreshControl: null,
    // Advanced RefreshView
    refreshableTitlePull: '下拉刷新',
    refreshableTitleRefreshing: '加载中...',
    refreshableTitleRelease: '松开刷新',
    customRefreshView: null,
    displayDate: false,
    dateFormat: 'yyyy-MM-dd hh:mm',
    dateTitle: '最后更新: ',
    arrowImageSource: require('img/downArrow.png'),
    arrowImageStyle: { width: 20, height: 20, resizeMode: 'contain' },
    refreshViewStyle: Platform.OS === 'ios' ? { height: 80, top: -80 } : { height: 80 },
    dateStyle: undefined,
    refreshViewHeight: 80,
    // Pagination
    pagination: true,
    autoPagination: true,
    allLoadedText: '没有更多了~',
    // Spinner
    spinnerColor: undefined,
    fetchingSpinnerSize: 'large',
    waitingSpinnerSize: 'small',
    waitingSpinnerText: '加载中...',
    // Pagination Button
    paginationBtnText: '加载更多...',
    // GridView
    numColumns: 1
};
AJListView.propTypes = {
    initialNumToRender: PropTypes.number,
    horizontal: PropTypes.bool,
    firstLoader: PropTypes.bool,
    scrollEnabled: PropTypes.bool,
    onFetch: PropTypes.func,
    enableEmptySections: PropTypes.bool,
    // Custom ListView
    header: PropTypes.func,
    item: PropTypes.func,
    paginationFetchingView: PropTypes.func,
    paginationAllLoadedView: PropTypes.func,
    paginationWaitingView: PropTypes.func,
    emptyView: PropTypes.func,
    separator: PropTypes.func,
    // Refreshable
    refreshable: PropTypes.bool,
    refreshableMode: PropTypes.string,
    // RefreshControl
    refreshableTitle: PropTypes.string,
    refreshableColors: PropTypes.array,
    refreshableProgressBackgroundColor: PropTypes.string,
    refreshableSize: PropTypes.string,
    refreshableTintColor: PropTypes.string,
    customRefreshControl: PropTypes.func,
    // Advanced RefreshView
    refreshableTitlePull: PropTypes.string,
    refreshableTitleRefreshing: PropTypes.string,
    refreshableTitleRelease: PropTypes.string,
    customRefreshView: PropTypes.func,
    displayDate: PropTypes.bool,
    dateFormat: PropTypes.string,
    dateTitle: PropTypes.string,
    arrowImageSource: PropTypes.any,
    arrowImageStyle: PropTypes.object,
    refreshViewStyle: PropTypes.object,
    dateStyle: PropTypes.object,
    refreshViewHeight: PropTypes.number,
    // Pagination
    pagination: PropTypes.bool,
    autoPagination: PropTypes.bool,
    allLoadedText: PropTypes.string,
    // Spinner
    spinnerColor: PropTypes.string,
    fetchingSpinnerSize: PropTypes.any,
    waitingSpinnerSize: PropTypes.any,
    waitingSpinnerText: PropTypes.string,
    // Pagination Button
    paginationBtnText: PropTypes.string,
    // GridView
    numColumns: PropTypes.number
};
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    fetchingView: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center'
    },
    paginationView: {
        flex: 0,
        width,
        height: 55,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    paginationViewText: {
        fontSize: 16
    },
    paginationViewSpinner: {
        marginRight: 5
    },
    paginationBtn: {
        backgroundColor: 'tomato',
        margin: 10,
        borderRadius: 20,
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    paginationBtnText: {
        fontSize: 16,
        color: 'white',
        fontWeight: 'bold'
    },
    separator: {
        height: 0.5,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: 'lightgray'
    },
    emptyView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    allLoadedText: {
        alignSelf: 'center',
        color: '#bfbfbf'
    },
    gridItem: {
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center'
    },
    gridView: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap'
    },
    shortcut: {
        position: 'absolute',
        right: 18,
        bottom: 25,
        width: 40
    }
});
