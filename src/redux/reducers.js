//  包含n个 Reducer 函数：根据旧的 State 和制定的 Action 返回一个新的State

import { combineReducers } from 'redux'

function xxx(state=0, action) {
  return state
}

function yyy(state=1, action) {
  return state
}

export default combineReducers({
  xxx,
  yyy
})

// 向外暴露的状态结构： { xxx: 0, yyy: 1 }