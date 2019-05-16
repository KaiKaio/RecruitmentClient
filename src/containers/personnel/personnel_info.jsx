import React from 'react'
import { 
  NavBar,
  InputItem,
  TextareaItem,
  Button
} from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'

class PersonnelInfo extends React.Component {
  state = {
    avatar: '',
    post: '',
    info: ''
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
    console.log(this.state)
  }

  render() {
    return (
      <div>
        <NavBar>个人信息完善</NavBar>
        <AvatarSelector setAvatar={this.setAvatar}/>
        <InputItem placeholder='请输入求职职位'  onChange={val=> {this.handleChange('post', val)}}>求职岗位：</InputItem>
        <TextareaItem
          title="个人介绍："
          rows={3}
          onChange={val=> {this.handleChange('info', val)}}
           />
        <Button type='primary' onClick={this.save}>保存</Button>
      </div>
    )
  }
}

export default PersonnelInfo;