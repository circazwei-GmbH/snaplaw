import React from 'react'
import {View, StyleSheet, ScrollView} from "react-native"
import ContractTypeCard from "../components/ContractTypeCard";
import {useI18n} from "../../translator/i18n";
import TopBar from "../layouts/TopBar";
import NotificationBell from "../components/NotificationBell";
import TextField from "../components/TextField";
import DefaultText from "../basics/typography/DefaultText";
import {useAppDispatch} from "../../store/hooks";
import {requestCreateContract} from "../../store/modules/contract/action-creators";
import {CONTRACT_TYPES} from "../../store/modules/contract/constants";

export default function Homepage() {
    const { t } = useI18n()
    const dispatch = useAppDispatch()

    return (
        <TopBar
            pageName={t('homepage.tab_name')}
            leftButton={<NotificationBell />}
        >
            <>
                <View style={styles.container}>
                    <TextField
                        onChangeFunction={() => {}}
                        placeholder={t('homepage.search')}
                    />
                    <DefaultText text={t('homepage.description')} style={styles.description} />
                </View>
                <ScrollView>
                    <View style={styles.cardContainer}>
                        <ContractTypeCard
                            image={require('../../../assets/purchase_contract.png')}
                            title={t('homepage.contract_types.purchase')}
                            onPress={() => dispatch(requestCreateContract(CONTRACT_TYPES.PURCHASE))}
                        />
                        <ContractTypeCard
                            image={require('../../../assets/car_contract.png')}
                            title={t('homepage.contract_types.car')}
                        />
                        <ContractTypeCard
                            image={require('../../../assets/work_contract.png')}
                            title={t('homepage.contract_types.work')}
                        />
                        <ContractTypeCard
                            image={require('../../../assets/free_contract.png')}
                            title={t('homepage.contract_types.free')}
                        />
                        <ContractTypeCard
                            image={require('../../../assets/rental_contract.png')}
                            title={t('homepage.contract_types.rental')}
                        />
                    </View>
                </ScrollView>
            </>
        </TopBar>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 11,
        marginTop: 20
    },
    description: {
        marginTop: 34,
        marginBottom: 7
    },
    cardContainer: {
        flexWrap: 'wrap',
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 8,
    }
})