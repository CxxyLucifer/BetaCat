import React from 'react';
import {
    BackHandler,
    Platform,
    NativeModules
} from 'react-native';
import { createAppContainer, createStackNavigator, NavigationActions } from 'react-navigation';
import { msg } from 'plume2';
import { List } from 'immutable';
import Routes from './route';

const noop = () => { }

const backOutPages = List([
    'Login'
]);


export default class Index extends React.Component<any, any> {
    Routes: any;
    navigation: any;
    _sceneName: any;
    // 防止快速点击，重复进路由
    debounce: boolean;

    props: {
        // 初始化页面
        initialRoute: string;
        isShowPopup: boolean;
    };

    constructor(props) {
        super(props);

        //直接跳转到最顶层,销毁其它所有页面
        msg.on('route:popToTop', this._popToTop);
        // 跳转页面
        msg.on('route:goToNext', this._goToNext);
        // 回上一个页面
        msg.on('route:backToLast', this._backToLast);
        // 回上第一个页面
        msg.on('route:backToTop', this._backToTop);
        // 回指定页面，根据路由位置
        msg.on('route:popToRoute', this._popToRoute);
        // 替换页面，根据路由名称
        msg.on('route:replaceRoute', this._replaceRoute);
        // 替换页面，根据路由位置
        msg.on('route:replaceAtIndex', this._replaceAtIndex);
        // 退出应用
        msg.on('app:backOut', this._handleBackOut);

        //监听Android的实体物理键的返回
        if (Platform.OS === 'android') {
            BackHandler.addEventListener(
                'hardwareBackPress',
                this._handleBackAndroid
            );
        }

        // 初始化_sceneName
        this._sceneName = this.props.initialRoute;


        // 防止快速点击，重复进路由
        this.debounce = true;
    }

    componentDidMount() {
        (console as any).disableYellowBox = true;
    }

    componentWillUnmount() {
        msg.off('route:popToTop', noop);
        msg.off('route:goToNext', noop);
        msg.off('route:backToLast', noop);
        msg.off('route:backToTop', noop);
        msg.off('route:popToRoute', noop);
        msg.off('route:replaceRoute', noop);
        msg.off('route:replaceAtIndex', noop);
        msg.on('app:backOut', noop);
        if (Platform.OS === 'android') {
            msg.off('hardwareBackPress', noop);
        }
    }


    render() {
        const AppStackNavigator = createStackNavigator(Routes, {
            initialRouteName: this.props.initialRoute || 'Login',
            headerMode:'none',
            navigationOptions: {
                header: null,
                gesturesEnabled: true
            }
        });

        const AppContainer = createAppContainer(AppStackNavigator);

        return (
            <AppContainer
                ref={nav => nav && (this.navigation = nav)}
                onNavigationStateChange={
                    (prevState, currentState) => {
                        if (!currentState) {
                            return;
                        }
                        const currentScreen = this._getCurrentRouteName(currentState);
                        const prevScreen = this._getCurrentRouteName(prevState);
                        if (prevScreen !== currentScreen) {
                            this.Routes = currentState.routes;
                            this._sceneName = currentScreen;
                        }
                    }}

            />
        );
    }


    /**
     * 直接跳转到堆栈最顶层的路由，销毁其它所有页面。
     */
    _popToTop = () => {
        this.navigation.PopToTop();
    };


    /**
     * 跳转页面
     */
    _goToNext = routeName => {
        const { sceneName, ...props } = routeName;
        // 添加点击判断
        if (this.debounce) {
            this.debounce = false;
            this.navigation.navigate(sceneName, props);
            setTimeout(() => {
                this.debounce = true;
            }, 500);
        }
    };

    /**
     * 回上一个页面
     */
    _backToLast = () => {
        this.navigation.goBack();
    };

    /**
     * 回上第一个页面
     */
    _backToTop = () => {
        this.navigation.goBack(this.Routes[1].key);
    };

    /**
     * 回指定页面，根据路由位置
     */
    _popToRoute = index => {
        this.navigation.goBack(this.Routes[index].key);
    };

    /**
       * 替换页面，根据路由名称
       */
    _replaceRoute = routeName => {
        const { sceneName, ...props } = routeName;
        const navigateAction = NavigationActions.navigate({
            routeName: sceneName,
            params: props,
            action: NavigationActions.navigate({ routeName: sceneName })
        });

        this.navigation.dispatch(navigateAction);
    };

    /**
     * 替换页面，根据路由位置
     */
    _replaceAtIndex = index => {
        const routeName = this.Routes[index].routeName;
        const resetAction = this.navigation.reset({//Replace current state with a new state
            index: 0,
            actions: [NavigationActions.navigate({ routeName })]
        });
        this.navigation.dispatch(resetAction);
    };

    /**
     * 获取当前的路由名称
     */
    _getCurrentRouteName = navigationState => {
        if (!navigationState) {
            return null;
        }
        const route = navigationState.routes[navigationState.index];
        if (route.routes) {
            return this._getCurrentRouteName(route);
        }
        return route.routeName;
    };

    /**
     * 处理android的实体键的返回
     */
    _handleBackAndroid = () => {
        if (__DEV__) {
            console.log('current sceneName', this._sceneName);
        }

        // if popup is top remove it;
        if (this.props.isShowPopup) {
            msg.emit('pop-up-close', true);
            return false;
        }

        if (backOutPages.includes(this._sceneName)) {
            this._backToLast();

            // 退出时释放监听;
            if (Platform.OS === 'android') {
                BackHandler.removeEventListener(
                    'hardwareBackPress',
                    this._handleBackAndroid
                );
            }

            this._handleBackOut();
            return true;
        } else {
            this._backToLast();
            return true;
        }
    };

    /**
     * 弹出组件关闭
     */
    _handlePopUpClose = () => {
        this.setState({
            isPopUpVisible: false
        });
    };

    /**
     * 弹出组件
     */
    _handlePopUp = (popUpConfig: Object) => {
        this.setState({
            isPopUpVisible: true,
            popUpConfig: popUpConfig
        });
    };

    /**
     * 退出插件应用
     */
    _handleBackOut = () => {
        NativeModules.extra.close();
    };
}


