import { Fetch, Config } from 'UIKit';

const queryContactList = () => {
    return Fetch(Config.HOST + '/queryAddressBook', {method: 'post'});
}

export {
  queryContactList
}