import React, {ReactElement} from 'react';
import {StyleSheet, View} from 'react-native';

interface AuthLayoutPropsInterface {
    children: ReactElement
}

export default function AuthLayout({ children }: AuthLayoutPropsInterface) {
    return (
        <View style={styles.container}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexDirection: 'column',
        paddingTop: 50,
        paddingHorizontal: 16
    }
})