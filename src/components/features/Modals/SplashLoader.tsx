import React from 'react'
import {ActivityIndicator, Modal, View, StyleSheet} from "react-native";
import {useAppSelector} from "../../../store/hooks";

export default function SplashLoader() {
    const isWaiter = useAppSelector(state => !!state.main.waiter.length)

    return (
        <View>
            <Modal
                visible={isWaiter}
                transparent={true}
            >
                <View style={styles.activityContainer}>
                    <ActivityIndicator
                        size="large"
                        color="#1696E2"
                    />
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    activityContainer: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
})