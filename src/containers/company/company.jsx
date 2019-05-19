import React from 'react'
import { connect } from 'react-redux'

class Company extends React.Component {
  render() {
    return (
      <div>Company</div>
    )
  }
}

const mapStateToProps = (state)=> ({
  
})

export default connect(mapStateToProps, null)(Company)