import React from 'react'
import Avatar from '@material-ui/core/Avatar';

const UserImage = (props) => {

    return(
        <div>
            <Avatar src={props.path} style={props.style} alt="ユーザー画像"/>
        </div>
    )
}

export default UserImage
