import React from 'react';
import {Modal, View, StyleSheet, Text, Pressable} from "react-native";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import { closeModal } from '../../../store/modules/main/slice'
import Button from "../../basics/buttons/Button";

export default function AbstractModal() {
    const message = useAppSelector(state => state.main.modalMessage)
    const dispatch = useAppDispatch()
    const closeHandler = () => {
        dispatch(closeModal())
    }
    return (
        <Modal
            visible={!!message}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.message}>
                        <Text style={styles.messageText}>{message}</Text>
                    </View>
                    <View style={styles.actions}>
                        <Button style={styles.buttonResets} text="OK" onPress={closeHandler} />
                    </View>
                </View>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 14,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '75%'
    },
    message: {
        paddingHorizontal: 16,
        paddingVertical: 19,
    },
    messageText: {
        fontFamily: 'P',
        fontSize: 17,
        textAlign: "center"
    },
    actions: {
        borderTopWidth: 1,
        borderTopColor: 'rgba(60, 60, 67, 0.36)',
        width: '100%'
    },
    buttonResets: {
        borderRadius: 14,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        shadowOpacity: 0
    }
})