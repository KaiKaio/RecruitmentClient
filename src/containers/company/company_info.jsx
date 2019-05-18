import React from 'react'
import { 
  NavBar,
  InputItem,
  TextareaItem,
  Button
} from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { updateUser } from '../../redux/actionCreators'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'

class CompanyInfo extends React.Component {
  state = {
    avatar: '',
    post: '',
    info: '',
    company: '',
    salary: '',
  }

  setAvatar = (avatar)=> {
    this.setState({
      avatar: avatar
    })
  }

  handleChange = (name, value)=> {
    this.setState({ // 没有 name 这个 state，所以使用[]来使它成为一个变量
      [name]: value
    })
  }

  save = ()=> {
    this.props.updateUser(this.state)
  }

  render() {
    const { avatar, type } = this.props.user
    if(avatar) {
      const path = type === 'personnel' ?  'personnel' : 'company'
      return < Redirect to={path} />
    }
    return (
      <div>
        <NavBar>公司信息完善</NavBar>
        <AvatarSelector setAvatar={this.setAvatar} />
        <InputItem placeholder='请输入招聘职位' onChange={val=> {this.handleChange('post', val)}}>招聘职位：</InputItem>
        <InputItem placeholder='请输入公司名称' onChange={val=> {this.handleChange('company', val)}}>公司名称：</InputItem>
        <InputItem placeholder='请输入职位薪资' onChange={val=> {this.handleChange('salary', val)}}>薪资：</InputItem>
        <TextareaItem
          title="职位要求："
          rows={3}
          onChange={val=> {this.handleChange('info', val)}}
           />
        <Button type='primary' onClick={this.save}>保存</Button>
      </div>
    )
  }
}

const mapStateToProps = (state)=> ({
  user: state.user
})

export default connect(mapStateToProps, {updateUser})(CompanyInfo);