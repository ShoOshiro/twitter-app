import React from 'react';
import { observer, inject } from "mobx-react";
import { MenuButton} from '../common/ui-kit';
import {UserImage} from '../common/component-area';
import { withRouter } from 'react-router';
import {deleteTweet} from '../mobx/tweet/operations';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {PostReply} from './';

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

    handleClickReply = (tweet) => {
        this.setState({shouldDisplayReply: true, selectedReplyedTweet: tweet})
    }

    onClose = () => {
        this.setState({shouldDisplayReply: false})
    }

    toTweetDetail = (tweet) => {
        this.props.history.push(`/tweet/detail/${tweet.id}`);
    }

    render(){
        const tweets = this.props.tweets;
        const userData = this.props.userData;
        return(
            <div>
                {tweets ?
                    tweets.map((tweet) => {
                        return(
                            <Card className="row-margin" key={tweet.id}>
                                <CardActionArea onClick={this.toTweetDetail.bind(this, tweet)}>
                                    <CardHeader
                                        avatar={
                                            <UserImage path={tweet.userImageUrl} style={{width: '40px', height: '40px'}}/>
                                        }
                                        action={
                                            <MenuButton
                                                tweetId={tweet.id}
                                                iconName={"format_list_bulleted"}
                                                items={["Delete", "profile"]}
                                                handleClickMenu={this.handleClickMenu}
                                            />
                                        }
                                        title={tweet.userName}
                                        subheader={tweet.updated_at.toDate().toDateString()}
                                    />
                                    <CardContent>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            {tweet.content}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions disableSpacing>
                                    <IconButton aria-label="reply" onClick={this.handleClickReply.bind(this, tweet)}>
                                        <ChatBubbleOutlineIcon />
                                    </IconButton>
                                    <IconButton aria-label="add to favorites">
                                        <FavoriteIcon />
                                    </IconButton>
                                    <IconButton aria-label="share">
                                        <ShareIcon />
                                    </IconButton>
                                </CardActions>
                            </Card>
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