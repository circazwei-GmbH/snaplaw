import React from 'react';
import SignIn from '../components/pages/SignIn'
import SignUp from '../components/pages/SignUp'
import Welcome from '../components/pages/Welcome'
import ForgotPassword from '../components/pages/ForgotPassword'
import Homepage from '../components/pages/Homepage'
import Verification from '../components/pages/Verification'
import ChangePassword from "../components/pages/ChangePassword";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { ROUTE } from "./RouterTypes";
import {useAppSelector} from "../store/hooks";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default function Router() {
    const token = useAppSelector(state => state.auth.token)
    return (
        token ? (
            <Tab.Navigator>
                <Tab.Screen name="Homepage" component={Homepage} />
            </Tab.Navigator>
            ) : (<Stack.Navigator headerMode="none">
            <Stack.Screen name={ROUTE.WELCOME} component={Welcome}/>
            <Stack.Screen name={ROUTE.SIGNIN} component={SignIn} />
            <Stack.Screen name={ROUTE.SIGNUP} component={SignUp} />
            <Stack.Screen name={ROUTE.FORGOT} component={ForgotPassword} />
            <Stack.Screen name={ROUTE.VERIFICATION} component={Verification} />
            <Stack.Screen name={ROUTE.CHANGE_PASSWORD} component={ChangePassword} />
        </Stack.Navigator>)
    )
}