import React, {useEffect} from 'react'
import SignIn from '../components/pages/SignIn'
import SignUp from '../components/pages/SignUp'
import Welcome from '../components/pages/Welcome'
import ForgotPassword from '../components/pages/ForgotPassword'
import Homepage from '../components/pages/Homepage'
import MyProfile from '../components/pages/MyProfile'
import Verification from '../components/pages/Verification'
import ChangePassword from "../components/pages/ChangePassword";
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { AUTH_ROUTE } from "./AuthRouterTypes"
import {useAppDispatch, useAppSelector} from "../store/hooks"
import {PROFILE_ROUTER} from "./ProfileRouterTypes";
import ChangeLanguage from "../components/pages/ChangeLanguage";
import {requestLanguage} from "../store/modules/profile/action-creators";

const Stack = createStackNavigator()
const ProfileStack = createStackNavigator()
const Tab = createBottomTabNavigator()

export default function Router() {
    const token = useAppSelector(state => state.auth.token)
    const language = useAppSelector(state => state.profile.language)

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(requestLanguage())
    }, [dispatch])

    if (!language) {
        return null
    }

    return (
        !token ? (
            <Tab.Navigator>
                <Tab.Screen name="Homepage" component={Homepage} />
                <Tab.Screen name="Settings">
                    {() => (
                        <ProfileStack.Navigator headerMode="none">
                            <ProfileStack.Screen name={PROFILE_ROUTER.MY_PROFILE} component={MyProfile} />
                            <ProfileStack.Screen name={PROFILE_ROUTER.CHANGE_LANGUAGE} component={ChangeLanguage} />
                        </ProfileStack.Navigator>
                    )}
                </Tab.Screen>
            </Tab.Navigator>
        ) : (<Stack.Navigator headerMode="none">
            <Stack.Screen name={AUTH_ROUTE.WELCOME} component={Welcome} />
            <Stack.Screen name={AUTH_ROUTE.SIGNIN} component={SignIn} />
            <Stack.Screen name={AUTH_ROUTE.SIGNUP} component={SignUp} />
            <Stack.Screen name={AUTH_ROUTE.FORGOT} component={ForgotPassword} />
            <Stack.Screen name={AUTH_ROUTE.VERIFICATION} component={Verification} />
            <Stack.Screen name={AUTH_ROUTE.CHANGE_PASSWORD} component={ChangePassword} />
        </Stack.Navigator>)
    )
}