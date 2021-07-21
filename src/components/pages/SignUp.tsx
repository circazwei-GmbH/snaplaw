import React from 'react';
import { View, Text } from "react-native";
import Button from "../basics/buttons/Button";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../../router/Router";

type SignUpProps = {
    navigation: StackNavigationProp<RootStackParamList, 'SignUp'>
}

export default function SignUp({ navigation } : SignUpProps) {
    return (
        <View>
            <Text>Sign Up</Text>
            <Button text="Back" onPress={() => {navigation.pop()}} />
        </View>
    )
}