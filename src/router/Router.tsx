import React from 'react';
import SignIn from '../components/pages/SignIn'
import SignUp from '../components/pages/SignUp'
import Welcome from '../components/pages/Welcome'
import ForgotPassword from '../components/pages/ForgotPassword'
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

export type RootStackParamList = {
    Welcome: undefined,
    SignIn: undefined,
    SignUp: undefined,
    Forgot: undefined
}

export default function Router() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Welcome" component={Welcome}/>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Forgot" component={ForgotPassword} />
        </Stack.Navigator>
    )
}