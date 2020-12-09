import React from 'react';
import {PrimaryButton} from '../common/ui-kit'
import {UserImage} from '../common/component-area'
import {withRouter} from 'react-router';
import {inject, observer} from 'mobx-react';

@inject('UserStore')
@observer
class Profile extends React.Component {

    toEditProfile = () => {
        this.props.history.push("/profile/edit")
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
                    onClick={this.toEditProfile}
                />
            </div>
        )
    }

}
export default withRouter(Profile);