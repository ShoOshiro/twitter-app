import React from 'react'
import {TextInput, PrimaryButton} from '../common/ui-kit/index';
import {postTweet} from '../mobx/tweet/operations'

class PostTweet extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            tweetContent: ''
        }
    }

    inputTweetContent = (event) => {
        this.setState({ tweetContent: event.target.value})
    }

    postTweet = () => {
        postTweet(this.state.tweetContent)
    }

    render(){
        return(
            <div>
                <h4>Tweet</h4>
                <TextInput
                    isFullWidth={true} label={'今何してる？'} isMultiline={true} isRequired={true}
                    rows={5} value={this.state.tweetContent} type={'text'} onChange={this.inputTweetContent}
                />
                <PrimaryButton
                    label={'投稿する'}
                    onClick={this.postTweet}
                />
            </div>
        );
    }
}

export default PostTweet