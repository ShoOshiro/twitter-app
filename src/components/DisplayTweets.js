import React from 'react'
import { observer, inject } from "mobx-react"
import { MenuButton} from '../common/ui-kit'
import { withRouter } from 'react-router';
import {deleteTweet} from '../mobx/tweet/operations'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

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

    handleClickReply = (tweet) => {
        console.log(tweet.content)
    }

    toTweetDetail = (tweet) => {
        this.props.history.push(`/tweet/detail/${tweet.id}`);
    }

    render(){
        const tweets = this.props.tweets;
        return(
            <div>
                {tweets ?
                    tweets.map((tweet) => {
                        return(
                            <Card className="row-margin">
                                <CardActionArea onClick={this.toTweetDetail.bind(this, tweet)}>
                                    <CardHeader
                                        avatar={
                                        <Avatar aria-label="recipe">
                                            R
                                        </Avatar>
                                        }
                                        action={
                                            <MenuButton
                                                tweetId={tweet.id}
                                                iconName={"format_list_bulleted"}
                                                items={["Delete", "profile"]}
                                                handleClickMenu={this.handleClickMenu}
                                            />
                                        }
                                        title="Shrimp and Chorizo Paella"
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
            </div>
        );
    }
}

export default withRouter(DisplayTweets)