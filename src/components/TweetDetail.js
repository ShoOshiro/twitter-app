import React from 'react'
import { observer, inject } from "mobx-react"
import {fetchSelectedTweet} from '../mobx/tweet/operations'
import { MenuButton} from '../common/ui-kit'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';

@inject('TweetStore')
@observer
class TweetDetail extends React.Component {
    constructor(props){
        super(props);
    }

    componentDidMount = () => {
        fetchSelectedTweet(this.props.match.params.tweetId)
    }

    render(){
        const selectedTweet = this.props.TweetStore.selectedTweet;
        return(
            <div className='container'>
                <Card>
                    <CardHeader
                        avatar={
                        <Avatar aria-label="recipe">
                            R
                        </Avatar>
                        }
                        action={
                            <MenuButton
                                tweetId={selectedTweet && selectedTweet.id}
                                iconName={"format_list_bulleted"}
                                items={["Delete", "profile"]}
                                handleClickMenu={this.handleClickMenu}
                            />
                        }
                        title="Shrimp and Chorizo Paella"
                        subheader={selectedTweet && selectedTweet.updated_at.toDate().toDateString()}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {selectedTweet && selectedTweet.content}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="reply">
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
            </div>
        )
    }
}

export default TweetDetail