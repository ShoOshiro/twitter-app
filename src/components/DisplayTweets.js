import React from 'react'
import { observer, inject } from "mobx-react"
import {fetchTweets} from '../mobx/tweet/operations'
import { exportDefaultSpecifier } from '@babel/types';

@inject('TweetStore','UserStore')
@observer
class DisplayTweets extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount = () => {
        fetchTweets()
    }

    tweetFilteredByUserId = (userId, tweet) => {
        if(!userId){
            return(
                <div>
                    <p>tweet id: {tweet.uid}</p>
                    <p>tweet content: {tweet.content}</p>
                </div>
            );
        }else if(userId === tweet.uid){
            return(
                <div>
                    <p>tweet id: {tweet.uid}</p>
                    <p>tweet content: {tweet.content}</p>
                </div>
            );            
        }
    }

    render(){
        const tweets = this.props.TweetStore.tweets
        return(
            <div>
                <h4>display tweet list</h4>
                {tweets ?
                    tweets.map((tweet) => {
                        return(
                            <div>
                                {this.tweetFilteredByUserId(this.props.userId, tweet)}
                            </div>
                        )
                    }) : 
                    <></>
                }
            </div>
        );
    }
}

export default DisplayTweets