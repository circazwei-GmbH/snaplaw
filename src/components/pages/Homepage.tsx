import React from 'react'
import {Text, View, StyleSheet, ScrollView} from "react-native"
import ContractTypeCard from "../components/ContractTypeCard";
import {useI18n} from "../../translator/i18n";

export default function Homepage() {
    const { t } = useI18n()

    return (
        <>
            <Text style={styles.test}>Homepage</Text>
            <ScrollView>
                <View style={styles.cardContainer}>
                    <ContractTypeCard
                        image={require('../../../assets/purchase_contract.png')}
                        title={t('homepage.contract_types.purchase')}
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
    )
}

const styles = StyleSheet.create({
    test: {
        marginTop: 50,
        textAlign: 'center',
        fontSize: 30
    },
    cardContainer: {
        flexWrap: 'wrap',
        flexDirection: "row",
        justifyContent: 'flex-start',
        alignItems: 'center',
        margin: 8,
    }
})