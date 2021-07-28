import React from 'react';
import {Modal, View, StyleSheet, Text, Pressable} from "react-native";
import {useAppDispatch, useAppSelector} from "../../../store/hooks";
import {closeModal, ModalInterface} from '../../../store/modules/main/slice'
import Button from "../../basics/buttons/Button";

export default function AbstractModal() {
    const modal: ModalInterface = useAppSelector(state => state.main.modal)
    const dispatch = useAppDispatch()
    const actionHandler = (action) => {
        if (action) {
            dispatch(action)
        }
        dispatch(closeModal())
    }

    const getStyleForCurrentButton = () => {

    }

    return (
        <Modal
            visible={!!modal.message}
            transparent={true}
            animationType="fade"
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <View style={styles.message}>
                        <Text style={styles.messageText}>{modal.message}</Text>
                    </View>
                    <View style={styles.actions}>
                        {modal.actions && modal.actions.map(action => (
                            <View style={[styles.flex, modal.actions.length > 1 ? styles.buttonContainer : null]}>
                                <Button style={styles.buttonResets} textColorType={action.colortype} text={action.name} onPress={() => actionHandler(action.action)} />
                            </View>
                        ) )}
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
        width: '75%',
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
        flexDirection: "row",
        width: '100%',
        justifyContent: "center"
    },
    flex: {
        flex: 1
    },
    buttonContainer: {
        borderRightWidth: 1,
        borderRightColor: 'rgba(60, 60, 67, 0.36)',
    },
    buttonResets: {
        borderRadius: 14,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        shadowOpacity: 0,
    }
})