import React from 'react';
import { observer, inject } from "mobx-react"
import {DisplayTweets} from './'

// import {findUserImage} from '../mobx/user/operations'
import {storage} from '../firebase/index'
const storageRef = storage.ref()

@inject('UserStore', 'TweetStore')
@observer
class Profile extends React.Component{

    toTimeLine = () => {
        this.props.history.push('/')
    }

    displayUserImage = () => {
        return storageRef.child(`userImage/defaultUserImage.png`).getDownloadURL()
            .then((url) => { 
                console.log(url)
                return url
                }
            ) 
    }

    render(){
        const user = this.props.UserStore
        return(
            <div>
                <button onClick={this.toTimeLine}>TimeLine</button>
                <h2>Profile</h2>
                <p>ユーザ名：{user.userName}</p>
                <p>ユーザID：{user.uid}</p>
                <p>ユーザイメージ：</p>
                {/* <img src = {this.displayUserImage()} alt="alt" /> */}
                <img src="https://firebasestorage.googleapis.com/v0/b/twitter-app-5c365.appspot.com/o/userImage%2FdefaultUserImage.png?alt=media&token=cc316835-a58d-4c84-827e-64c921cf0e0c"  alt="" />
                <DisplayTweets userId={this.props.UserStore.uid} />
            </div>
        )
    }
    
}
export default Profile;