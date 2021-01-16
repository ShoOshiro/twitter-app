import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { PrimaryButton, TextInput } from '../common/ui-kit';
import {UserImage} from '../common/component-area';
import ReactModal from 'react-modal';
import {postReply} from '../mobx/tweet/operations';
import CardHeader from '@material-ui/core/CardHeader';

class PostReply extends React.Component {

    constructor(props){
        super(props);
        this.state = {replyContent: ""}
    }

    inputReplyContent = (event) => {
        this.setState({replyContent: event.target.value})
    }

    postReply = () => {
        if(this.state.replyContent !== '') {
            postReply(this.props.selectedReplyedTweet, this.state.replyContent);
        }
        this.setState({replyContent: ""})
    }

    render(){
        const replyedTweet = this.props.selectedReplyedTweet;
        const userData = this.props.userData;

        return(
            <div>
                <ReactModal
                    isOpen = {this.props.shouldDisplayReply}
                    style={{
                        overlay: {
                            backgroundColor: 'rgba(204, 204, 204, 0.75)'
                        },
                        content: {
                            maxWidth: '600px',
                            margin: 'auto',
                        }
                    }}
                >
                    <Card className="row-margin">
                        {/* replyed */}
                        <CardHeader
                            avatar={
                                <UserImage path={replyedTweet.userImageUrl} style={{width: '40px', height: '40px'}}/>
                            }
                            title={replyedTweet.userName}
                            subheader={replyedTweet.updated_at && replyedTweet.updated_at.toDate().toDateString()}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {replyedTweet.content}
                            </Typography>
                        </CardContent>
                        {/* reply */}
                        <CardHeader
                            avatar={
                                <UserImage path={userData && userData.userImageUrl} style={{width: '40px', height: '40px'}}/>
                            }
                            title={userData && userData.userName}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                <TextInput
                                    isFullWidth={true} label={'reply tweet'} isMultiline={true} isRequired={true}
                                    rows={5} value={this.state.replyContent} type={'text'} onChange={this.inputReplyContent}
                                />
                            </Typography>
                        </CardContent>
                        <CardActions disableSpacing>
                            <PrimaryButton
                                label={'Reply'}
                                onClick = { () => {
                                    this.postReply();
                                    this.props.onClose();
                                }}
                            />
                            <PrimaryButton
                                label={'Cancel'}
                                onClick={this.props.onClose}
                            />
                        </CardActions>
                    </Card>
                </ReactModal>
            </div>
        )
    }

}

export default PostReply;