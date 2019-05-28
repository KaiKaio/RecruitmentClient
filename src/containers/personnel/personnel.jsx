import React from 'react'
import { connect } from 'react-redux'
import { getUserList } from '../../redux/actionCreators'

import UserList from '../../components/user-list/user-list'

class Personnel extends React.Component {
  componentDidMount() {
    this.props.getUserList('company')
  }

  render() {
    return (
      <UserList userList={this.props.userList}/>
    )
  }
}

const mapStateToProps = (state)=> ({
  userList: state.userList
})

export default connect(mapStateToProps, {getUserList})(Personnel)