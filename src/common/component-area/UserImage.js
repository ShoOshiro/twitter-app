import React from 'react'

const UserImage = (props) => {

    return(
        <div>
            <img src={props.path} id="user-image" alt="ユーザー画像" />
        </div>
    )
}

export default UserImage
