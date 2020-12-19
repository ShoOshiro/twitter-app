import React from 'react';
import { observer, inject } from "mobx-react"
import {fetchTweets} from '../mobx/tweet/operations'
import {PostTweet, DisplayTweets} from './'
import {SideMenu} from '../common/component-area'

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
        return(
            <div className="flex container">
                <SideMenu/>
                <div>
                    <PostTweet/>
                    <DisplayTweets tweets={tweets}/>
                </div>
            </div>
        )
    }
    
}
export default TimeLine;