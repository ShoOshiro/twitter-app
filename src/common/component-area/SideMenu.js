import React from 'react';
import { withRouter } from 'react-router';
import {TIMELINE_PATH, PROFILE_PATH} from '../utils'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import FolderIcon from '@material-ui/icons/Folder';

const SideMenu = (props) => {

    const menuNameList = ["Timeline", "Profile"];
    const menuPath = {"Timeline": TIMELINE_PATH, "Profile": PROFILE_PATH};

    const handleClick = (menuName) => {
        props.history.push(menuPath[menuName]);
    }

    return(
        <div>
            <List>
                {menuNameList.map((menuName, i) => {
                    return(
                    <ListItem key={i} button onClick={handleClick.bind(this, menuName)}>
                        <ListItemIcon>
                            <FolderIcon />
                        </ListItemIcon>
                        <ListItemText
                            primary={menuName}
                        />
                    </ListItem>
                    )
                })}
            </List>
        </div>
    )
}


export default withRouter(SideMenu);