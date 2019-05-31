//  包含了n个action creator:  异步、同步action
import { 
  reqRegister,
  reqLogin,
  reqUpdateUser,
  reqUser,

  reqUserList
} from '../api'

import { 
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,

  RECEIVE_USER_LIST
 } from './actionTypes'

import io from 'socket.io-client'

function initIo() {
  if(!io.socket) {
    io.socket = io('ws://localhost:4000')
    io.socket.on('receiveMsg', function(chatMsg) {
      console.log('客户端 <= 服务器' , chatMsg)
    })
  }
}

const authSuccess = (user)=> ({
  type: AUTH_SUCCESS,
  data: user
})

const errorMsg = (msg)=> ({
  type: ERROR_MSG,
  data: msg
})

const receiveUser = (user)=> ({
  type: RECEIVE_USER,
  data: user
})

export const resetUser = (msg)=> ({
  type: RESET_USER,
  data: msg
})

export const receiveUserList = (userList)=> ({
  type: RECEIVE_USER_LIST,
  data: userList
})

// 注册异步 action
export const register = (user)=> {
  const {userName, password, confirm, type} = user
  // 前台表单检查，若不通过，返回一个 errorMsg 的同步action
  if(password !== confirm) {
    return errorMsg('两次密码输入需一致')
  } else if(!userName) {
    return errorMsg('请输入用户名')
  }
  // 表单数据合法，返回一个发 Ajax 请求的异步 action
  return async dispatch => {
    // 发送注册的异步请求, 要 response, 不要 promise 对象
    const response = await reqRegister({userName, password, type})
    const result = response.data
    if(result.code === 0) {
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}

// 登录异步 action
export const login = (user)=> {
  const {userName, password} = user
  // 前台表单检查，若不通过，返回一个 errorMsg 的同步action
  if(!userName) {
    return errorMsg('请输入用户名')
  }else if (!password) {
    return errorMsg('请输入密码')
  }
  return async dispatch => {
    const response = await reqLogin(user)
    const result = response.data
    if(result.code === 0) {
      dispatch(authSuccess(result.data))
    } else {
      dispatch(errorMsg(result.msg))
    }
  }
}

export const updateUser = (user)=> {
  return async dispatch=> {
    const response = await reqUpdateUser(user)
    const result = response.data
    if(result.code === 0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

// 获取用户异步 action
export const getUser = ()=> {
  return async dispatch=> {
    const response = await reqUser()
    const result = response.data
    if(result.code === 0) {
      dispatch(receiveUser(result.data))
    } else {
      dispatch(resetUser(result.msg))
    }
  }
}

export const getUserList = (type)=> {
  return async dispatch => {
    const response = await reqUserList(type)
    const result = response.data
    if(result.code === 0) {
      dispatch(receiveUserList(result.data))
    }
  }
}

export const sendMsg = ({from, to, content})=> {
  return dispatch=> {
    console.log('客户端 => 服务器', {from, to, content})
    initIo()
    io.socket.emit('sendMsg', {from, to, content})
  }
}