//  Redux 核心管理对象模块
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from './reducers'

// Reducer DevToll 
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// 向外暴露 store 对象
export default createStore(reducers, composeEnhancers(
  applyMiddleware(thunk)
))