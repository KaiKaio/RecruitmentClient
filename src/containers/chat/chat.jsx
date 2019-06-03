import React from 'react'
import { connect } from 'react-redux'
import { InputItem, NavBar, List, Grid, Icon } from 'antd-mobile'
import { sendMsg } from '../../redux/actionCreators'

const Item = List.Item

class Chat extends React.Component {
  state = {
    content: '',
    isShow: false // 是否显示表情列表
  }

  componentWillMount() {
    const emojis = ['😀','😅','😂','😘','😡']
    this.emojis = emojis.map(emoji=> ({text: emoji}))
  }

  componentDidMount() {
    window.scrollTo(0, document.body.scrollHeight)
  }

  componentDidUpdate() {
    window.scrollTo(0, document.body.scrollHeight)
  }

  toggleShow = ()=> {
    const isShow = !this.state.isShow
    this.setState({isShow})
    if(isShow) {
      setTimeout(()=> {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
  }

  handleSend = ()=> {
    const from = this.props.user._id
    const to = this.props.match.params.userid
    const content = this.state.content.trim()

    if(content) {
      this.props.sendMsg({from, to, content})
    }
    this.setState({
      content: '',
      isShow: false
    })
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
        <NavBar 
          icon={<Icon type='left'/>}
          className='sticky-header'
          onLeftClick={()=> this.props.history.goBack()}
        >
        {users[targetId].userName}
        </NavBar>
        <List style={{marginTop: 48, marginBottom: 48}}>
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
            onFocus={()=> this.setState({isShow: false})}
            extra={
              <span>
                <span 
                  onClick={this.toggleShow}
                  aria-label= 'emojis'
                  role="img"
                  style={{marginRight: 5}}>🙂</span>
                <span onClick={this.handleSend}>发送</span>
              </span>
            }
          />
          {this.state.isShow ? (
            <Grid
            data={this.emojis}
            columnNum={8}
            carouselMaxRow={4}
            isCarousel={true}
            onClick={(item)=> {
              this.setState({content: this.state.content + item.text})
            }}
          />) : null}
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