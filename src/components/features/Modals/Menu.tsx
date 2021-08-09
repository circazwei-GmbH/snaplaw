import React from 'react'
import {View, StyleSheet, Modal} from "react-native";
import Button from "../../basics/buttons/Button";

export type ButtonType = {
    title: string,
    handler: () => void
}

type MenuProps = {
    visible: boolean,
    onClose: () => void,
    buttons: ButtonType[]
}

export default function Menu({onClose, visible, buttons} : MenuProps) {
    return (
        <View>
            <Modal
                visible={visible}
                transparent={true}
                animationType="fade"
            >
                <View style={styles.container}>
                    <View style={styles.listButtonContainer}>
                        {buttons.map((button, index) => (
                            <Button key={index} style={styles.button} text={button.title} onPress={button.handler} />
                        ))}
                    </View>
                    <View style={styles.cancelButtonContainer}>
                        <Button text="Cancel" type="primary" onPress={onClose} />
                    </View>
                </View>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(0,0,0,0.7)',
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        padding: 5,
        paddingBottom: 30
    },
    cancelButtonContainer: {
        width: '100%',
    },
    listButtonContainer: {
        width: '100%',
        paddingBottom: 8
    },
    button: {
        marginBottom: 8
    }
})