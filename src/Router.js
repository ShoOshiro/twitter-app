import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import {SignUp, TimeLine, Profile} from './components'

const Router = () => {
    return(
        <BrowserRouter>
            <Switch>
                <Route exact path={"/sign-up"} component={SignUp}/>
                <Route exact path={"(/)?"} component={TimeLine}/>
                <Route exact path={"/profile"} component={Profile}/>
            </Switch>
        </BrowserRouter>
    )
}
export default Router;