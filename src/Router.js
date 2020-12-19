import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {SignUp, SignIn, ResetPassword, TimeLine, Profile, EditProfile} from './components';
import Auth from './Auth';
import {PROFILE_PATH, TIMELINE_PATH, PROFILE_EDIT_PATH, PASSWORD_RESET_PATH, SIGN_IN_PATH, SIGN_UP_PATH} from './common/utils'


const Router = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path={SIGN_UP_PATH} component={SignUp}/>
                <Route exact path={SIGN_IN_PATH} component={SignIn}/>
                <Route exact path={PASSWORD_RESET_PATH} component={ResetPassword}/>
                <Auth>
                    <Route exact path={`(${TIMELINE_PATH})?`} component={TimeLine}/>
                    <Route exact path={PROFILE_PATH} component={Profile}/>
                    <Route exact path={PROFILE_EDIT_PATH} component={EditProfile}/>
                </Auth>
            </Switch>
        </BrowserRouter>
    )
}
export default Router;