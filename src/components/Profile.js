import React from 'react';
import {UserImage} from '../common/component-area'
import {withRouter} from 'react-router';
import {inject, observer} from 'mobx-react';
import EditProfile from './EditProfile';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import {PrimaryButton} from '../common/ui-kit/index';
import {fetchOwnTweets} from '../mobx/tweet/operations'
import {DisplayTweets} from './'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

@inject('UserStore', 'TweetStore')
@observer
class Profile extends React.Component {
    constructor(props){
        super(props)
        this.state={
            isModalOpen: false,
            selectTab: 0
        }
    }

    componentDidMount = () => {
        fetchOwnTweets(this.props.UserStore.uid)
    }


    openModal = () => {
        this.setState({isModalOpen: true})
    }

    closeModal = () => {
        this.setState({isModalOpen: false})
    }

    displayTab = (tweets) => {
        if(this.state.selectTab === 0){
            return <DisplayTweets tweets={tweets} replyList={this.props.TweetStore.replyList}/> 
        }else if(this.state.selectTab === 1){
            return <h2>'Good' will be displayed. It is under construction.</h2>
        }
    } 

    render(){
        const userData = this.props.UserStore;
        const tweets = this.props.TweetStore.tweets;

        return (
            <div className="container">
                <Card>
                    <IconButton style={{cursor:'pointer', float:'right', marginTop: '5px', marginRight: '5px', width: '20px'}} aria-label="edit profile">
                    <SettingsIcon 
                        onClick={this.openModal}
                    />
                    </IconButton>
                    <UserImage path={userData.userImageUrl} style={{width: '150px', height: '150px'}}/>
                    <Typography gutterBottom variant="h5" component="h2">
                        {userData.userName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {userData.bio}
                    </Typography>
                    <EditProfile 
                        openModal = {this.state.isModalOpen}
                        onClose = {this.closeModal}
                        userData={userData}
                    /> 
                <PrimaryButton label={'followers'} style={{marginLeft: '5px', marginRight: '5px'}}/> 0   
                <PrimaryButton label={'following'} style={{marginLeft: '5px', marginRight: '5px'}}/> 0
                </Card>
                {/* TODO: 脳筋Tabを辞めてreact-tab等を用いること。 */}
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="disabled tabs example"
                >
                    <Tab label="Tweets" onClick={() => {this.setState({selectTab: 0})}}/>
                    <Tab label="Likes♡" onClick={() => {this.setState({selectTab: 1})}}/>
                </Tabs>
                {this.displayTab(tweets)}    
            </div>
        )
    }

}
export default withRouter(Profile);