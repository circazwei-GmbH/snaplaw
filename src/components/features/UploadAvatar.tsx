import React, {useState} from 'react'
import {View, StyleSheet} from "react-native";
import UserAvatar from "../components/UserAvatar";

export default function UploadAvatar() {
    const [src] = useState('https://n1s2.starhit.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0_2bbde84177c9ff1c2299a26a0f69f69c@480x496_0xac120003_4430520541578509619.jpg')

    return (
        <View style={styles.container}>
            <UserAvatar url={src} size="small" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})