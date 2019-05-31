// 入口JS文件
import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import store from './redux/store'
import Register from './containers/register/register'
import Login from './containers/login/login'
import Main from './containers/main/main'

import './assets/css/index.less'

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/register" exact component={Register} />
        <Route path="/login" component={Login} />
        <Route component={Main} /> {/* 默认组件 */}
      </Switch>
    </Router>
  </Provider>
),document.getElementById('root'))