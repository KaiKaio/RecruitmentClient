import React from 'react'
import { connect } from 'react-redux'
import { InputItem } from 'antd-mobile'

class Chat extends React.Component {
  render(){
    return(
      <div>Chat</div>
    )
  }
}

const mapStateToProps = ()=>({

})

export default connect(mapStateToProps, null)(Chat);