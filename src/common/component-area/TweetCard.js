import React from 'react';
import { MenuButton} from '../ui-kit';
import {UserImage} from './';
import { withRouter } from 'react-router';
import {deleteTweet} from '../../mobx/tweet/operations';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

class TweetCard extends React.Component {

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

    toTweetDetail = (tweet) => {
        this.props.history.push(`/tweet/detail/${tweet.id}`);
    }

    render(){
        const tweet = this.props.tweet;
        return(
            <div>
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
                            subheader={tweet.updated_at && tweet.updated_at.toDate().toDateString()}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {tweet.content}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions disableSpacing>
                        <IconButton aria-label="reply" onClick={() => this.props.handleClickReply(tweet)}>
                            <ChatBubbleOutlineIcon />
                        </IconButton>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default withRouter(TweetCard)