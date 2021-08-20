import React from 'react'
import {View, StyleSheet} from "react-native";
import DefaultText from "../../../basics/typography/DefaultText";
import {useI18n} from "../../../../translator/i18n";
import {CONTRACT_SCREEN_TYPES} from "../../../../store/modules/contract/constants";
import {useAppSelector} from "../../../../store/hooks";
import TextField from "../../../components/TextField";

export default function Payment() {
    const { t } = useI18n()
    const contractType = useAppSelector(
        state => state.contract.currentContract?.type
    )

    if (!contractType) {
        return null;
    }

    return (
        <View style={styles.container}>
            <DefaultText style={styles.text} text={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT}.product_price`)} />
            <TextField style={styles.costField} onChangeFunction={() => {}} placeholder={'Cost'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },
    costField: {
        marginTop: 16
    },
    text: {
        fontSize: 16
    }
})