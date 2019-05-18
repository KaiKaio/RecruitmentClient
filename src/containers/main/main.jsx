/* 登录路由组件 */
import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import CompanyInfo from '../company/company_info'
import PersonnelInfo from '../personnel/personnel_info'

class Main extends React.Component {
  render() {
    const { user } = this.props
    if(!user._id) {
      return <Redirect to='/login' />
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

export default connect(mapStateToProps, null)(Main);