import React from 'react'
import {TextInput, PrimaryButton} from '../common/ui-kit/index';
import {postTweet} from '../mobx/tweet/operations';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import {UserImage} from '../common/component-area';

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
            <div className="area-margin">
                <Card>
                    <CardHeader
                        avatar={
                        <Avatar aria-label="recipe">
                            {<UserImage path={this.props.userData.userImageUrl} style={{width: '40px', height: '40px'}}/>}
                        </Avatar>
                        }
                        title="What is happening?"
                    />
                    <CardContent>
                        <TextInput
                            isFullWidth={true} label={'今何してる？'} isMultiline={true} isRequired={true}
                            rows={5} value={this.state.tweetContent} type={'text'} onChange={this.inputTweetContent}
                        />
                    </CardContent>
                    <CardActions disableSpacing>
                        <PrimaryButton
                            label={'投稿する'}
                            onClick={this.postTweet}
                        />
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default PostTweet