import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
import { WingBlank, WhiteSpace, Card } from 'antd-mobile'

const Header = Card.Header
const Body = Card.Body

class UserList extends React.Component{
  static propTypes = {
    userList:PropTypes.array.isRequired
  }
  render() {
    const {userList} = this.props
    return (
      <WingBlank style={{paddingBottom: 50, paddingTop: 50}}>
        <QueueAnim type='scale'>
        {
          userList.map(user=> (
            user.avatar ? 
            <div key={user._id}>
              <WhiteSpace />
              <Card onClick={()=> this.props.history.push(`/chat/${user._id}`)}>
                <Header
                  thumb={require(`../../assets/images/${user.avatar}.png`)}
                  extra={user.userName}
                / >
                <Body>
                  <div>职位：{user.post}</div>
                  {user.company ? <div>公司：{user.company}</div> : null}
                  {user.salary ? <div>月薪：{user.salary}</div> : null}
                  <div>描述：{user.info}</div>
                </Body>
              </Card>
            </div> : null
          ))
        }
        </QueueAnim>
      </WingBlank>
    )
  }
}

export default withRouter(UserList);