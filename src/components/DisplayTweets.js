import React from 'react';
import { observer, inject } from "mobx-react";
import { withRouter } from 'react-router';
import {deleteTweet} from '../mobx/tweet/operations';
import {PostReply} from './';
import {TweetCard} from '../common/component-area';

@inject('TweetStore')
@observer
class DisplayTweets extends React.Component {
    constructor(props){
        super(props)
        this.state = {shouldDisplayReply: false, selectedReplyedTweet: {}}
    }

    // TODO: handling clicked menu should move to common directory.
    handleClickMenu = (clickedIndex, tweetId) => {
        switch(clickedIndex){
            case 0:
                deleteTweet(tweetId)
                break;
            default:
                break;
        }
    }

    onClose = () => {
        this.setState({shouldDisplayReply: false})
    }

    renderReplys = (replyId) => {
        const replyList = this.props.replyList
        const filterdReply = replyList.find((replyTweet) => replyTweet.id === replyId)
        if(filterdReply){
            return <TweetCard key={filterdReply.id} tweet={filterdReply}/>
        }
    }

    render(){
        const tweets = this.props.tweets;
        const userData = this.props.userData;
        return(
            <div>
                {tweets ?
                    tweets.map((tweet) => {
                        return(
                            <div>
                                <TweetCard key={tweet.id} tweet={tweet}/>
                                {tweet.replyIds.map((replyId) => {
                                    return this.renderReplys(replyId)
                                })}
                            </div>
                        )
                    }) : null
                }
                {this.state.shouldDisplayReply && 
                    <PostReply
                        shouldDisplayReply={this.state.shouldDisplayReply}
                        selectedReplyedTweet={this.state.selectedReplyedTweet}
                        onClose={this.onClose}
                        userData={userData}
                    />
                }
            </div>
        );
    }
}

export default withRouter(DisplayTweets)