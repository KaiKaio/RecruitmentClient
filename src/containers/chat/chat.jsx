import React from 'react'
import { connect } from 'react-redux'
import { InputItem, NavBar, List } from 'antd-mobile'
import { sendMsg } from '../../redux/actionCreators'

const Item = List.Item

class Chat extends React.Component {
  state = {
    content: ''
  }

  handleSend = ()=> {
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const content = this.state.content.trim()

    if(content) {
      this.props.sendMsg({from, to, content})
    }
    this.setState({content: ''})
  }

  render(){
    return(
      <div id="chat-page">
        <NavBar></NavBar>

        <div className="am-tab-bar">
          <InputItem 
            placeholder="请输入"
            value={this.state.content}
            onChange={val=> this.setState({content: val})}
            extra={
              <span onClick={this.handleSend}>发送</span>
            }
          />
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state)=>({
  user: state.user
})

export default connect(mapStateToProps, {sendMsg})(Chat);