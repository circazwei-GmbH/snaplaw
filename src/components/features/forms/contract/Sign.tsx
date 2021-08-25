import React, {useState} from 'react'
import {StyleSheet, View} from "react-native";
import DefaultText from "../../../basics/typography/DefaultText";
import {useI18n} from "../../../../translator/i18n";
import {useAppSelector} from "../../../../store/hooks";
import {CONTRACT_SCREEN_TYPES} from "../../../../store/modules/contract/constants";
import SignInput from "../../../basics/inputs/SignInput";
import InviteInput from "../../../basics/inputs/InviteInput";

export default function Sign() {
    const { t } = useI18n()
    const currentType = useAppSelector(state => state.contract.currentContract?.type)
    const [name] = useState('Jhon Doue')

    if (!currentType) {
        return null
    }

    return (
        <View style={styles.container}>
            <View style={styles.block}>
                <DefaultText text={t(`contracts.${currentType}.${CONTRACT_SCREEN_TYPES.SIGN}.signature`)} />
                <SignInput style={styles.inputInBlock} signUri={undefined} signHandler={() => {}} />
            </View>
            <View style={styles.block}>
                <DefaultText text={t(`contracts.${currentType}.${CONTRACT_SCREEN_TYPES.SIGN}.invite`)} />
                <InviteInput style={styles.inputInBlock} invitedName={name} inviteHandler={() => {}} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,

    },
    block: {
        marginTop: 24
    },
    inputInBlock: {
        marginTop: 16
    }
})