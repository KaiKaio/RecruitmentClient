import React from 'react'
import { connect } from 'react-redux'
import { List, Badge } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief

function getLastMsgs(chatMsgs) {
  const lastMsgObjs = {}
  chatMsgs.forEach(msg=> {
    const chatId = msg.chat_id
    const lastMsg = lastMsgObjs[chatId]
    if(!lastMsg) {
      lastMsgObjs[chatId] = msg
    } else {
      if(msg.create_time > lastMsg.create_time) {
        lastMsgObjs[chatId] = msg
      }
    }
  })
  const lastMsgs = Object.values(lastMsgObjs)
  lastMsgs.sort(function(m1, m2) {
    return m2.create_time - m1.create_time
  })
  return lastMsgs
}

class Message extends React.Component {
  render() {
    const { user } = this.props
    const { users, chatMsgs } = this.props.chat
    const lastMsgs = getLastMsgs(chatMsgs)
    console.log(lastMsgs)
    return (
      <List style={{marginTop: 50, marginBottom: 50}}>
        {
          lastMsgs.map(msg=> {
            const targetUserId = msg.to === user.id ? msg.from : msg.to
            const targetUser = msg.to === user.id ? users[targetUserId ] : users[targetUserId]
            return (
              <Item
                key={msg._id}
                extra={<Badge text={0} />}
                thumb={targetUser.avatar ? require(`../../assets/images/${targetUser.avatar}.png`) : null}
                arrow='horizontal'
                onClick={()=> this.props.history.push(`/chat/${targetUserId}`)}
              >
                {msg.content}
                <Brief>{targetUser.userName}</Brief>
              </Item>
            )
          })
        }
      </List>
    )
  }
}

const mapStateToProps = (state)=> ({
  user: state.user,
  chat: state.chat
})

export default connect(mapStateToProps, null)(Message)