import React from 'react'
import { Text, View, StyleSheet } from "react-native"
import Button from "../basics/buttons/Button"
import { useAppDispatch } from "../../store/hooks"
import { killToken } from '../../store/modules/auth/slice'

export default function Homepage() {
    const dispatch = useAppDispatch()
    const killTokenHandler = () => {
        dispatch(killToken())
    }

    return (
        <View>
            <Text style={styles.test}>Homepage</Text>
            <Button text="Kill token" onPress={killTokenHandler} />
        </View>
    )
}

const styles = StyleSheet.create({
    test: {
        marginTop: 50,
        textAlign: 'center',
        fontSize: 30
    }
})