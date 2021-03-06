/* 登录路由组件 */
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { NavBar } from 'antd-mobile'

import CompanyInfo from '../company/company_info'
import PersonnelInfo from '../personnel/personnel_info'
import Company from '../company/company'
import Personnel from '../personnel/personnel'
import Message from '../message/message'
import User from '../user/user'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../chat/chat'


import { getRedirectTo } from '../../utils'
import { getUser } from '../../redux/actionCreators'

class Main extends React.Component {
  navList = [
    {
      path: '/company',
      compnent: Company,
      title: '求职列表',
      icon: 'caidan',
      text: '求职人'
    },
    {
      path: '/personnel',
      compnent: Personnel,
      title: '公司列表',
      icon: 'caidan',
      text: '公司'
    },
    {
      path: '/message',
      compnent: Message,
      title: '消息列表',
      icon: 'xiaoxi',
      text: '消息'
    },
    {
      path: '/user',
      compnent: User,
      title: '个人信息',
      icon: 'renwu',
      text: '个人'
    }
  ]

  componentDidMount() {
    const userid = Cookies.get('userid')
    const { _id } = this.props.user
    if(userid && !_id) {
      this.props.getUser()
    }
  }
  render() {
    const userid = Cookies.get('userid')
    if(!userid) {
      return <Redirect to='/login' />
    }
    const { user, unReadCount } = this.props
    if(!user._id) {
      return null
    } else {
      let path = this.props.location.pathname
      if(path==='/') {
        path = getRedirectTo(user.type, user.avatar)
        return <Redirect to={path} />
      }
    }

    const {navList} = this
    const path = this.props.location.pathname
    const currentNav = navList.find(nav=> nav.path === path)

    if(currentNav) {
      if(user.type === 'company') {
        navList[1].hide = true
      } else {
        navList[0].hide = true
      }
    }
    return (
      <div>
        {currentNav ? <NavBar className='sticky-header'>{currentNav.title}</NavBar> : null}
        <Switch>
          {
            navList.map(nav=> <Route key={nav.path} path={nav.path} component={nav.compnent} />)
          }
          <Route path='/companyinfo' component={CompanyInfo} />
          <Route path='/personnelinfo' component={PersonnelInfo} />
          <Route path='/chat/:userid' component={Chat} />
          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <NavFooter navList={navList} unReadCount={unReadCount} /> : null}
      </div>
    )
  }
}

const mapStateToProps = (state)=> ({
  user: state.user,
  unReadCount: state.chat.unReadCount
})

export default connect(mapStateToProps, {getUser})(Main);