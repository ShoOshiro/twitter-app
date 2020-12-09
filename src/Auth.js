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
        const {location, children} = this.props;
        if(!isSignIn){
            return <></>
        } else {
            return children
            // NOTE: this code can be incorrect when pathname is changed to /profile by push method.
            // switch (location.pathname){
            //     case '/':
            //         return children[0]
            //     case '/profile':
            //         return children[1]
            //     case '/profile/edit':
            //         return children[2]
            //     default:
            //         return children[0]
            // }
        }
    }

}

export default withRouter(Auth);