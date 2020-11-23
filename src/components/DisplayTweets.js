import React from 'react'
import { observer, inject } from "mobx-react"
import {fetchTweets} from '../mobx/tweet/operations'

@inject('TweetStore')
@observer
class DisplayTweets extends React.Component {
    constructor(props){
        super(props)
    }

    componentDidMount = () => {
        fetchTweets()
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
                                <p>tweet id: {tweet.uid}</p>
                                <p>tweet content: {tweet.content}</p>
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