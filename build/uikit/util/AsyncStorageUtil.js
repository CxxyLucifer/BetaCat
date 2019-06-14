import { AsyncStorage } from 'react-native';
/**
 * 异步保存
 */
const setItem = (key, value) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.setItem(key, value, (error) => {
            if (error) {
                reject(`设置${key}失败${error}`);
            }
            else {
                resolve(true);
            }
        });
    });
};
/**
 * 异步获取
 */
const getItem = (key) => {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem(key, (error, result) => {
            if (error) {
                reject(`读取${key}失败${error}`);
            }
            else {
                resolve(result);
            }
        });
    });
};
export default {
    setItem,
    getItem
};
