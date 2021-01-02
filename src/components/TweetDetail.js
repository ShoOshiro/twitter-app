import React from 'react'
import { observer, inject } from "mobx-react"
import {fetchSelectedTweet} from '../mobx/tweet/operations'
import { MenuButton} from '../common/ui-kit'
import {UserImage} from '../common/component-area';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import {PostReply} from './';

@inject('TweetStore', 'UserStore')
@observer
class TweetDetail extends React.Component {
    constructor(props){
        super(props);
        this.state = {shouldDisplayReply: false, selectedReplyedTweet: {}}
    }

    componentDidMount = () => {
        fetchSelectedTweet(this.props.match.params.tweetId)
    }

    handleClickReply = (tweet) => {
        this.setState({shouldDisplayReply: true, selectedReplyedTweet: tweet})
    }

    onClose = () => {
        this.setState({shouldDisplayReply: false})
    }

    render(){
        // TODO: You need refactor because there is common info between DisplayTweets.js and PostReply.js.
        //       Card Component are used in many files.
        const selectedTweet = this.props.TweetStore.selectedTweet;
        const userData = this.props.UserStore;
        return(
            <div className='container'>
                {selectedTweet.id &&
                    <Card>
                        <CardHeader
                            avatar={
                                <UserImage path={selectedTweet.userImageUrl} style={{width: '40px', height: '40px'}}/>
                            }
                            action={
                                <MenuButton
                                    tweetId={selectedTweet.id}
                                    iconName={"format_list_bulleted"}
                                    items={["Delete", "profile"]}
                                    handleClickMenu={this.handleClickMenu}
                                />
                            }
                            title={selectedTweet.userName}
                            subheader={selectedTweet.updated_at.toDate().toDateString()}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {selectedTweet.content}
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <IconButton aria-label="reply" onClick={this.handleClickReply.bind(this, selectedTweet)}>
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
        )
    }
}

export default TweetDetail