import React from 'react';
import { observer, inject } from "mobx-react"
import {fetchTweets} from '../mobx/tweet/operations'
import {PostTweet, DisplayTweets} from './'
import {signOut} from '../mobx/user/operations'

@inject('UserStore', 'TweetStore')
@observer
class TimeLine extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        fetchTweets()
    }

    // NOTE: Test code to check if sign out is successful.
    signOut = () => {
        signOut(this.props.history)
    }
    toProfile = () => {
        this.props.history.push('/profile')
    }

    render(){
        const tweets = this.props.TweetStore.tweets        
        return(
            <div className="container">
                <PostTweet/>
                <DisplayTweets tweets={tweets}/>
            </div>
        )
    }
    
}
export default TimeLine;