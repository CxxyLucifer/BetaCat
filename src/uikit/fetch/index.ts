import Toast from '../toast';
import { Platform } from 'react-native';
import objectAssign from 'object-assign';

import { RequestParam } from './index.d';

/**
 * fetch请求工具类
 *
 * @author liuhui
 * @param {*} url
 * @param {*} param
 */
const Fetch = (url: string, param?: RequestParam) => {
  if (param && param.body && typeof param.body == 'object') {
    param.body = JSON.stringify(param.body);
  }

  //判断是不是上传图片
  const contentType = param && param.isUpload ? 'multipart/form-data' : 'application/json; charset=utf-8';

  let req = {
    method: 'GET',
    credentials: 'include',
    mode: 'cors',
    headers: {
      Platform: Platform.OS,
      Authorization: '',
      Accept: 'application/json; charset=utf-8',
      'Content-Type': contentType,
    },
  };

  const promise = new Promise((resolve, reject) => {
    let success: boolean;
    const merge = objectAssign(req, param);
    const timeout = merge.timeout || 10,
      timeoutId = setTimeout(() => {
        Toast.fail('网络超时,请联系管理员');
        resolve({ res: {}, err: new Error('timeout') });
      }, timeout * 1000);

    fetch(url, merge)
      .then(response => {
        clearTimeout(timeoutId);
        if (response.ok) {
          success = true;
        } else {
          success = false;
        }
        return response.json();
      })
      .then(json => {
        if (__DEV__) {
          console.log('\n', '---------- fetch url:', url);
          param && console.log('----------- fetch param:', JSON.stringify(param));
          console.log('----------- fetch success:', success);
          console.log('----------- fetch result:', json);
        }
        if (success) {
          resolve(json);
        } else {
          solveMessge(json);
          reject(json);
        }
      })
      .catch(error => {
        clearTimeout(timeoutId);
        Toast.fail('请求失败，请稍后重试');
        reject(error);
      });
  });
  return promise;
};

/**
 * 处理异常信息
 * @param data
 */
const solveMessge = (data: any) => {
  let { status } = data;
  switch (status) {
    case 400: //1、服务端实体验证报的message信息
      for (let { defaultMessage } of data.errors) {
        Toast.info(defaultMessage);
        break;
      }
      break;
    case 500: //1、throw new CommonException("参数异常")抛的异常 2、其他异常
      if (data.message) {
        Toast.info(data.message);
      }
      break;
    default:
      if (data.message) {
        Toast.info(data.message);
      }
      break;
  }
};

export default Fetch;
