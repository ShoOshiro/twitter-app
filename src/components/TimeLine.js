import React from 'react';
import { observer, inject } from "mobx-react"
import { PrimaryButton } from '../common/ui-kit';
import {signOut} from '../mobx/user/operations'

@inject('UserStore')
@observer
class TimeLine extends React.Component{

    constructor(props){
        super(props);
    }

    // NOTE: Test code to check if sign out is successful.
    signOut = () => {
        signOut(this.props.history)
    }
    toProfile = () => {
        this.props.history.push('/profile')
    }

    render(){
        
        return(
            <div>
                <h2>TimeLine</h2>
                {/* // NOTE: Test code to check if user operation is successful. */}
                <h4>{this.props.UserStore.userName}</h4>
                <h4>{this.props.UserStore.email}</h4>
                <h4>{this.props.UserStore.uid}</h4>
                <PrimaryButton
                    label={'sign out test'}
                    onClick={this.signOut}
                />
                <PrimaryButton
                    label={'to profile page'}
                    onClick={this.toProfile}
                />
            </div>
        )
    }
    
}
export default TimeLine;