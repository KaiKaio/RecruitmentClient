//  包含n个 Reducer 函数：根据旧的 State 和制定的 Action 返回一个新的State
import { combineReducers } from 'redux'
import { 
  AUTH_SUCCESS,
  ERROR_MSG,
  RECEIVE_USER,
  RESET_USER,
  RECEIVE_USER_LIST,
  RECEIVE_MSG_LIST,
  RECEIVE_MSG
 } from './actionTypes'

import { getRedirectTo } from '../utils'

const defaultUser = {
  userName: '',
  type: '',
  msg: '',
  redirectTo: ''
}

const defaultUserList = []

const defaultChat = {
  users: {},
  chatMsgs: [],
  unReadCount: 0
}

// 产生 user 状态 reducer
function user(state=defaultUser, action) {
  switch(action.type) {
    case AUTH_SUCCESS:
      const { type, avatar } = action.data
      return {...action.data, redirectTo: getRedirectTo(type, avatar)}
    case ERROR_MSG:
      return {...state, msg: action.data}
    case RECEIVE_USER:
      return action.data
    case RESET_USER:
      return {...defaultUser, msg: action.data}
    default:
      return state
  }
}

function userList(state=defaultUserList, action) {
  switch(action.type) {
    case RECEIVE_USER_LIST:
      return action.data
    default:
      return state
  } 
}

function chat(state=defaultChat, action) {
  switch(action.type) {
    case RECEIVE_MSG_LIST: 
      const { users, chatMsgs } = action.data
      return {
        users,
        chatMsgs,
        unReadCount: 0
      }
    case RECEIVE_MSG:
      return 
    default:
      return state
  }
}

export default combineReducers({
  user,
  userList,
  chat
})