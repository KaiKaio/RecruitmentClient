/* 登录路由组件 */
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'

import CompanyInfo from '../company/company_info'
import PersonnelInfo from '../personnel/personnel_info'

import { getRedirectTo } from '../../utils'
import { getUser } from '../../redux/actionCreators'

class Main extends React.Component {
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
    return (
      <div>
        <Switch>
          <Route path='/companyinfo' component={CompanyInfo} />
          <Route path='/personnelinfo' component={PersonnelInfo} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = (state)=> ({
  user: state.user
})

export default connect(mapStateToProps, {getUser})(Main);