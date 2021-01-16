import React from 'react'
import { observer, inject } from "mobx-react"
import {fetchSelectedTweetWithReplys} from '../mobx/tweet/operations'
import {PostReply} from './';
import {TweetCard} from '../common/component-area'

@inject('TweetStore', 'UserStore')
@observer
class TweetDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {shouldDisplayReply: false, selectedReplyedTweet: {}}
    }

    componentDidMount = () => {
        fetchSelectedTweetWithReplys(this.props.match.params.tweetId)
    }

    onClose = () => {
        this.setState({shouldDisplayReply: false})
    }

    renderReplys = (replyId) => {
        const replyList = this.props.TweetStore.replyList;
        const filterdReply = replyList.find((replyTweet) => replyTweet.id === replyId)
        if(filterdReply){
            return <TweetCard key={filterdReply.id} tweet={filterdReply}/>
        }
    }

    render(){
        // TODO: You need refactor because there is common info between DisplayTweets.js and PostReply.js.
        //       Card Component are used in many files.
        const selectedTweet = this.props.TweetStore.selectedTweet;
        const userData = this.props.UserStore;
        return(
            <div className='container'>
                <TweetCard tweet={selectedTweet} />
                {selectedTweet.replyIds.map((replyId) => {
                    return this.renderReplys(replyId)
                })}
                {this.state.shouldDisplayReply && 
                    <PostReply
                        shouldDisplayReply={this.state.shouldDisplayReply}
                        selectedReplyedTweet={this.state.selectedReplyedTweet}
                        onClose={this.onClose}
                        userData={userData}
                    />
                }
            </div>
        )
    }
}

export default TweetDetail