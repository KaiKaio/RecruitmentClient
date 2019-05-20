import React from 'react'
import { Result, List, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'

const Item = List.Item
const Brief = Item.Brief

class User extends React.Component {
  render() {
    const { userName, type, avatar, company, post, salary, info} = this.props.user
    return (
      <div>
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
        <Button type='warning'>退出登录</Button>
      </div>
    )
  }
}

const mapStateToProps = (state)=> ({
  user: state.user
})

export default connect(mapStateToProps, null)(User)