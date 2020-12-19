import React from 'react'
import UserStore from './mobx/user/UserStore'
import {listenAuthState} from './mobx/user/operations'
import { withRouter } from 'react-router';

class Auth extends React.Component{
    
    constructor(props){
        super(props);
    }

    componentDidMount(){
        const isSignIn = UserStore.isSignIn 
        if(!isSignIn){
            listenAuthState(this.props.history)
        }
    }

    render(){
        const isSignIn = UserStore.isSignIn
        const {children} = this.props;
        if(!isSignIn){
            return null
        } else {
            return children
        }
    }

}

export default withRouter(Auth);