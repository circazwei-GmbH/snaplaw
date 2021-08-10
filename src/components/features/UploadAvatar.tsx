import React, {useState} from 'react'
import {StyleSheet, TouchableOpacity, View} from "react-native";
import UserAvatar from "../components/UserAvatar";
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {useAppDispatch} from "../../store/hooks";
import Menu, {ButtonType} from "./Modals/Menu";
import {useI18n} from "../../translator/i18n";
import {uploadAvatar} from "../../store/modules/media/action-creators";
import {cameraWay, libraryWay} from "../../services/media/media-picker";
import {PermissionNotGranted} from "../../services/media/errors";
import {setMessage} from "../../store/modules/main/slice";

export default function UploadAvatar() {
    const [src, setSrc] = useState('https://n1s2.starhit.ru/6a/46/ae/6a46aeed947a183d67d1bc48211151bf/480x496_0_2bbde84177c9ff1c2299a26a0f69f69c@480x496_0xac120003_4430520541578509619.jpg')
    const [menuVisible, setMenuVisible] = useState(false);
    const dispatch = useAppDispatch();
    const { t } = useI18n()

    const postChooseFileHandler = (uri: string) => {
        setMenuVisible(false)
        dispatch(uploadAvatar(uri))
        setSrc(uri)
    }

    const buttonPickerHandler = (way: Function) => async () => {
        try {
            const uri = await way()

            if (uri) {
                postChooseFileHandler(uri)
            }
        } catch (error) {
            if (error instanceof PermissionNotGranted) {
                dispatch(setMessage(t(error.message)))
            } else {
                dispatch(setMessage(t('errors.abstract')))
            }
        }

    }

    const uploadAvatarIconPressHandler = () => {
        setMenuVisible(true)
    }

    const menuButtons: ButtonType[] = [
        {
            title: 'Library',
            handler: buttonPickerHandler(libraryWay)
        },
        {
            title: 'Camera',
            handler: buttonPickerHandler(cameraWay)
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