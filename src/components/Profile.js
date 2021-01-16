import React from 'react';
import {UserImage} from '../common/component-area'
import {withRouter} from 'react-router';
import {inject, observer} from 'mobx-react';
import EditProfile from './EditProfile';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
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
            return <DisplayTweets tweets={tweets} replyList={this.props.TweetStore.replyList} userData={this.props.UserStore}/> 
        }else if(this.state.selectTab === 1){
            return <p>'Good' will be displayed. It is under construction.</p>
        }
    } 

    render(){
        const userData = this.props.UserStore;
        const tweets = this.props.TweetStore.tweets;

        return (
            <div className="container">
                <Card>
                    <CardHeader
                        avatar={
                            <UserImage path={userData.userImageUrl} style={{width: '120px', height: '120px'}}/>
                        }
                        action={
                            <IconButton style={{cursor:'pointer', float:'right', marginTop: '5px', marginRight: '5px', width: '20px'}} aria-label="edit profile">
                                <SettingsIcon 
                                    onClick={this.openModal}
                                />
                            </IconButton>}
                        title={userData.userName}
                    />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {userData.bio}
                        </Typography>
                    </CardContent>
                    <EditProfile 
                        openModal = {this.state.isModalOpen}
                        onClose = {this.closeModal}
                        userData={userData}
                    /> 
                </Card>
                {/* TODO: 脳筋Tabを辞めてreact-tab等を用いること。 */}
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="disabled tabs example"
                >
                    <Tab label="Tweets" onClick={() => {this.setState({selectTab: 0})}}/>
                    <Tab label="Likes" onClick={() => {this.setState({selectTab: 1})}}/>
                </Tabs>
                {this.displayTab(tweets)}    
            </div>
        )
    }

}
export default withRouter(Profile);