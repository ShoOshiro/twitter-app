import React from 'react';
import { observer, inject } from "mobx-react"
import { PrimaryButton } from '../common/ui-kit';
import {PostTweet, DisplayTweets} from './'
import {signOut} from '../mobx/user/operations'

@inject('UserStore', 'TweetStore')
@observer
class TimeLine extends React.Component{

    constructor(props){
        super(props);
    }

    // NOTE: Test code to check if sign out is successful.
    signOut = () => {
        signOut(this.props.history)
    }
    toProfile = () => {
        this.props.history.push('/profile')
    }

    render(){
        
        return(
            <div>
                <button onClick={this.toProfile}>profile画面</button>
                <h2>TimeLine</h2>
                <PostTweet/>
                <DisplayTweets/>
            </div>
        )
    }
    
}
export default TimeLine;