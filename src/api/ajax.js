/*
* ajax请求函数模块
* */
import axios from 'axios';
//为了通过ajax()就可以直接得到response.data
//所以需要直接返回一个Promise对象.
// 传入resolve函数(请求成功时回调此函数),resolve(response.data)返回response.data
// reject函数(请求失败时回调),reject(error)返回错误信息
export default function ajax(url, data = {}, type = 'GET') {
  return new Promise(function(resolve, reject) {
    let result;
    if (type === 'GET') {
      let dataStr = '';
      Object.keys(data).forEach(key => {
        dataStr += key + '=' + data[key] + '&';
      });
      if (dataStr !== '') {
        dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
      }
      result = axios.get(url);
    } else {
      result = axios.post(url, data);
    }

    result.then(response => {
      resolve(response.data);
    }).catch(error => {
      reject(error);
    });
  });
}
