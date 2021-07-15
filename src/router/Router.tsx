import React from 'react';
import { Route } from "react-router-native";
import SignIn from '../components/pages/SignIn'
import SignUp from '../components/pages/SignUp'
import Welcome from '../components/pages/Welcome'

export default function Router() {
    return (
        <React.Fragment>
            <Route exact path="/" component={Welcome}/>
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
        </React.Fragment>
    )
}