import React from 'react'
import { 
  List,
  Grid
} from 'antd-mobile'
import PropTypes from 'prop-types'

class AvatarSelector extends React.Component {
  static propTypes = {
    setAvatar: PropTypes.func.isRequired
  }

  state = {
    icon: null
  }

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

  handleClick = ({text, icon})=> {
    this.setState({icon})
    this.props.setAvatar(text)
  }

  render() {
    const {icon} = this.state
    const listHeader = icon ? (<div>已选择头像：<img src={icon} alt=""/></div>) : '请选择头像'
    return (
      <List renderHeader={()=> listHeader}>
        <Grid
          data={this.avatarList}
          columnNum='4'
          onClick={this.handleClick}
        ></Grid>
      </List>
    )
  }
}

export default AvatarSelector;