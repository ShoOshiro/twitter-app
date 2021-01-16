import React from 'react';
import { observer, inject } from "mobx-react"
import {fetchTweets} from '../mobx/tweet/operations'
import {PostTweet, DisplayTweets} from './'


@inject('UserStore', 'TweetStore')
@observer
class TimeLine extends React.Component{

    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        fetchTweets()
    }

    render(){
        const tweets = this.props.TweetStore.tweets
        const replyList = this.props.TweetStore.replyList
        const userData = this.props.UserStore

        return(
            <div className='container'>
                <PostTweet userData={userData}/>
                <DisplayTweets tweets={tweets} replyList={replyList} userData={userData}/>
            </div>
        )
    }
    
}
export default TimeLine;