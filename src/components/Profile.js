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

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

@inject('UserStore', 'TweetStore')
@observer
class Profile extends React.Component {
    constructor(props){
        super(props)
        this.state={
            isModalOpen: false
        }
    }

    openModal = () => {
        this.setState({isModalOpen: true})
    }

    closeModal = () => {
        this.setState({isModalOpen: false})
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
                <Tabs
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="disabled tabs example"
                >
                    <Tab label="Tweets">
                    </Tab>
                    <Tab label="Likes♡">
                    </Tab>
                </Tabs>
            </div>
        )
    }

}
export default withRouter(Profile);