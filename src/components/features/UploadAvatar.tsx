import React, {useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from "react-native";
import UserAvatar from "../components/UserAvatar";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {MediaTypeOptions} from 'expo-image-picker';
import {useAppDispatch} from "../../store/hooks";
import {setMessage} from "../../store/modules/main/slice";
import Menu, {ButtonType} from "./Modals/Menu";

export default function UploadAvatar() {
    const [src, setSrc] = useState('https://n1s2.starhit.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0_2bbde84177c9ff1c2299a26a0f69f69c@480x496_0xac120003_4430520541578509619.jpg')
    const [menuVisible, setMenuVisible] = useState(false);
    const dispatch = useAppDispatch();

    const libraryWay = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync()
        if (status !== ImagePicker.PermissionStatus.GRANTED) {
            dispatch(setMessage('Grant camera permission'))
            return
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: MediaTypeOptions.Images,
            quality: 0.5
        })

        if (!result.cancelled) {
            setSrc(result.uri)
        }
        setMenuVisible(false)
    }

    const uploadAvatarIconPressHandler = () => {
        setMenuVisible(true)
    }

    const menuButtons: ButtonType[] = [
        {
            title: 'Library',
            handler: libraryWay
        },
        {
            title: 'Camera',
            handler: () => {}
        }
    ]

    return (
        <View style={styles.container}>
            <UserAvatar url={src} size="small" />
            <View style={styles.uploadIcon}>
                <TouchableOpacity onPress={uploadAvatarIconPressHandler}>
                    <MaterialCommunityIcons name="camera-plus-outline" size={24} color="#668395" />
                </TouchableOpacity>
            </View>
            <Menu
                visible={menuVisible}
                buttons={menuButtons}
                onClose={() => setMenuVisible(false)}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
    },
    uploadIcon: {
        backgroundColor: '#fff',
        position: 'absolute',
        top: 0,
        right: 0,
        borderRadius: 50,
        borderWidth: 5,
        borderColor: '#fff'
    }
})