import React from 'react'
import { connect } from 'react-redux'

class User extends React.Component {
  render() {
    return (
      <div>User</div>
    )
  }
}

const mapStateToProps = (state)=> ({
  
})

export default connect(mapStateToProps, null)(User)