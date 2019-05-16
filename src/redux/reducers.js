//  包含n个 Reducer 函数：根据旧的 State 和制定的 Action 返回一个新的State
import { combineReducers } from 'redux'
import { 
  AUTH_SUCCESS,
  ERROR_MSG
 } from './actionTypes'
import { getRedirectTo } from '../utils'

const defaultUser = {
  userName: '',
  type: '',
  msg: '',
  redirectTo: ''
}

// 产生 user 状态 reducer
function user(state=defaultUser, action) {
  switch(action.type) {
    case AUTH_SUCCESS:
      const { type, avatar } = action.data
      return {...action.data, redirectTo: getRedirectTo(type, avatar)}
    case ERROR_MSG:
      return {...state, msg: action.data}
    default:
      return state
  }
}


export default combineReducers({
  user
})