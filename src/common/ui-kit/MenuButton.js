import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';

class MenuButton extends React.Component {

  constructor(props){
    super(props)
    this.state={anchorEl: ''}
  }

  handleClick = (event) => {
    this.setState({anchorEl: event.currentTarget})
  };

  handleClose = (clickedIndex) => {
    this.setState({anchorEl: ''})
    if(isNaN(clickedIndex)){
      return
    }
    this.props.handleClickMenu(clickedIndex, this.props.tweetId)
  };

  renderMenuItems = () => {
    const {items} = this.props;
    return (
      items.map((item, i) => {
        return(
          <MenuItem key={i} onClick={this.handleClose.bind(this, i)}>{item}</MenuItem>
        )
      })
    )
  }
  render(){
    return (
      <div>
        <Button aria-controls="simple-menu" aria-haspopup="true" onClick={this.handleClick}>
          <Icon>{this.props.iconName}</Icon>
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