import React from 'react'
import { connect } from 'react-redux'

class Message extends React.Component {
  render() {
    return (
      <div>Message</div>
    )
  }
}

const mapStateToProps = (state)=> ({
  
})

export default connect(mapStateToProps, null)(Message)