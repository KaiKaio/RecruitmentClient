import React from 'react'
import { 
  List,
  Grid
} from 'antd-mobile'

class AvatarSelector extends React.Component {
  constructor(props) {
    super(props)
    this.avatarList = []
    for(let i = 0; i < 4; i++) {
      this.avatarList.push({
        text: `头像${i+1}`,
        icon: require(`./images/icon-test_${i+1}.png`)
      })
    }
  }
  render() {
    const listHeader = '请选择头像'
    return (
      <List renderHeader={()=> listHeader}>
        <Grid
          data={this.avatarList}
          columnNum='4'
        ></Grid>
      </List>
    )
  }
}

export default AvatarSelector;