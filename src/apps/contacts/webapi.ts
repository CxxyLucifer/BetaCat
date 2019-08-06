import { Fetch, Config } from 'UIKit';

/**
 * 查询通讯录列表
 */
const queryContactList = () => {
    return Fetch(Config.HOST + '/queryAddressBook', {method: 'post'});
}

export {
  queryContactList
}