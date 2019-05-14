/* 注册路由组件 */
import React from 'react'
import { 
  NavBar,
  WingBlank,
  InputItem,
  WhiteSpace,
  Button
} from 'antd-mobile'
import Logo from '../../components/logo/logo'

class Login extends React.Component {
  state = {
    userName: '',
    password: '',
  }

  login = ()=> {
    console.log(this.state)
  }

  toRegister = ()=> {
    this.props.history.replace('./register')
  }

  // 处理用户输入数据的改变: 更新对应表单的状态
  handleChange = (formAttributes, value)=> {
    // 更新状态
    this.setState({
      [formAttributes]: value  // [变量名]
    })
  }

  render() {
    return (
      <div>
        <NavBar>招聘标题</NavBar>
        <Logo />
        <WingBlank>
          <InputItem placeholder="请输入用户名" onChange={ val=> {this.handleChange('userName', val)} }>用户名：</InputItem>
          <WhiteSpace />
          <InputItem type="password" placeholder="请输入密码" onChange={ val=> {this.handleChange('password', val)} }>密&nbsp;&nbsp;&nbsp;码：</InputItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.login}>
            注册
          </Button>
          <Button onClick={this.toRegister}>
            还未有账户，注册
          </Button>
        </WingBlank>
      </div>
    )
  }
}

export default Login;