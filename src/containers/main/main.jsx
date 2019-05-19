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

import { getRedirectTo } from '../../utils'
import { getUser } from '../../redux/actionCreators'

class Main extends React.Component {
  navList = [
    {
      path: '/company',
      compnent: Company,
      title: '求职列表',
      icon: 'qiuzhiren',
      text: '求职人'
    },
    {
      path: '/personnel',
      compnent: Personnel,
      title: '公司列表',
      icon: 'gongsi',
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
      icon: 'geren',
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
    const { user } = this.props
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
    return (
      <div>
        {currentNav ? <NavBar>{currentNav.title}</NavBar> : null}
        <Switch>
          {
            navList.map(nav=> <Route path={nav.path} component={nav.compnent} />)
          }
          <Route path='/companyinfo' component={CompanyInfo} />
          <Route path='/personnelinfo' component={PersonnelInfo} />
          <Route component={NotFound}/>
        </Switch>
        {currentNav ? <div>底部导航</div> : null}
      </div>
    )
  }
}

const mapStateToProps = (state)=> ({
  user: state.user
})

export default connect(mapStateToProps, {getUser})(Main);