import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {SignUp, SignIn, TimeLine, Profile} from './components';
import Auth from './Auth';

const Router = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path={"/signup"} component={SignUp}/>
                <Route exact path={"/signin"} component={SignIn}/>
                <Auth>
                    <Route exact path={"(/)?"} component={TimeLine}/>
                    <Route exact path={"/profile"} component={Profile}/>
                </Auth>
            </Switch>
        </BrowserRouter>
    )
}
export default Router;