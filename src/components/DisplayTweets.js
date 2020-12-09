import React from 'react'
import { observer, inject } from "mobx-react"
import { MenuButton} from '../common/ui-kit'
import {deleteTweet} from '../mobx/tweet/operations'

@inject('TweetStore')
@observer
class DisplayTweets extends React.Component {
    constructor(props){
        super(props)
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

    render(){
        const tweets = this.props.tweets;
        return(
            <div>
                <h4>display tweet list</h4>
                {tweets ?
                    tweets.map((tweet) => {
                        return(
                            <div>
                                <p>tweet id: {tweet.uid}</p>
                                <p>tweet content: {tweet.content}</p>
                                <MenuButton
                                    tweetId={tweet.id}
                                    iconName={"format_list_bulleted"}
                                    items={["Delete", "profile"]}
                                    handleClickMenu={this.handleClickMenu}
                                />
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