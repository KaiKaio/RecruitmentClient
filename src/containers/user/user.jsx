import React from 'react'
import { Result, List, Button, Modal } from 'antd-mobile'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { resetUser } from '../../redux/actionCreators'

const Item = List.Item
const Brief = Item.Brief

class User extends React.Component {
  logout = ()=>{
    Modal.alert('退出', '确认退出登录吗？',[
      {
        text: '取消',
        onPress: ()=> {
          console.log('取消退出')
        }
      },
      {
        text: '确定',
        onPress: ()=> {
          Cookies.remove('userid')
          this.props.resetUser()
      }
      }
    ])
  }

  render() {
    const { userName, avatar, company, post, salary, info} = this.props.user
    return (
      <div style={{paddingTop: 50}}>
        <Result 
          img={<img src={require(`../../assets/images/${avatar}.png`)} style={{width: 50}} alt={avatar}/>}
          title={userName}
          message={company}
        />
        <List renderHeader={()=>'相关信息'}>
          <Item multipleLine>
            <Brief>职位：{post}</Brief>
            <Brief>简介：{info}</Brief>
            {salary ? <Brief>薪资：{salary}</Brief> : null}
          </Item>
        </List>
        <Button style={{marginTop: 10}} type='warning' onClick={this.logout}>退出登录</Button>
      </div>
    )
  }
}

const mapStateToProps = (state)=> ({
  user: state.user
})

export default connect(mapStateToProps, {resetUser})(User)