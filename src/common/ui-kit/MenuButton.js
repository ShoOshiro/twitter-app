import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';
import {deleteTweet} from '../../mobx/tweet/operations';

class MenuButton extends React.Component {

  constructor(props){
    super(props)
    this.state={anchorEl: ''}
  }

  handleClickMenu = (item) => {
    if(item === 'Delete'){
      deleteTweet(this.props.tweetId);
    }
}

  handleClick = (event) => {
    this.setState({anchorEl: event.currentTarget})
  };

  handleClose = (item) => {
    this.setState({anchorEl: ''})
    this.handleClickMenu(item)
  };

  renderMenuItems = () => {
    const items = ["Delete"]
    return (
      items.map((item, i) => {
        return(
          <MenuItem key={i} onClick={this.handleClose.bind(this, item)}>{item}</MenuItem>
        )
      })
    )
  }
  render(){
    return (
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
          <Icon>{"format_list_bulleted"}</Icon>
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {this.renderMenuItems()}
        </Menu>
      </div>
    );
  }
}

export default MenuButton;