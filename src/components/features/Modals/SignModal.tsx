import React from 'react'
import {Modal, StyleSheet, View} from "react-native";
import SignArea from "../SignArea";
import TopBar from "../../layouts/TopBar";
import TextButton from "../../basics/buttons/TextButton";
import DefaultText from "../../basics/typography/DefaultText";

type SignModalProps = {
    visible: boolean,
    onClose: () => void
}

export default function SignModal({visible, onClose}: SignModalProps) {

    return (
        <View>
            <Modal visible={visible} supportedOrientations={['portrait-upside-down', 'landscape-right']}>
                <TopBar
                    leftButton={<TextButton text={'Cancel'} onPress={onClose} type="left" />}
                    pageName={'Sign contract with your finger '} style={styles.topBar}
                    rightButton={<TextButton text={'Save'} onPress={() => {}} type="right" />}
                >
                    <View style={styles.container}>
                        <SignArea />
                        <DefaultText style={styles.text} text={'By tapping Create, I agree that the signature will be the electronic representation of my signature for all purposes when I use them on documents.'} />
                    </View>
                </TopBar>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F8FCFF',
        paddingHorizontal: 16,
        flex: 1,
        alignItems: 'stretch'
    },
    topBar: {
        paddingTop: 0,
        backgroundColor: '#F8FCFF'
    },
    text: {
        fontSize: 12,
        marginTop: 12
    }
})