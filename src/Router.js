import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {SignUp, SignIn, TimeLine, Profile} from './components'

const Router = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path={"/signup"} component={SignUp}/>
                <Route exact path={"/signin"} component={SignIn}/>
                <Route exact path={"(/)?"} component={TimeLine}/>
                <Route exact path={"/profile"} component={Profile}/>
            </Switch>
        </BrowserRouter>
    )
}
export default Router;