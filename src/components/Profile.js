import React from 'react';
import {PrimaryButton} from '../common/ui-kit'
import {UserImage} from '../common/component-area'
import {withRouter} from 'react-router';
import {inject, observer} from 'mobx-react';
import EditProfile from './EditProfile';

@inject('UserStore')
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
        return (
            <div>
                <h2>Profile</h2>
                <UserImage path={userData.userImageUrl} />
                <p>{userData.userName}</p>
                <p>{userData.bio}</p>
                <PrimaryButton
                    label={'Edit Profile'}
                    onClick={this.openModal}
                />
                <EditProfile 
                    openModal = {this.state.isModalOpen}
                    onClose = {this.closeModal}
                />
            </div>
        )
    }

}
export default withRouter(Profile);