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
    const { user } = this.props
    const { users, chatMsgs } = this.props.chat

    const meId = user._id
    if(!users[meId]) {
      return null
    }
    const targetId = this.props.match.params.userid
    const chatId = [meId, targetId].sort().join('_')

    const msgs = chatMsgs.filter(msg=> msg.chat_id === chatId)

    const targetAvatar = users[targetId].avatar
    const targetIcon = targetAvatar ? require(`../../assets/images/${targetAvatar}.png`) : null
    return(
      <div id="chat-page">
        <NavBar></NavBar>
        <List>
          {
            msgs.map(msg=> {
              if(targetId === msg.from) {
                return (
                  <Item
                    key={msg._id}
                    thumb={targetIcon}
                  >
                    {msg.content}
                  </Item>
                )
              } else {
                return (
                  <Item
                    key={msg._id}
                    className='chat-me'
                    extra='我'
                  >
                    {msg.content}
                  </Item>
                )
              }
            })
          }
        </List>
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
  user: state.user,
  chat: state.chat
})

export default connect(mapStateToProps, {sendMsg})(Chat);