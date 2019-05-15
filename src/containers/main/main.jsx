/* 登录路由组件 */
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import CompanyInfo from '../company/company_info'
import PersonnelInfo from '../personnel/personnel_info'

class Main extends React.Component {
  render() {
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

export default Main;