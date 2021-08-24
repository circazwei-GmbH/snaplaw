import React, {useState} from 'react'
import {StyleSheet, View} from "react-native";
import DefaultText from "../../../basics/typography/DefaultText";
import {useI18n} from "../../../../translator/i18n";
import {CONTRACT_SCREEN_TYPES} from "../../../../store/modules/contract/constants";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import TextField from "../../../components/TextField";
import Checkbox from "../../../basics/checkboxes/Checkbox";
import {PAYMENT_FIELDS, PAYMENT_METHODS, PaymentScreenInterface} from "../../../../store/modules/contract/types";
import {setScreenData} from "../../../../store/modules/contract/slice";
import Select from "../../../basics/selects/Select";

export default function Payment() {
    const { t } = useI18n()

    const contractType = useAppSelector(
        state => state.contract.currentContract?.type
    )
    const screenData = useAppSelector(
        (state => state.contract.currentContract?.screens.find(screen => screen.type === CONTRACT_SCREEN_TYPES.PAYMENT) as PaymentScreenInterface)
    )
    const dispatch = useAppDispatch()
    const updateDataHandler = (fieldName: PAYMENT_FIELDS, value: string) => {
        dispatch(setScreenData({
            screenType: CONTRACT_SCREEN_TYPES.PAYMENT,
            fieldName,
            value
        }))
    }

    const items = [
        {
            label: 'USD',
            value: 'USD'
        },
        {
            label: 'EUR',
            value: 'EUR'
        }
    ]

    if (!contractType) {
        return null;
    }

    const [selected, setSelected] = useState(items[0])

    return (
        <View style={styles.container}>
            <DefaultText style={styles.text} text={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT}.product_price`)} />
            <View style={styles.priceBlock}>
                <TextField containerStyle={styles.costField} value={screenData?.data[PAYMENT_FIELDS.COST]} onChangeFunction={(test) => updateDataHandler(PAYMENT_FIELDS.COST, test)} placeholder={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.cost`)} />
                <View style={styles.select}>
                    <Select items={items} selectedValue={selected} onValueChange={setSelected} />
                </View>
            </View>
            <DefaultText style={styles.text} text={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT}.payment_method`)} />
            <View style={styles.checkboxContainer}>
                <Checkbox style={styles.checkboxes} isChecked={screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] === PAYMENT_METHODS.CASH} onChange={() => updateDataHandler(PAYMENT_FIELDS.PAYMENT_METHOD, PAYMENT_METHODS.CASH)} text={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.cash`)} />
                <Checkbox style={styles.checkboxes} isChecked={screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] === PAYMENT_METHODS.PAYPAL} onChange={() => updateDataHandler(PAYMENT_FIELDS.PAYMENT_METHOD, PAYMENT_METHODS.PAYPAL)} text={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.paypal`)} />
                <Checkbox style={styles.checkboxes} isChecked={screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] === PAYMENT_METHODS.TRANSFER} onChange={() => updateDataHandler(PAYMENT_FIELDS.PAYMENT_METHOD, PAYMENT_METHODS.TRANSFER)} text={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT}.checkboxes.transfer`)} />
            </View>
            {screenData?.data[PAYMENT_FIELDS.PAYMENT_METHOD] === PAYMENT_METHODS.TRANSFER ? (
                <>
                    <TextField onChangeFunction={(text) => updateDataHandler(PAYMENT_FIELDS.CARD_NAME, text)} value={screenData?.data[PAYMENT_FIELDS.CARD_NAME]} placeholder={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.name`)} />
                    <TextField onChangeFunction={(text) => updateDataHandler(PAYMENT_FIELDS.CARD_NUMBER, text)} value={screenData?.data[PAYMENT_FIELDS.CARD_NUMBER]} placeholder={t(`contracts.${contractType}.${CONTRACT_SCREEN_TYPES.PAYMENT}.fields.card`)} />
                </>
            ): null}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16
    },
    checkboxContainer: {
        marginTop: 14
    },
    checkboxes: {
        marginTop: 10
    },
    text: {
        fontSize: 16,
        marginTop: 24
    },
    priceBlock: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'flex-end'
    },
    select: {
        width: '33%'
    },
    costField: {
        marginTop: 16,
        width: '65%'
    }
})