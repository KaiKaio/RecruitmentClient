/* 注册路由组件 */
import React from 'react'
import { 
  NavBar,
  WingBlank,
  List,
  InputItem,
  WhiteSpace,
  Radio,
  Button
} from 'antd-mobile'
import Logo from '../../components/logo/logo'
import { connect } from 'react-redux'
import { register } from '../../redux/actionCreators'
import { Redirect } from 'react-router-dom'

const ListItem = List.Item

class Register extends React.Component {
  state = {
    userName: '',
    password: '',
    confirm: '',
    type: ''
  }

  register = ()=> {
    this.props.register(this.state)
  }

  toLogin = ()=> {
    this.props.history.replace('./login')
  }

  // 处理用户输入数据的改变: 更新对应表单的状态
  handleChange = (formAttributes, value)=> {
    // 更新状态
    this.setState({
      [formAttributes]: value  // [变量名]
    })
  }

  render() {
    const { type } = this.state
    const { msg, redirectTo } = this.props.user
    if(redirectTo) {
      return <Redirect to={redirectTo}/>
    }
    return (
      <div>
        <NavBar>招聘标题</NavBar>
        <Logo />
        <WingBlank>
          { msg? <div className='error-msg'>{msg}</div> : null }
          <InputItem placeholder="请输入用户名" onChange={ val=> {this.handleChange('userName', val)} }>用户名：</InputItem>
          <WhiteSpace />
          <InputItem type="password" placeholder="请输入密码" onChange={ val=> {this.handleChange('password', val)} }>密&nbsp;&nbsp;&nbsp;码：</InputItem>
          <WhiteSpace />
          <InputItem type="password" placeholder="请输确认密码" onChange={ val=> {this.handleChange('confirm', val)} }>确认密码：</InputItem>
          <WhiteSpace />
          <ListItem>
            <span>用户类型</span>
            &nbsp;&nbsp;&nbsp;
            <Radio checked={type === 'personnel'} onChange={()=> this.handleChange('type', 'personnel')}>招聘人</Radio>
            &nbsp;&nbsp;&nbsp;
            <Radio checked={type === 'company'} onChange={()=> this.handleChange('type', 'company')}>公司</Radio>
          </ListItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>
            注册
          </Button>
          <Button onClick={this.toLogin}>
            已有账户
          </Button>
        </WingBlank>
      </div>
    )
  }
}

const mapStateToProps = (state)=> ({
  user: state.user
})

export default connect(mapStateToProps, {register})(Register);