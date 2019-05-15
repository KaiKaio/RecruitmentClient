import React from 'react'
import { 
  NavBar,
  InputItem,
  TextareaItem,
  Button
} from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'

class PersonnelInfo extends React.Component {
  render() {
    return (
      <div>
        <NavBar>个人信息完善</NavBar>
        <AvatarSelector />
        <InputItem placeholder='请输入求职职位'>求职岗位：</InputItem>
        <TextareaItem
          title="个人介绍："
          rows={3}
           />
        <Button type='primary'>保存</Button>
      </div>
    )
  }
}

export default PersonnelInfo;