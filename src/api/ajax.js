// 能发送 Ajax 请求的函数模块，函数的返回值是 Promise 对象
import axios from 'axios'

function ajax(url, data={}, method='GET') {
  if(method === 'GET') {
    let paramStr = ''
    Object.keys(data).forEach(key=> {
      paramStr += key + '=' + data[key] + '&'
    })
    if(paramStr) {
      paramStr = paramStr.substring(0, paramStr.length-1)
    }
    return axios.get(url + '?' + paramStr)
  } else {
    return axios.post(url, data)
  }
}

export default ajax;