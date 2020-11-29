import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Icon from '@material-ui/core/Icon';

const MenuButton = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (clickedIndex) => {
    setAnchorEl(null);
    if(isNaN(clickedIndex)){
      return
    }
    props.handleClickMenu(clickedIndex, props.tweetId)
  };

  const menuItems = () => {
    const {items} = props;
    return (
      items.map((item, i) => {
        return(
          <MenuItem key={i} onClick={handleClose.bind(this, i)}>{item}</MenuItem>
        )
      })
    )
  }

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <Icon>{props.iconName}</Icon>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems()}
      </Menu>
    </div>
  );
}
export default MenuButton;