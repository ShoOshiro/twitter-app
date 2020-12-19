import React from 'react'
import { observer, inject } from "mobx-react"
import { MenuButton} from '../common/ui-kit'
import {deleteTweet} from '../mobx/tweet/operations'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';

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
                {tweets ?
                    tweets.map((tweet) => {
                        return(
                            <Card className="row-margin">
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
                                <CardActions disableSpacing>
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

export default DisplayTweets