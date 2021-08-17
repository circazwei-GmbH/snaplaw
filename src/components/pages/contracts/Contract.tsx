import React, {useEffect} from 'react';
import TopBar from "../../layouts/TopBar";
import {View} from "react-native";
import Button from "../../basics/buttons/Button";
import {useNavigation} from "@react-navigation/native";
import {ContractNavigationProps, HOME_ROUTER} from "../../../router/HomeRouterType";
import {contractScreensConfig} from "../../../store/modules/contract/contract-screens-types";
import {useAppSelector} from "../../../store/hooks";

type ContractProps = {
    route: {
        params: ContractNavigationProps
    }
}

export default function Contract({route: {params: {screenCount}}}: ContractProps) {
    const navigation = useNavigation()
    const contractType = useAppSelector(state => state.contract.currentContract?.type)
    useEffect(() => {
        console.log("SCREEN mouned:", screenCount)
        return () => {
            console.log("SCREEN unmounted:", screenCount)
        }
    }, [screenCount])

    if (!contractType) {
        return null;
    }

    return (
        <TopBar pageName={'create contract'}>
            <View>
                <Button text={'To next'} onPress={() => navigation.push(HOME_ROUTER.CONTRACT, {screenCount: screenCount + 1})} />
                {React.createElement(contractScreensConfig[contractType][screenCount].component)}
            </View>
        </TopBar>
    )
}