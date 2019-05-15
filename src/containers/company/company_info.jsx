import React from 'react'
import { 
  NavBar,
  InputItem,
  TextareaItem,
  Button
} from 'antd-mobile'
import AvatarSelector from '../../components/avatar-selector/avatar-selector'

class CompanyInfo extends React.Component {
  render() {
    return (
      <div>
        <NavBar>公司信息完善</NavBar>
        <AvatarSelector />
        <InputItem placeholder='请输入招聘职位'>招聘职位：</InputItem>
        <InputItem placeholder='请输入公司名称'>公司名称：</InputItem>
        <InputItem placeholder='请输入职位薪资'>薪资：</InputItem>
        <TextareaItem
          title="职位要求："
          rows={3}
           />
        <Button type='primary'>保存</Button>
      </div>
    )
  }
}

export default CompanyInfo;